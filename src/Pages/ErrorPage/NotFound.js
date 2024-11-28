import styled from 'styled-components';



function NotFound() {
  return (
    <Container>
      <Title>404 Not Found</Title>
      <Message>요청하신 페이지를 찾을 수 없습니다.</Message>
      <HomeLink href="/feed">홈으로 돌아가기</HomeLink>
    </Container>
  );
}

export default NotFound;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* 화면 전체 높이를 차지 */
  background-color: #f8f9fa; /* 배경색 */
  text-align: center; /* 텍스트 중앙 정렬 */
`;

const Title = styled.h1`
  font-size: 72px; /* 제목 크기 */
  font-weight: bold; /* 굵은 글씨 */
  color: #343a40; /* 글자 색상 */
`;

const Message = styled.p`
  font-size: 24px; /* 메시지 크기 */
  color: #868e96; /* 회색 글자 색상 */
`;

const HomeLink = styled.a`
  margin-top: 20px; /* 위쪽 여백 */
  font-size: 18px; /* 링크 크기 */
  color: #007bff; /* 링크 색상 */
  text-decoration: none; /* 밑줄 제거 */
  
  &:hover {
    text-decoration: underline; /* 호버 시 밑줄 추가 */
  }
`;