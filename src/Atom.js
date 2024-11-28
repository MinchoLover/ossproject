import { atom } from "recoil";


// RegisterPage.js에서 이름, 이메일, 비밀번호, 자기소개를 입력 후, 이 값을 전역적으로 저장 -> EditPage나 다른 컴포넌트들에도 재사용 가능
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