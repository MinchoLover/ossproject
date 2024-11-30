import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BoxLink, ButtonIcon, FeedContainer, FeedHeader, FeedHeaderBottom, FeedHeaderTop, LikeIcon, PageContainer, PostActionContainer, PostActionMeta, PostAuthor, PostDetails, PostGrid, PostImage, PostMeta, PostTitle, Sort, StyledImage, StyledRadius, StyledTrendingContainer } from './Mycomponent';
import DetailPage from '../DetailPage/DetailPage';



function FeedPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFestivals = async () => {
        try {
            const response = await axios.get(
                "https://apis.data.go.kr/6260000/FestivalService/getFestivalKr",
            { params: {
                    serviceKey: process.env.REACT_APP_API_KEY,
                    numOfRows: 30,
                    pageNo: 1,
                    resultType: "json",
                },}
        );
        console.log("응답 데이터:", response.data)
        const items = response.data.getFestivalKr?.item || [];
        if(items.length === 0) {
            throw new Error("현재 데이터가 비어 있습니다.");
        }
        setPosts(items);
        } catch (error) {
            setError("API 요청 중 오류가 발생했습니다.");
            console.error(error);
        } finally {
            setLoading(false);
        }
        };
    fetchFestivals();
}, []);

if (loading) return <p>로딩 중 ...</p>
if (error) return <p>{error}</p>
    
return (
    <PageContainer>
        <FeedContainer>
            <FeedHeader>
            <FeedHeaderTop>
                       <StyledImage src="/Image/velog logo.png" alt="velog logo"/>
                      <Sort>
                         <StyledImage src="/Image/bell.png" alt="bell" width="20px" height="20px"/>
                         <StyledImage src="/Image/search.png" alt="search" width="20px" height="20px"/>
                            <ButtonIcon>새 글 작성</ButtonIcon>
                          <BoxLink to="/edit"><StyledRadius/>
                           </BoxLink>

                      </Sort>
                   </FeedHeaderTop>

                        <FeedHeaderBottom>
                         <Sort fontWeight="bold">
                             <StyledTrendingContainer>
                                 <StyledImage
                                     src="/Image/trending.png"
                                     alt="trending"
                                     width="30px"
                                     height="30px"/>
                                 <div className="trending-text">트렌딩</div>
                             </StyledTrendingContainer>
                             <StyledImage src="/Image/clock.png" alt="clock" width="30px" height="30px"/>
                             <span>최신</span>
                             <StyledImage src="/Image/wifi.png" alt="wifi" width="30px" height="30px"/>
                             <span>피드</span>
                        </Sort>
                         <Sort>
                             <StyledImage
                                src="/Image/dropdown.png"
                                 alt="dropdown"
                                 width="100px"
                                 height="30px"/>
                             <StyledImage src="/Image/dot.png" alt="dot" width="2px" height="15px"/>
                         </Sort>
                    </FeedHeaderBottom>
            </FeedHeader>

            <PostGrid>
                {posts.length > 0 ? (
                    posts.map((post, index) => (
                        <PostCard
                            key={post.UC_SEQ} // API에서 고유 ID 사용
                            post={post}
                            id={post.UC_SEQ}
                            likeCount={0} // 초기 좋아요 수
                            likeImage="/Image/like.png" // 초기 좋아요 이미지
                            onLike={() => console.log("좋아요 클릭")}
                        />
                    ))
                ) : (
                    <p>축제 정보가 없습니다.</p>
                )}
            </PostGrid>
        </FeedContainer>
    </PageContainer>
);
}

// 게시물 카드 컴포넌트
function PostCard({ post, likeCount, likeImage, onLike, id }) {
    const removeParent = (text) => {
        return text.replace(/\(.*?\)/g, '').trim();
    };
    console.log(post.MAIN_IMG_THUMBNAIL);

return (
    <div>
        <BoxLink to={`/detail/${id}`} element={<DetailPage />}>
            {post.MAIN_IMG_THUMB && (
                <PostImage src={post.MAIN_IMG_THUMB}/>
            )}
            
            <PostDetails>
                <PostTitle>{removeParent(post.MAIN_TITLE)}</PostTitle>
                {/* <PostMain>{post.ITEMCNTNTS}</PostMain> */}
                <PostMeta>
                    <span>{post.USAGE_DAY_WEEK_AND_TIME || "날짜 정보 없음"}</span>
                    <PostActionMeta>댓글 없음</PostActionMeta>
                </PostMeta>
            </PostDetails>
        </BoxLink>

        <PostActionContainer>
            <StyledRadius width="20px" height="20px" />
            <PostAuthor>
                <span>연락처</span> {post.CNTCT_TEL || "알 수 없음"}
            </PostAuthor>
            <LikeIcon onClick={onLike} style={{ marginLeft: "auto" }}>
                <StyledImage src={likeImage} alt="like icon" width="10px" height="10px" /> {likeCount}
            </LikeIcon>
        </PostActionContainer>
    </div>
);
}




export default FeedPage;
// import {
//     FeedContainer,
//     FeedHeader,
//     PostGrid,
//     PostImage,
//     PostDetails,
//     PostTitle,
//     PostMeta,
//     PostAuthor,
//     LikeIcon,
//     PageContainer,
//     PostActionContainer,
//     PostActionMeta,
//     PostMain,
//     FeedHeaderBottom,
//     FeedHeaderTop,
//     ButtonIcon,
//     StyledImage,
//     StyledRadius,
//     Sort,
//     StyledTrendingContainer,
//     BoxLink
// } from './Mycomponent';
// import DetailPage from '../DetailPage/DetailPage';

// function FeedPage() {
//     const posts = [
//         {
//             id: 1,
//             title: "축제 제목",
//             main: "왜 개강임? 개처럼강해지기는그냥힘들어",
//             author: "살몬",
//             likes: 47,
//             date: "2034년 8월 14일",
//             comments: 33
//         }, {
//             id: 2,
//             title: "게으르다고 쫓겨났다",
//             main: "회사에서 게으르다고 쫓겨났다.",
//             author: "살몬",
//             likes: 46,
//             date: "2034년 8월 14일",
//             comments: 33
//         }, {
//             id: 3,
//             title: "게으르다고 쫓겨났다",
//             main: "회사에서 게으르다고 쫓겨났다.",
//             author: "살몬",
//             likes: 46,
//             date: "2034년 8월 14일",
//             comments: 33
//         }, {
//             id: 4,
//             title: "게으르다고 쫓겨났다",
//             main: "회사에서 게으르다고 쫓겨났다.",
//             author: "살몬",
//             likes: 46,
//             date: "2034년 8월 14일",
//             comments: 33
//         }, {
//             id: 5,
//             title: "게으르다고 쫓겨났다",
//             main: "회사에서 게으르다고 쫓겨났다.",
//             author: "살몬",
//             likes: 46,
//             date: "2034년 8월 14일",
//             comments: 33
//         }, {
//             id: 2,
//             title: "게으르다고 쫓겨났다",
//             main: "회사에서 게으르다고 쫓겨났다.",
//             author: "살몬",
//             likes: 46,
//             date: "2034년 8월 14일",
//             comments: 33
//         }
//     ];

//     // 좋아요 수 및 이미지 상태 관리
//     const [likeCounts, setLikeCounts] = useState(posts.map(post => post.likes));
//     const [likeImages, setLikeImages] = useState(
//         posts.map(() => "/Image/like.png")
//     );

//     const handleLike = (index) => {
//         const newLikeCounts = [...likeCounts];
//         const newLikeImages = [...likeImages];
    
//         if (newLikeImages[index] === "/Image/likeactive.png") {
//             newLikeCounts[index] -= 1;
//             newLikeImages[index] = "/Image/like.png";
//         } else {
//             newLikeCounts[index] += 1;
//             newLikeImages[index] = "/Image/likeactive.png";
//         }
//         setLikeCounts(newLikeCounts);
//         setLikeImages(newLikeImages);
//     };

//     return (
//         <PageContainer>
//             <FeedContainer>
//                 <FeedHeader>

//                     {/* 상위 헤더 요소 */}

//                     <FeedHeaderTop>
//                         <StyledImage src="/Image/velog logo.png" alt="velog logo"/>
//                         <Sort>
//                             <StyledImage src="/Image/bell.png" alt="bell" width="20px" height="20px"/>
//                             <StyledImage src="/Image/search.png" alt="search" width="20px" height="20px"/>
//                             <ButtonIcon>새 글 작성</ButtonIcon>
//                             <BoxLink to="/edit"><StyledRadius/>
//                             </BoxLink>

//                         </Sort>
//                     </FeedHeaderTop>

//                     {/* 하위 헤더 요소 */}

//                     <FeedHeaderBottom>
//                         <Sort fontWeight="bold">
//                             <StyledTrendingContainer>
//                                 <StyledImage
//                                     src="/Image/trending.png"
//                                     alt="trending"
//                                     width="30px"
//                                     height="30px"/>
//                                 <div className="trending-text">트렌딩</div>
//                             </StyledTrendingContainer>
//                             <StyledImage src="/Image/clock.png" alt="clock" width="30px" height="30px"/>
//                             <span>최신</span>
//                             <StyledImage src="/Image/wifi.png" alt="wifi" width="30px" height="30px"/>
//                             <span>피드</span>
//                         </Sort>
//                         <Sort>
//                             <StyledImage
//                                 src="/Image/dropdown.png"
//                                 alt="dropdown"
//                                 width="100px"
//                                 height="30px"/>
//                             <StyledImage src="/Image/dot.png" alt="dot" width="2px" height="15px"/>
//                         </Sort>
//                     </FeedHeaderBottom>

//                 </FeedHeader>

//                 {/* 게시물 목록 */}

//                 <PostGrid>
//                     {/* 리스트 rendering */}
//                     {/* 컴포넌트 mapping */}
//                     {
//                         posts.map((post, index) => (
//                             <PostCard
//                                 key={post.id}
//                                 post={post}
//                                 likeCount={likeCounts[index]}
//                                 likeImage={likeImages[index]}
//                                 onLike={() => handleLike(index)}/>
//                         ))
//                     }
//                 </PostGrid>

//             </FeedContainer>
//         </PageContainer>
//     );
// }

// // 게시물 카드 컴포넌트
// function PostCard({post, likeCount, likeImage, onLike}) {
//     return (
//         <div>
//             <BoxLink to="/detail" element={<DetailPage />
// }>
//                 <PostImage/>
//                 <PostDetails>
//                     <PostTitle>{post.title}</PostTitle>
//                     <PostMain>{post.main}</PostMain>
//                     <PostMeta>
//                         <span>{post.date}</span>
//                         <PostActionMeta>{post.comments}개의 댓글</PostActionMeta>
//                     </PostMeta>
//                 </PostDetails>
//             </BoxLink>

//             <PostActionContainer>
//                 <StyledRadius width="20px" height="20px"/>
//                 <PostAuthor>
//                     <span>by</span>
//                     {post.author}</PostAuthor>
//                 <LikeIcon onClick={onLike} style={({marginLeft: 'auto'})}>
//                     <StyledImage src={likeImage} alt="like icon" width="10px" height="10px"/> {likeCount}
//                 </LikeIcon>
//             </PostActionContainer>
//         </div>
//     );
// }

// export default FeedPage;
