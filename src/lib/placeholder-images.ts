import data from "./placeholder-images.json";

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  category?: string;
  name?: string;
};

export const PlaceHolderImages: ImagePlaceholder[] =
  data.placeholderImages.filter((p) => p.imageUrl) as ImagePlaceholder[];
