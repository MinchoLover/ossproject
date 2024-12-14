import { atom } from "recoil";

export const myInfoname = atom({
  key: 'myInfoname;',
  default: '',
});

export const myInfoEmail = atom({
  key: 'myInfoEmail',
  default: '',
});

export const myInfoPassword = atom({
  key: 'myInfoPassword',
  default: '',
});

export const myInfoIntroduce = atom({
  key: 'myInfoIntroduce',
  default: '',
});

export const updatedLikeCount = atom({
  key: 'like',
  default: 0,
})