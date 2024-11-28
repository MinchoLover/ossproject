import React from 'react';
import { useRecoilState } from "recoil";
import { myInfoEmail, myInfoIntroduce, myInfoPassword, myInfoname } from '../../Atom';
import { useNavigate } from "react-router-dom";

import { BaseContainer, Body, Bottom, Box, BoxLink, Button, EditInput, Email, H1, Header, Introduce, Label, Name, Page, Password } from "../RegisterPage/Mycomponent";
import { ButtonIcon, FeedHeaderTop, Sort, StyledImage, StyledRadius } from '../FeedPage/Mycomponent';



function EditPage () {

  const [myName, setMyName] = useRecoilState(myInfoname);
  const [myEmail, setMyEmail] = useRecoilState(myInfoEmail);
  const [myPassword, setMyPassword] = useRecoilState(myInfoPassword);
  const [myIntroduce, setMyIntroduce] = useRecoilState(myInfoIntroduce);
  

  const navigator = useNavigate();

  const submitHandler = () => {
    if (window.confirm('수정하시겠습니까?')) {
      alert('수정되었습니다.');
      navigator("/feed");
    }else{
      alert("취소되었습니다.");
    }
  }
  return (
    <Page page = "edit">
        <FeedHeaderTop style={({
            width: '1100px',
            height: '60px',
        })}>
        <StyledImage src="/Image/velog logo.png" alt="velog logo"/>
                <Sort>
                    <StyledImage src="/Image/bell.png" alt="bell" width="20px" height="20px"/>
                    <StyledImage src="/Image/search.png" alt="search" width="20px" height="20px"/>
                    <ButtonIcon>새 글 작성</ButtonIcon>
                    <BoxLink to="/edit"><StyledRadius/>
                    </BoxLink>

                </Sort>
            </FeedHeaderTop>
            <BaseContainer style={({
                
            })}>
            
            

                {/* 헤더요소 */}

                <Header>
                    <H1>회원정보 수정</H1>
                    <p>기본 회원 정보를 수정해주세요</p>
                </Header>

                {/* 바디요소 */}

                <Body>
                    <Box>
                        <Label>이름</Label>
                        <Name>
                            <EditInput
                                type="text"
                                placeholder="이름을 입력해주세요."
                                value={myName}
                                onChange={(e) => setMyName(e.target.value)}
                            />
                            
                        </Name>
                    </Box>

                    <Box>
                        <Label>이메일</Label>
                        <Email>
                            <EditInput
                                type="text"
                                placeholder="이메일을 입력해주세요."
                                value={myEmail}
                                onChange={(e) => setMyEmail(e.target.value)}
                            />
                          
                        </Email>
                    </Box>

                    <Box>
                        <Label>비밀번호</Label>
                        <Password>
                            <EditInput
                                type="password"
                                placeholder="비밀번호를 입력해주세요."
                                value={myPassword}
                                onChange={(e) => setMyPassword(e.target.value)}
                            />
                        </Password>
                    </Box>

                    <Box>
                        <Label>한 줄 소개</Label>
                        <Introduce>
                            <EditInput
                                type="text"
                                placeholder="당신을 한 줄로 소개해보세요"
                                value={myIntroduce}
                                onChange={(e) => setMyIntroduce(e.target.value)}
                            />
                        </Introduce>
                    </Box>

                </Body>

                {/* 수정 밑 취소 버튼 요소 */}

                <Bottom>
                    <Button bgColor="orange">취소</Button>
                    <Button onClick={submitHandler}>
                        수정
                    </Button>
                </Bottom>
            </BaseContainer>
        </Page>
  );
}

export default EditPage;