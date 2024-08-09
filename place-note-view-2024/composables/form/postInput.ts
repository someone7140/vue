export interface PostInputForm {
  valid?: boolean;
  title?: string;
  placeId?: string;
  visitedDate?: Date;
  isOpen?: boolean;
  categoryIdList?: string[];
  detail?: string;
  urlList?: string[];
}
