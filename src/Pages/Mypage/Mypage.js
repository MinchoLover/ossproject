import React, { useState, useEffect } from "react";
import axios from "axios";
import { BoxLink, ButtonIcon, FeedContainer, FeedHeader, FeedHeaderTop, LikeIcon, PageContainer, PostActionContainer, PostActionMeta, PostAuthor, PostCard, PostDetails, PostGrid, PostImage, PostMeta, PostTitle, Sort, StyledImage, StyledRadius, StyledTrendingContainer } from "../FeedPage/Mycomponent";


function MyPage() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // MockAPI에서 좋아요한 목록 가져오기
        const fetchFavorites = async () => {
            try {
                const response = await axios.get("https://674d47b354e1fca9290eeeb5.mockapi.io/festivals");
                setFavorites(response.data);
            } catch (err) {
                setError("좋아요 목록 불러오기 실패");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    // MockAPI에서 좋아요 삭제
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://674d47b354e1fca9290eeeb5.mockapi.io/festivals/${id}`);
            setFavorites((prev) => prev.filter((fav) => fav.id !== id));
            alert("목록에서 삭제되었습니다!");
        } catch (err) {
            console.error("MockAPI 삭제 오류:", err);
        }
    };

    const removeParent = (text) => {
      return text.replace(/\(.*?\)/g, '').trim();
  };

    if (loading) return <p>로딩 중...</p>;
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
                    <BoxLink to="/feed">피드 페이지</BoxLink>
                </ButtonIcon>
              </Sort>

            </FeedHeaderTop>
            
            <PostGrid>
                {favorites.map((favorite) => (
                    <PostCard key={favorite.id}>
                        <h2>{removeParent(favorite.MAIN_TITLE)}</h2>
                        <ButtonIcon onClick={() => handleDelete(favorite.id)}>삭제</ButtonIcon>
                    </PostCard>
                ))
              }

            </PostGrid>


          </FeedHeader>
        </FeedContainer>
      </PageContainer>
        // <div>
        //     <h1>좋아하는 목록</h1>
        //     {favorites.length > 0 ? (
        //         favorites.map((favorite) => (
        //             <div key={favorite.id}>
        //                 <h2>{removeParent(favorite.MAIN_TITLE)}</h2>
        //                 <button onClick={() => handleDelete(favorite.id)}>삭제</button>
        //             </div>
        //         ))
        //     ) : (
        //         <p>좋아하는 목록이 없습니다.</p>
        //     )}
        // </div>
    );
}

// 게시물 카드 컴포넌트
// function PostCard({ favorite, likeCount, likeImage, onClick, id }) {
//   const removeParent = (text) => {
//       return text.replace(/\(.*?\)/g, '').trim();
//   };

//   return (
//       <div>
//           {/* <BoxLink to={`/detail/${post.UC_SEQ}`} element={<DetailPage />}> */}
//               {favorite.MAIN_IMG_THUMB && (<PostImage src={favorite.MAIN_IMG_THUMB} />)}
//               <PostDetails>
//                   <PostTitle>{removeParent(favorite.MAIN_TITLE)}</PostTitle>
//                   <PostMeta>
//                       <div>{favorite.USAGE_DAY_WEEK_AND_TIME || "날짜 정보 없음"}</div>
//                       <PostActionMeta>댓글 없음</PostActionMeta>
//                   </PostMeta>
//               </PostDetails>
//           {/* </BoxLink> */}

//           <PostActionContainer>
//               <StyledRadius width="20px" height="20px" />
//               <PostAuthor>
//                   <span>연락처 </span>
//                   {favorite.CNTCT_TEL || "알 수 없음"}
//               </PostAuthor>
//               <LikeIcon onClick={onClick} style={{ marginLeft: "auto" }}>
//                   <StyledImage src={likeImage} alt="like icon" width="10px" height="10px" /> {likeCount}
//               </LikeIcon>
//           </PostActionContainer>
//       </div>
//   );
// }

export default MyPage;