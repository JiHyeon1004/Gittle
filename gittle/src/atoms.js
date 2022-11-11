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

export const pushedBranch = atom({
  key: "pushedBranch",
  default: "",
});

export const currentBranch = atom({
  key: "currentBranch",
  default: "",
});

export const deleteBranch = atom({
  key: "deleteBranch",
  default: "",
});
export const mergingBranch = atom({
  key: "mergingBranch",
  default: "",
});

export const pushedData = atom({
  key:"pushedData",
  default:{},
})