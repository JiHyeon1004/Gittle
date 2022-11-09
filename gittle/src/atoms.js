import { atom, selector } from "recoil";

export const selectBranch = atom({
  key: "selectBranch",
  default: "",
});

export const selectedBranch = selector({
  key: "selectedBranch",
  get: ({ get }) => {
    const branch = get(selectBranch);
    return branch;
  },
});

export const currentBranch = atom({
  key: "currentBranch",
  default: "",
});

export const deleteBranch = atom({
  key: "deleteBranch",
  default: "",
});
