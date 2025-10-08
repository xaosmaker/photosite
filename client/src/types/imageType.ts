export interface ImageType {
  albumId: number;
  pkid: number;
  src: string;
  filename: string;
  isCover: boolean;
  isShown: boolean;
  alt: string;
  height: number;
  width: number;
}

export interface PhotoAlbumResponse {
  categoriesId: string;
  isCover: boolean;
  description: string;
  title: string;
  pkid: number;
  photoAlbumSlug: string;
  images: ImageType[];
  alt: string;
}
