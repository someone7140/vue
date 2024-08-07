export const POST_PLACE_LIST_ACTION_CATEGORY = {
  None: "none",
  Modify: "modify",
  Select: "select",
} as const;
export type PostPlaceListActionCategoryType =
  (typeof POST_PLACE_LIST_ACTION_CATEGORY)[keyof typeof POST_PLACE_LIST_ACTION_CATEGORY];

export const POST_PLACE_ADD_AFTER_PAGE = {
  PlaceList: "placeList",
  AddPost: "addPost",
} as const;
export type PostPlaceAddAfterPage =
  (typeof POST_PLACE_ADD_AFTER_PAGE)[keyof typeof POST_PLACE_ADD_AFTER_PAGE];
