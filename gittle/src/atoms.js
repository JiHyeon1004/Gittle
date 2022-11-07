import { atom, selector } from 'recoil'

export const selectBranch = atom({
  key: 'selectBranch',
  default: 'main'
})

export const selectedBranch = selector({
  key: "selectedBranch",
  get: ({get}) => {
    const branch = get(selectBranch)
    return branch
  }
})