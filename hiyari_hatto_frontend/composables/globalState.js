import { useState } from "#app";

export const useUserState = () => {
  return useState("user", () => {
    return { user: undefined };
  });
};
