import axios from "axios";
import { BoxLink, ButtonIcon, Sort } from "../FeedPage/Mycomponent";
import { useRecoilState } from "recoil";
import { myInfoname } from '../../Atom';
import { useState, useEffect } from "react";
import {
    AuthorImage,
    AuthorLogo,
    AuthorName,
    BaseContainer,
    
    Date,
    FeedAuthorInfo,
    FeedContainer,
    FeedContent,
    FeedInfo,
    FeedTitle,
    Header,
    
    
    Line,
    MainContainer,
    Name,
    
    StyledImage
} from "./Mycomponent";
import { useParams } from "react-router-dom";
import { Page } from "../RegisterPage/Mycomponent";



function DetailPage() {
    // 포스트 정보를 담고 있는 배열
    const [myName] = useRecoilState(myInfoname);
   
    // 아이디 값 detail로 넘겨줄 것들, 에러 로딩
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    const removeParent = (text) => {
        return text.replace(/\(.*?\)/g, '').trim();
    };

    useEffect(() => {
        const fetchFestivals = async () => {
        try {
            const response = await axios.get(
                "https://apis.data.go.kr/6260000/FestivalService/getFestivalKr",
                {
                    params: {
                        serviceKey: process.env.REACT_APP_API_KEY,
                        numOfRows: 1,
                        UC_SEQ: id,
                        resultType: "json",
                    },
                }
            );
            
            console.log("응답 데이터:", response.data)
            const items = response.data.getFestivalKr?.item || [];
            
            if(!items) {
                throw new Error("데이터를 찾을 수 없습니다.");
            }
            setPosts(items[0]); 
            setLoading(false);
        } catch (error) {
            setError("API 요청 중 오류가 발생했습니다.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    fetchFestivals();
}, [id]);

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;

    return (
  <Page style={({paddingTop: "50px" ,backgroundColor: "f9fafb"})}>

        
        <BaseContainer>
            <Header>
                <Sort>
                    <BoxLink to="/feed">
                    <StyledImage src="/DetailImage/Group 3.png" alt="velog logo" width="500px" height="120px"/>
                    </BoxLink>
                    <AuthorLogo>
                     
                    </AuthorLogo>
                </Sort>

                <Sort>
                    
                    
                    <ButtonIcon>메인 페이지</ButtonIcon>
                    <ButtonIcon>즐겨찾기</ButtonIcon>
                   
                </Sort>
            </Header>

            <MainContainer>
               

                <FeedContainer>
                    <FeedTitle>{posts.MAIN_TITLE ? removeParent(posts.MAIN_TITLE) : "로딩 중..."}</FeedTitle>
                    

                    <FeedInfo>
                        <div
                            style={{
                                display: 'flex',
                                gap: '20px'
                            }}>
                            <Name>{myName}</Name>
                            <Date>{posts.USAGE_DAY}</Date>
                        </div>
                        
                    </FeedInfo>
                    <div>

                    <img src={posts.MAIN_IMG_THUMB} alt={posts.MAIN_TITLE}/>
                    </div>
                
                    <FeedContent>
                    <h2>축제 세부 정보</h2>
                    {posts.ITEMCNTNTS}
                    </FeedContent>

                    <FeedContent>
                        <h2>오시는 길</h2>
                        오시는 길: {posts.TRFC_INFO}
                    </FeedContent>
                        
                    <FeedAuthorInfo>
                        <AuthorImage src="/Image/wifi.png" alt="velog logo"  />
                       
                        <div>
                            <AuthorName>{myName}</AuthorName>
                            
                        </div>
                    </FeedAuthorInfo>
                    <Line></Line>
                  
                </FeedContainer>
            </MainContainer>
        </BaseContainer>
        </Page>
    );
}





export default DetailPage;