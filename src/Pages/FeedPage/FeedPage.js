import React, { useState } from 'react';

import {
    FeedContainer,
    FeedHeader,
    PostGrid,
    PostImage,
    PostDetails,
    PostTitle,
    PostMeta,
    PostAuthor,
    LikeIcon,
    PageContainer,
    PostActionContainer,
    PostActionMeta,
    PostMain,
    FeedHeaderBottom,
    FeedHeaderTop,
    ButtonIcon,
    StyledImage,
    StyledRadius,
    Sort,
    StyledTrendingContainer,
    BoxLink
} from './Mycomponent';
import DetailPage from '../DetailPage/DetailPage';

function FeedPage() {
    const posts = [
        {
            id: 1,
            title: "개강은 왜 하는걸까",
            main: "왜 개강임? 개처럼강해지기는그냥힘들어",
            author: "살몬",
            likes: 47,
            date: "2034년 8월 14일",
            comments: 33
        }, {
            id: 2,
            title: "게으르다고 쫓겨났다",
            main: "회사에서 게으르다고 쫓겨났다.",
            author: "살몬",
            likes: 46,
            date: "2034년 8월 14일",
            comments: 33
        }, {
            id: 3,
            title: "게으르다고 쫓겨났다",
            main: "회사에서 게으르다고 쫓겨났다.",
            author: "살몬",
            likes: 46,
            date: "2034년 8월 14일",
            comments: 33
        }, {
            id: 4,
            title: "게으르다고 쫓겨났다",
            main: "회사에서 게으르다고 쫓겨났다.",
            author: "살몬",
            likes: 46,
            date: "2034년 8월 14일",
            comments: 33
        }, {
            id: 5,
            title: "게으르다고 쫓겨났다",
            main: "회사에서 게으르다고 쫓겨났다.",
            author: "살몬",
            likes: 46,
            date: "2034년 8월 14일",
            comments: 33
        }, {
            id: 2,
            title: "게으르다고 쫓겨났다",
            main: "회사에서 게으르다고 쫓겨났다.",
            author: "살몬",
            likes: 46,
            date: "2034년 8월 14일",
            comments: 33
        }
    ];

    // 좋아요 수 및 이미지 상태 관리
    const [likeCounts, setLikeCounts] = useState(posts.map(post => post.likes));
    const [likeImages, setLikeImages] = useState(
        posts.map(() => "/Image/like.png")
    );

    const handleLike = (index) => {
        const newLikeCounts = [...likeCounts];
        const newLikeImages = [...likeImages];
    
        if (newLikeImages[index] === "/Image/likeactive.png") {
            newLikeCounts[index] -= 1;
            newLikeImages[index] = "/Image/like.png";
        } else {
            newLikeCounts[index] += 1;
            newLikeImages[index] = "/Image/likeactive.png";
        }
        setLikeCounts(newLikeCounts);
        setLikeImages(newLikeImages);
    };

    return (
        <PageContainer>
            <FeedContainer>
                <FeedHeader>

                    {/* 상위 헤더 요소 */}

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

                    {/* 하위 헤더 요소 */}

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

                {/* 게시물 목록 */}

                <PostGrid>
                    {/* 리스트 rendering */}
                    {/* 컴포넌트 mapping */}
                    {
                        posts.map((post, index) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                likeCount={likeCounts[index]}
                                likeImage={likeImages[index]}
                                onLike={() => handleLike(index)}/>
                        ))
                    }
                </PostGrid>

            </FeedContainer>
        </PageContainer>
    );
}

// 게시물 카드 컴포넌트
function PostCard({post, likeCount, likeImage, onLike}) {
    return (
        <div>
            <BoxLink to="/detail" element={<DetailPage />
}>
                <PostImage/>
                <PostDetails>
                    <PostTitle>{post.title}</PostTitle>
                    <PostMain>{post.main}</PostMain>
                    <PostMeta>
                        <span>{post.date}</span>
                        <PostActionMeta>{post.comments}개의 댓글</PostActionMeta>
                    </PostMeta>
                </PostDetails>
            </BoxLink>

            <PostActionContainer>
                <StyledRadius width="20px" height="20px"/>
                <PostAuthor>
                    <span>by</span>
                    {post.author}</PostAuthor>
                <LikeIcon onClick={onLike} style={({marginLeft: 'auto'})}>
                    <StyledImage src={likeImage} alt="like icon" width="10px" height="10px"/> {likeCount}
                </LikeIcon>
            </PostActionContainer>
        </div>
    );
}

export default FeedPage;
