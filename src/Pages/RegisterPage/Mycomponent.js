import styled from "styled-components";
import { Link } from "react-router-dom";

// 입력 요소 (All)
export const Input = styled.input `
  width: 300px;
  border-width: 0;
  height: 30px;
  font-size: 17px;
  &::placeholder {
    font-size: 17px;
    color: #ACB5BD;
  }
  background-color: #f9fafb;
`;
export const EditInput = styled.input `
  width: 300px;
  border-width: 0;
  height: 30px;
  font-size: 17px;
  color: #ACB5BD;
  background-color: #f9fafb;
  &:focus {
    color: #15B886;
  }
  &::placeholder {
    font-size: 17px;
    color: #ACB5BD;
  }
`;

/* Label 밑줄 요소 */
export const Span = styled.span `
  text-decoration: underline;
  color: #15B886;
`;


// 라벨 요소
export const Label = styled.p `
  font-size: 14px;
  font-weight: bold;
  color: #ACB5BD;
  
`;

/* 헤더 -> H1 */
export const H1 = styled.h1 `
  font-size: 50px;
  margin: 0;
`;




/* ----------------------------------------최상위 요소---------------------------------------------- */
export const Page = styled.div `
width: 1800px;
/* height: 1000px; */
height: 100vh;
padding-top: 50px;
display: flex;
justify-content: ${props=> props.page === "edit" ? "" :"center"};
flex-direction: ${props => props.page === "edit" ? "column" : "row"};
background-color : #f9fafb;
`;

export const PostImage = styled.img`
 display: flex;
 margin-bottom: 50px;
`;

// 폼 페이지 요소
export const BaseContainer = styled.div `
width : 500px;
height : 500px;
`;

/* ----------------------------------------헤더 요소---------------------------------------------- */
export const Header = styled.div `
width: 373px;
height: 20%;
/* margin: 168px 0 30px 0; */
`;

/* ------------------------------------------메인 요소-------------------------------------------- */

export const Body = styled.div `
width: 373px;
height: 80%;
`;

/* -----------------------------------------이름 요소--------------------------------------------- */

export const Name = styled.div `
  width: 249px;
  border: 1px solid #ACB5BD;
  color: #ACB5BD;
  border-width: 0 0 1px;

  /* 입력요소 외곽 라인 없애기 */
  ${Input}:focus{
    outline: none;
}
`;
/* -----------------------------------------이메일 요소--------------------------------------------- */

export const Email = styled.div `
  width: 333px;
  border: 1px solid #ACB5BD;
  border-width: 0 0 1px;
  ${Input}:focus{
    outline: none;
}
`;
/* -------------------------------------------비밀번호 요소------------------------------------------- */

export const Password = styled.div `
  width: 274px;
  border: 1px solid #ACB5BD;
  border-width: 0 0 1px;
  ${Input}:focus{
    outline: none;
}
`;
/* ------------------------------------------자기소개 요소-------------------------------------------- */

export const Introduce = styled.div `
  width: 373px;
  border: 1px solid #ACB5BD;
  border-width: 0 0 1px;
  ${Input}:focus{
    outline: none;
}
`;

/* ------------------------------------------개인정보 약관 동의 요소-------------------------------------------- */

export const Checkbox = styled.input `
`;

export const Box = styled.div `
&:hover ${Label} {
  color: #15B886;
}

/* Input:placeholder */

&:hover ${Input}::placeholder {
  color: #15B886;
}

/ * hover event border-bottom */

&:hover ${Name},
&:hover ${Email},
&:hover ${Password},
&:hover ${Introduce},
&:hover ${Checkbox} {
  border-bottom: 1px solid #15B886;
}
`;

/* -----------------------------------------Footer--------------------------------------------- */

export const Bottom = styled.div `
`;

// 버튼 요소
export const Button = styled.button `
width: 93px;
height: 41px;
border-radius: 20.5px;
font-size: 20px;
font-weight: bold;
border-width: 0;
margin-right: 10px;
&:hover {
  color: white;
  background-color: #15B886;
}
`;

export const BoxLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;