"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ImageUp, Mail, Trash2, UserRound, X } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient, useSession } from "@/lib/auth-client";
import { getAccessToken } from "@/lib/get-access-token";
import { toast } from "sonner";

const MAX_AVATAR_BYTES = 2 * 1024 * 1024;
const ALLOWED_AVATAR_TYPES = ["image/png", "image/jpeg", "image/webp"];

const getApiUrl = () =>
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const isHttpUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name must be at most 60 characters"),
  imageUrl: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || isHttpUrl(value),
      "Please enter a valid http or https image URL",
    ),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileUser {
  name: string;
  email: string;
  image?: string | null;
}

interface ProfileFormProps {
  user: ProfileUser;
  onSaved: () => void | Promise<void>;
}

interface AvatarUploadResult {
  success: boolean;
  message?: string;
  data?: {
    url: string;
    fileName: string;
  };
}

const isLocalAvatarUrl = (value: string | null | undefined) =>
  typeof value === "string" && value.includes("/uploads/avatars/");

const removeAvatarFile = async (imageUrlToRemove: string | null) => {
  if (!isLocalAvatarUrl(imageUrlToRemove)) {
    return;
  }

  try {
    const token = await getAccessToken();

    const response = await fetch(`${getApiUrl()}/profile/avatar/cleanup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ image: imageUrlToRemove }),
    });

    if (!response.ok) {
      console.warn(`Avatar cleanup failed with status ${response.status}.`);
    }
  } catch {
    // Cleanup is best effort and must never break the save flow.
  }
};

const uploadAvatar = async (dataUrl: string) => {
  const token = await getAccessToken();

  const response = await fetch(`${getApiUrl()}/profile/avatar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ image: dataUrl }),
  });

  const result = (await response.json()) as AvatarUploadResult;

  if (!response.ok || !result.success || !result.data?.url) {
    throw new Error(result.message || "Failed to upload image");
  }

  return result.data.url;
};

function ProfileForm({ user, onSaved }: ProfileFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name ?? "",
      imageUrl: user.image ?? "",
    },
  });

  const watchedImageUrl =
    useWatch({ control: form.control, name: "imageUrl" }) ?? "";

  const trimmedImageUrl = watchedImageUrl.trim();
  const previewSrc = previewDataUrl ?? trimmedImageUrl;

  useEffect(() => {
    const imageUrl = watchedImageUrl.trim();

    if (!imageUrl || selectedFile) {
      return;
    }

    const image = new Image();
    let isCurrent = true;

    image.onload = () => {
      if (isCurrent) {
        setFailedImageUrl((currentUrl) =>
          currentUrl === imageUrl ? null : currentUrl,
        );
      }
    };

    image.onerror = () => {
      if (isCurrent) {
        setFailedImageUrl(imageUrl);
      }
    };

    image.src = imageUrl;

    return () => {
      isCurrent = false;
      image.onload = null;
      image.onerror = null;
    };
  }, [watchedImageUrl, selectedFile]);

  // An empty image URL is a valid "remove the photo" request, not a broken URL.
  const imagePreviewError =
    trimmedImageUrl !== "" &&
    !selectedFile &&
    failedImageUrl === trimmedImageUrl;

  const fallbackInitial = (user.name || user.email).charAt(0).toUpperCase();

  const clearSelectedFile = () => {
    setSelectedFile(null);
    setPreviewDataUrl(null);
    setFileInputKey((previousKey) => previousKey + 1);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
      toast.error("Please choose a PNG, JPEG or WebP image");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_AVATAR_BYTES) {
      toast.error("Image must be 2MB or smaller");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        toast.error("Could not read the selected image");
        return;
      }

      setSelectedFile(file);
      setPreviewDataUrl(reader.result);
      form.setValue("imageUrl", "", { shouldValidate: true });
    };

    reader.onerror = () => {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      toast.error("Could not read the selected image");
    };

    reader.readAsDataURL(file);
  };

  const handleCancel = () => {
    clearSelectedFile();
    form.reset({
      name: user.name ?? "",
      imageUrl: user.image ?? "",
    });
  };

  const handleRemovePhoto = () => {
    clearSelectedFile();
    form.setValue("imageUrl", "", { shouldValidate: true });
  };

  const onSubmit = async (values: ProfileFormValues) => {
    if (imagePreviewError) {
      toast.error("The profile image URL could not be loaded. Please use another URL.");
      return;
    }

    setIsSaving(true);

    const previousImage = user.image ?? null;
    let uploadedUrl: string | null = null;
    let profileUpdated = false;

    try {
      if (selectedFile && previewDataUrl) {
        uploadedUrl = await uploadAvatar(previewDataUrl);
      }

      const nextImage = uploadedUrl ?? (values.imageUrl.trim() || null);
      const nextName = values.name.trim();

      const { error } = await authClient.updateUser({
        name: nextName,
        image: nextImage,
      });

      if (error) {
        throw new Error(error.message || "Failed to update profile");
      }

      profileUpdated = true;
      clearSelectedFile();
      form.reset({
        name: nextName,
        imageUrl: nextImage ?? "",
      });

      toast.success("Profile updated successfully");

      if (previousImage && previousImage !== nextImage) {
        await removeAvatarFile(previousImage);
      }

      try {
        await onSaved();
      } catch {
        toast.warning("Profile saved, but refreshing your session failed. Reload the page to see the latest details.");
      }
    } catch (error) {
      if (uploadedUrl && !profileUpdated) {
        // The profile update failed, so the freshly uploaded file is orphaned.
        await removeAvatarFile(uploadedUrl);
      }

      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card className="rounded-2xl border border-border bg-card shadow-lg shadow-foreground/5">
        <CardHeader className="space-y-1 border-b border-border px-6 py-5">
          <CardTitle className="text-lg font-semibold text-foreground">
            Account Details
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Changes are applied to your Kindora account immediately after you
            save.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 px-6 py-6">
          {/* Profile photo */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-foreground">
              Profile Photo
            </Label>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Avatar className="h-20 w-20 border border-border">
                <AvatarImage
                  key={previewSrc}
                  src={previewSrc || undefined}
                  alt={user.name}
                  onLoadingStatusChange={(status) => {
                    if (previewDataUrl || !trimmedImageUrl) {
                      return;
                    }

                    if (status === "error") {
                      setFailedImageUrl(trimmedImageUrl);
                    } else if (status === "loaded") {
                      setFailedImageUrl((currentUrl) =>
                        currentUrl === trimmedImageUrl ? null : currentUrl,
                      );
                    }
                  }}
                />
                <AvatarFallback className="bg-secondary text-xl font-semibold text-secondary-foreground">
                  {fallbackInitial}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-1 flex-col gap-2">
                <input
                  key={fileInputKey}
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                  aria-label="Upload a profile photo from your device"
                />

                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="gap-2 rounded-lg border-border bg-card text-foreground hover:bg-secondary hover:text-secondary-foreground"
                  >
                    <ImageUp className="h-4 w-4" />
                    Upload from device
                  </Button>

                  {selectedFile && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={clearSelectedFile}
                      className="gap-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                    >
                      <X className="h-4 w-4" />
                      Discard selection
                    </Button>
                  )}

                  {!selectedFile && watchedImageUrl.trim() && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleRemovePhoto}
                      className="gap-2 rounded-lg text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove photo
                    </Button>
                  )}
                </div>

                <p className="text-xs leading-relaxed text-muted-foreground">
                  PNG, JPEG or WebP up to 2MB.{" "}
                  {selectedFile
                    ? `Selected file: ${selectedFile.name}`
                    : "A device upload overrides the image URL below."}
                </p>
              </div>
            </div>
          </div>

          {/* Full name */}
          <div className="space-y-1.5">
            <Label
              htmlFor="name"
              className="text-sm font-semibold text-foreground"
            >
              Full Name
            </Label>

            <div className="relative">
              <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="name"
                placeholder="Enter your full name"
                className="h-10 rounded-lg border-border bg-input-background pl-10 text-foreground focus-visible:border-ring focus-visible:ring-ring/50"
                {...form.register("name")}
              />
            </div>

            {form.formState.errors.name && (
              <p className="text-xs text-destructive">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          {/* Email - read only */}
          <div className="space-y-1.5">
            <Label
              htmlFor="email"
              className="text-sm font-semibold text-foreground"
            >
              Email Address
            </Label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="email"
                type="email"
                value={user.email}
                readOnly
                disabled
                aria-describedby="email-helper"
                className="h-10 cursor-not-allowed rounded-lg border-border bg-muted pl-10 text-muted-foreground"
              />
            </div>

            <p
              id="email-helper"
              className="text-xs leading-relaxed text-muted-foreground"
            >
              Your email address cannot be changed.
            </p>
          </div>

          {/* Image URL */}
          <div className="space-y-1.5">
            <Label
              htmlFor="imageUrl"
              className="text-sm font-semibold text-foreground"
            >
              Profile Photo URL
            </Label>

            <div className="relative">
              <ImageUp className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="imageUrl"
                type="url"
                placeholder="https://example.com/photo.jpg"
                disabled={Boolean(selectedFile)}
                className="h-10 rounded-lg border-border bg-input-background pl-10 text-foreground focus-visible:border-ring focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-60"
                {...form.register("imageUrl")}
              />
            </div>

            {form.formState.errors.imageUrl && (
              <p className="text-xs text-destructive">
                {form.formState.errors.imageUrl.message}
              </p>
            )}

            {imagePreviewError && (
              <p className="text-xs text-destructive" role="alert">
                This image URL could not be loaded. Please check the link or choose another image.
              </p>
            )}

            <p className="text-xs leading-relaxed text-muted-foreground">
              Paste a public image link, or upload a file from your device.
            </p>
          </div>
        </CardContent>

        <div className="flex flex-col-reverse gap-3 border-t border-border px-6 py-4 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSaving}
            className="rounded-lg border-border bg-card text-foreground hover:bg-secondary hover:text-secondary-foreground"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isSaving}
            className="rounded-lg bg-primary text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </Card>
    </form>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending, refetch } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login?callbackURL=/profile");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <main className="min-h-screen bg-background px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <Skeleton className="h-10 w-56 rounded-full" />
          <Skeleton className="mt-4 h-5 w-80" />
          <Skeleton className="mt-10 h-96 w-full rounded-2xl" />
        </div>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="min-h-screen bg-background px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base text-muted-foreground">
            Redirecting to the login page...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground">
            <UserRound size={16} />
            Your Account
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            My <span className="text-primary">Profile</span>
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            View and update your personal information. Your email address is
            read-only and cannot be changed here.
          </p>
        </div>

        <ProfileForm user={session.user} onSaved={refetch} />
      </div>
    </main>
  );
}
