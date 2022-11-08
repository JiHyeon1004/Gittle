import { atom, selector } from "recoil";

export const selectBranch = atom({
  key: "selectBranch",
  default: "main",
});

export const selectedBranch = selector({
  key: "selectedBranch",
  get: ({ get }) => {
    const branch = get(selectBranch);
    return branch;
  },
});

export const pushedBranch = atom({
  key: "pushedBranch",
  default: "",
});

export const mergingBranch = atom({
  key: "mergingBranch",
  default: "",
});

export const pullNumber = atom({
  key: "pullNumber",
  default: 0,
});
