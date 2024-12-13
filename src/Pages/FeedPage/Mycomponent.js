import styled from "styled-components";
import { Link } from "react-router-dom";

// 전체 페이지 컨테이너
export const PageContainer = styled.div`
  background-color: #f9fafb; //그리드 간의 간격과 일치하는 배경색
  
  padding: 30px;
  min-height: 100vh;
`;

export const Grid = styled.div`
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); 
transition: transform 0.3s ease, box-shadow 0.3s ease;
 &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15); 
  }

`

// Feed 컨테이너
export const FeedContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
  
`;

// 헤더 섹션
export const FeedHeader = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: space-between;

`;

// 헤더 상단 섹션
export const FeedHeaderTop = styled.div`
  flex: 0 1 auto;
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
  margin-block-end: 30px;
`;

// 헤더 하단 섹션
export const FeedHeaderBottom = styled.div`
  flex: 0 1 auto; 
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-block-end: 20px;
  font-size: 20px;
  span {
    color: #858E96;
    font-weight: 400;
  }
  
`;

// Styled Container for the filter section
export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Styled Select
export const StyledSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  color: #333;
  &:focus {
    outline: none;
    border-color: #007aff;
  }
`;

// Styled Input
export const StyledInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  margin-left: 16px;
  background-color: white;
  color: #333;
  &:focus {
    outline: none;
    border-color: #007aff;
  }
`;

// Styled Label
export const StyledLabel = styled.label`
  font-size: 20px;
  font-weight: bold;
  color: #555;
  margin-right: 8px;
`;


// 포스트 그리드
export const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 20px;
  
 

`;

// 포스트 카드
export const PostCard = styled.div`
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); 
  border-radius: 8px;
  margin-bottom: 20px; /* 포스트 카드 간의 간격을 추가 */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 350px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15); 
  }
`;

// 포스트 이미지
export const PostImage = styled.img`
 
  height: 180px;
  width: 100%;
`;

// 포스트 세부 정보
export const PostDetails = styled.div`
  padding: 16px;
  height: 180px; 
  display: flex;
  flex-direction: column;
  background-color: white;
`;

// 포스트 제목
export const PostTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;

// 포스트 내용
export const PostMain = styled.p`
  flex-grow: 1; 
`;

// 포스트 메타 정보
export const PostMeta = styled.div`
  display: flex;
  margin-bottom: 12px;
  margin-top: 18px;
  font-size: 16px;
  color: #868e96;

  span {
    color: #adb5bd;
  }
`;

// 포스트 작성자
export const PostAuthor = styled.span`
  font-weight: bold;
  color: #495057;
  margin-left: 10px;
  span {
    font-weight: 300;

  }
`;

// 작성자 표시 및 좋아요 영역
export const PostActionContainer = styled.div`
  display: flex;
  padding: 12px 16px; 
  border-top: 2px solid #F1F3F5;
  background-color: white;

`;

export const PostActionMeta = styled.div`
  font-size: 16px;
  color: #868e96;
  margin-bottom: 14px;
`;

// 좋아요 아이콘
export const LikeIcon = styled.div`
  font-size: 14px;
  color: #ff6b6b;
  cursor: pointer;
  display: flex;
  justify-content: inherit;
  align-items: center;
  gap: 5px;
`;

// 버튼 아이콘
export const ButtonIcon = styled.button`
  font-size: 15px;
  align-items: center;
  width: 100px;
  height: 33px;
  font-weight: 800;
  border-radius: 16.5px;
  border: 1.5px solid black;
  background-color: #f8f9fa;
  &:hover {
    background-color: #D9D9D9;
  }
`;
//이미지 컴포넌트
export const StyledImage = styled.img`
  width: ${({ width }) => width || 'auto'}; 
  height: ${({ height }) => height || 'auto'};
  object-fit: cover;
  span {
    color: D9D9D9;
  }
`;

//동그라미 컴포넌트
export const StyledRadius = styled.div`
  width: ${({ width }) => width || '40px'};
  height: ${({ height }) => height || '40px'};
  background: #D9D9D9;
  border-radius: 50%;
`;

// 정렬 컴포넌트
export const Sort = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
  font-weight: ${({ fontWeight }) => fontWeight || 'auto'};
`;

export const StyledTrendingContainer = styled.div`
 display: flex;
  align-items: center;
  position: relative;
  padding-bottom: 10px; /* 텍스트와 선 사이 간격 */

  /* 하단 줄을 가상 요소로 추가 */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: black;
  }

  .trending-text {
    margin-left: 8px; /* 이미지와 텍스트 간격 조절 */
  }
`;

/* 박스 클릭시 DetailPage로 이동하는 태그 */
export const BoxLink = styled(Link)`
  text-decoration: none; 
  color: inherit; 
`;