import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';

import {
    BoxLink,
    ButtonIcon,
    FeedContainer,
    FeedHeader,
    FeedHeaderBottom,
    FeedHeaderTop,
    Grid,
    LikeIcon,
    PageContainer,
    PostActionContainer,
    PostAuthor,
    PostDetails,
    PostGrid,
    PostImage,
    PostMeta,
    PostTitle,
    Sort,
    StyledImage,
    StyledInput,
    StyledLabel,
    StyledRadius,
    StyledSelect,
    StyledTrendingContainer
} from './Mycomponent';
import DetailPage from '../DetailPage/DetailPage';

function FeedPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState({
        gugun: '',
        date: '',
        keyword: '',
    });
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");


    useEffect(() => {
        const fetchFestivals = async () => {
            try {
                // OpenAPI 데이터 가져오기
                const response = await axios.get(
                    "https://apis.data.go.kr/6260000/FestivalService/getFestivalKr",
                    {
                        params: {
                            serviceKey: process.env.REACT_APP_API_KEY,
                            numOfRows: 100,
                            pageNo: 1,
                            resultType: "json",
                        },
                    }
                );
                const items = response.data.getFestivalKr?.item || [];
    
                // MockAPI 데이터 가져오기
                const mockResponse = await axios.get("https://674d47b354e1fca9290eeeb5.mockapi.io/festivals");
                const favorites = mockResponse.data;
    
                // OpenAPI 데이터와 MockAPI 데이터 병합
                const postsWithLikes = items.map((item) => ({
                    ...item,
                    likeCount: favorites.find((fav) => fav.UC_SEQ === item.UC_SEQ)?.likeCount || 0,
                    liked: !!favorites.find((fav) => fav.UC_SEQ === item.UC_SEQ),
                }));

                setPosts(postsWithLikes);
            } catch (error) {
                setError("API 요청 중 오류가 발생했습니다.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchFestivals();
    }, []);


    const extractDate = (dateString) => {
        if (!dateString || typeof dateString !== "string") {
            return new Date("1970-01-01");
        }
    
        const dateMatch = dateString.match(/(\d{4})[년\s\-.]*(\d{1,2})?[월\s\-.]*(\d{1,2})?[일\s\-.]*/);
        if (dateMatch) {
            const [, year, month = "01", day = "01"] = dateMatch; // 연도는 필수, 월/일이 없으면 기본값 1월 1일
            return new Date(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
        }
    
        const rangeMatch = dateString.match(/(\d{4})[년\s\-.]*(\d{1,2})?[월\s\-.]*~\s*(\d{4})?[년\s\-.]*(\d{1,2})?[월\s\-.]*/);
        if (rangeMatch) {
            const [, startYear, endYear = null, endMonth = "01"] = rangeMatch;
            const year = endYear || startYear;
            const month = endMonth.padStart(2, "0");
            return new Date(`${year}-${month}-01`);
        }
    
        if (dateString.includes("예정") || dateString.includes("취소")) {
            return new Date("2100-01-01");
        }
    
        if (dateString.includes("날짜 정보 없음")) {
            return new Date("1970-01-01");
        }
    
        return new Date("1970-01-01");
    };
    
    const sortByDate = useCallback((posts, order = "asc") => {
        return posts.sort((a, b) => {
            const dateA = extractDate(a.USAGE_DAY_WEEK_AND_TIME || "");
            const dateB = extractDate(b.USAGE_DAY_WEEK_AND_TIME || "");
            return order === "asc" ? dateA - dateB : dateB - dateA;
        });
    }, []);

    const handleLike = async (id) => {
        try {
            const postToUpdate = posts.find((post) => post.UC_SEQ === id);
            if (!postToUpdate) return;
    
            const updatedLiked = !postToUpdate.liked;
            const updatedLikeCount = updatedLiked
                ? postToUpdate.likeCount + 1
                : postToUpdate.likeCount - 1;
    
            if (updatedLiked) {
                await axios.post("https://674d47b354e1fca9290eeeb5.mockapi.io/festivals", {
                    ...postToUpdate,
                    liked: updatedLiked,
                    likeCount: updatedLikeCount,
                });
            } else {
                const response = await axios.get("https://674d47b354e1fca9290eeeb5.mockapi.io/festivals");
                const favorite = response.data.find((fav) => fav.UC_SEQ === id);
                if (favorite) {
                    await axios.delete(`https://674d47b354e1fca9290eeeb5.mockapi.io/festivals/${favorite.id}`);
                }
            }
    
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.UC_SEQ === id
                        ? { ...post, liked: updatedLiked, likeCount: updatedLikeCount }
                        : post
                )
            );
        } catch (error) {
            console.error("좋아요 업데이트 오류:", error);
        }
    };

    useEffect(() => {
        const filtered = posts.filter((post) => {
            const matchGugun = filter.gugun
                ? post.GUGUN_NM?.includes(filter.gugun)
                : true;
            const matchDate = filter.date
                ? post.USAGE_DAY_WEEK_AND_TIME?.includes(filter.date)
                : true;
            const matchKeyword = filter.keyword
                ? post.MAIN_TITLE?.includes(filter.keyword)
                : true;
            return matchGugun && matchDate && matchKeyword;
        });
    
        const sorted = sortByDate(filtered, sortOrder);
        setFilteredPosts(sorted);
    }, [filter, posts, sortOrder, sortByDate]);


    if (loading) return <p>로딩 중 ...</p>;
    if (error) return <p>{error}</p>;

    return (
        <PageContainer>
            <FeedContainer>
                <FeedHeader>
                    <FeedHeaderTop>
                        <StyledImage src="/DetailImage/bugilogo.png" alt="velog logo" width="500px" height="100px" />
                        <Sort>
                            <StyledImage src="/Image/bell.png" alt="bell" width="20px" height="20px" />
                            <StyledImage src="/Image/search.png" alt="search" width="20px" height="20px" />
                            <ButtonIcon>
                                <BoxLink to="/edit">개인 정보 수정</BoxLink>
                            </ButtonIcon>
                            <ButtonIcon>
                                <BoxLink to="/mypage">즐겨찾기</BoxLink>
                            </ButtonIcon>
                        </Sort>
                    </FeedHeaderTop>
                    <FeedHeaderBottom>
                        <Sort fontWeight="bold">
                            <StyledTrendingContainer>
                                <StyledImage src="/Image/trending.png" alt="trending" width="30px" height="30px" />
                                <div className="trending-text">트렌딩</div>
                            </StyledTrendingContainer>
                            <Sort>
                                <ButtonIcon onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}>
                                    {sortOrder === "asc" ? "최신순" : "과거순"}
                                </ButtonIcon>
                            </Sort>
                        </Sort>
                        <div style={{ marginBottom: "20px" }}>
                                <StyledLabel>지역:</StyledLabel>
                            <StyledSelect
                                value={filter.gugun}
                                onChange={(e) => setFilter({ ...filter, gugun: e.target.value })}
                            >
                                <option value="">전체</option>
                                <option value="해운대구">해운대구</option>
                                <option value="중구">중구</option>
                                <option value="사하구">사하구</option>
                                <option value="부산진구">부산진구</option>
                            </StyledSelect>
                            <div>
                        <StyledLabel>축제 이름:</StyledLabel>
                        <StyledInput
                            type="text"
                            placeholder="축제 이름을 입력하세요"
                            value={filter.keyword}
                            onChange={(e) => setFilter({ ...filter, keyword: e.target.value })}
                        />
                            </div>
                        </div>
                    </FeedHeaderBottom>
                </FeedHeader>
                <PostGrid>
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <PostCard
                                key={post.UC_SEQ}
                                post={post}
                                id={post.UC_SEQ}
                                likeCount={post.likeCount}
                                likeImage={post.liked ? "/Image/likeactive.png" : "/Image/like.png"}
                                onClick={() => handleLike(post.UC_SEQ)} // 좋아하는 목록 추가
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

function PostCard({ post, likeCount, likeImage, onClick, id }) {
    const removeParent = (text) => {
        return text.replace(/\(.*?\)/g, '').trim();
    };

    return (
        <Grid>
            <BoxLink to={`/detail/${post.UC_SEQ}`} element={<DetailPage />}>
                {post.MAIN_IMG_THUMB && (<PostImage src={post.MAIN_IMG_THUMB} />)}
                <PostDetails>
                    <PostTitle>{removeParent(post.MAIN_TITLE)}</PostTitle>
                    <PostMeta>
                        <div>{post.USAGE_DAY_WEEK_AND_TIME || "날짜 정보 없음"}</div>
                    </PostMeta>
                    <div>
                        
                    <PostMeta>이용 가격: {post.USAGE_AMOUNT || "이용 가격 정보 없음"} </PostMeta>
                    </div>
                </PostDetails>
            </BoxLink>

            <PostActionContainer>
                <StyledRadius width="20px" height="20px" />
                <PostAuthor>
                    <span>연락처 </span>
                    {post.CNTCT_TEL || "알 수 없음"}
                </PostAuthor>
                <LikeIcon onClick={() => onClick(post.UC_SEQ)} style={{ marginLeft: "auto" }}>
                    <StyledImage src={likeImage} alt="like icon" width="10px" height="10px" /> {likeCount}
                </LikeIcon>
            </PostActionContainer>
        </Grid>
    );
}

export default FeedPage;
