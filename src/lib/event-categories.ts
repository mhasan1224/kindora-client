
export const eventCategories = [
  "Tree Plantation",
  "Community Cleanup",
  "Food Donation",
  "Education Support",
  "Blood Donation",
  "Clothes Distribution",
  "Community Support",
  "Health Awareness",
] as const;

export type EventCategory = (typeof eventCategories)[number];
