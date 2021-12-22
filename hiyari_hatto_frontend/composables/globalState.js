import { useState } from "#app";

export const useUserState = () => {
  return useState("user", () => {
    return { user: undefined };
  });
};

export const useMenuState = () => {
  return useState("menu", () => {
    return { menu: "top" };
  });
};
