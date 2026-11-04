"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, ImageUp, Mail, Trash2, UserRound } from "lucide-react";
import { toast } from "sonner";

import ProfileShell, {
  type ProfileShellContext,
} from "@/components/Profile/ProfileShell";
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
import { authClient } from "@/lib/auth-client";

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

interface ProfileEditFormProps {
  user: ProfileShellContext["user"];
  refetch: ProfileShellContext["refetch"];
}

function ProfileEditForm({ user, refetch }: ProfileEditFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
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
  const previewSrc = trimmedImageUrl;

  useEffect(() => {
    const imageUrl = watchedImageUrl.trim();

    if (!imageUrl) {
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
  }, [watchedImageUrl]);

  // An empty image URL is a valid "remove the photo" request, not a broken URL.
  const imagePreviewError =
    trimmedImageUrl !== "" && failedImageUrl === trimmedImageUrl;

  const fallbackInitial = (user.name || user.email).charAt(0).toUpperCase();

  const handleCancel = () => {
    router.push("/profile");
  };

  const handleRemovePhoto = () => {
    form.setValue("imageUrl", "", { shouldValidate: true });
  };

  const onSubmit = async (values: ProfileFormValues) => {
    if (imagePreviewError) {
      toast.error(
        "The profile image URL could not be loaded. Please use another URL.",
      );
      return;
    }

    setIsSaving(true);

    try {
      const nextImage = values.imageUrl.trim() || null;
      const nextName = values.name.trim();

      const { error } = await authClient.updateUser({
        name: nextName,
        image: nextImage,
      });

      if (error) {
        throw new Error(error.message || "Failed to update profile");
      }

      form.reset({
        name: nextName,
        imageUrl: nextImage ?? "",
      });

      toast.success("Profile updated successfully");

      try {
        await refetch();
      } catch {
        toast.warning(
          "Profile saved, but refreshing your session failed. Reload the page to see the latest details.",
        );
      }

      router.push("/profile");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <Link
        href="/profile"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Profile
      </Link>

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
                      if (!trimmedImageUrl) {
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
                  {trimmedImageUrl ? (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleRemovePhoto}
                      className="w-fit gap-2 rounded-lg text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove photo
                    </Button>
                  ) : (
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      No profile photo set. Your name initial is shown instead.
                    </p>
                  )}

                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Paste a public image link below, or leave it empty to remove
                    your profile photo.
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
                  className="h-10 rounded-lg border-border bg-input-background pl-10 text-foreground focus-visible:border-ring focus-visible:ring-ring/50"
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
                  This image URL could not be loaded. Please check the link or
                  use another image.
                </p>
              )}

              <p className="text-xs leading-relaxed text-muted-foreground">
                Paste a public image link, or leave it empty to remove your
                profile photo.
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
    </div>
  );
}

export default function EditProfilePage() {
  return (
    <ProfileShell
      title="Edit"
      highlight="Profile"
      subtitle="Update your display name and profile photo. Your email address is read-only."
      callbackURL="/profile/edit"
    >
      {({ user, refetch }) => (
        <ProfileEditForm user={user} refetch={refetch} />
      )}
    </ProfileShell>
  );
}
