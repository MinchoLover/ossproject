import React, { useState, useEffect } from "react";
import axios from "axios";
import { BoxLink, ButtonIcon, FeedContainer, FeedHeader, FeedHeaderTop, PageContainer, PostGrid, Sort, StyledImage, StyledInput } from "../FeedPage/Mycomponent";
import { PostCardActions, PostCardDetails, PostCardHeader, StyledArea, StyledPostCard } from "./Mycomponent";
import { AuthorName } from "../DetailPage/Mycomponent";
import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { myInfoname } from "../../Atom";



function MyPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPost, setEditingPost] = useState(null);

  const [myName] = useRecoilState(myInfoname);
    

    const { id } = useParams();

  useEffect(() => {
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
  }, [id]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://674d47b354e1fca9290eeeb5.mockapi.io/festivals/${id}`);
      setFavorites((prev) => prev.filter((fav) => fav.id !== id));
      alert("목록에서 삭제되었습니다!");
    } catch (err) {
      console.error("MockAPI 삭제 오류:", err);
    }
  };

  const handleSave = async (updatedPost) => {
    try {
      await axios.put(
        `https://674d47b354e1fca9290eeeb5.mockapi.io/festivals/${updatedPost.id}`,
        updatedPost
      );
      setFavorites((prev) =>
        prev.map((fav) => (fav.id === updatedPost.id ? updatedPost : fav))
      );
      alert("수정되었습니다!");
      setEditingPost(null);
    } catch (err) {
      console.error("수정 오류:", err);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
  };

  const removeParent = (text) => {
    return text.replace(/\(.*?\)/g, "").trim();
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  // 새 축제 추가
const handleCreate = async (newPost) => {

  try {
    const response = await axios.post(
      "https://674d47b354e1fca9290eeeb5.mockapi.io/festivals",
      newPost
    );
    setFavorites((prev) => [...prev, response.data]);
    alert("새 축제가 추가되었습니다!");
  } catch (err) {
    console.error("새 축제 추가 오류:", err);
  }
};

  return (
    <PageContainer>
      <FeedContainer>
        <FeedHeader>
          <FeedHeaderTop>
          <StyledImage src="/DetailImage/Group 3.png" alt="velog logo" width="500px" height="120px"/>
          <AuthorName><h2>{myName}님 안녕하세요!</h2></AuthorName>
            <Sort>
              <ButtonIcon>
                <BoxLink to="/feed">메인 페이지</BoxLink>
                
              </ButtonIcon>
            </Sort>
          </FeedHeaderTop>

          <PostGrid>
            
            {editingPost ? (
              <EditForm
                post={editingPost}
                onSave={handleSave}
                onCancel={() => setEditingPost(null)}
              />
            ) : (
              <CreateForm onCreate = {handleCreate}/>
            )}
              {!editingPost &&
              favorites.map((favorite) => (
                <StyledPostCard key={favorite.id}>
                  <PostCardHeader>{removeParent(favorite.MAIN_TITLE)}</PostCardHeader>
                  <PostCardDetails>
                    <p>시간: {favorite.USAGE_DAY_WEEK_AND_TIME || "날짜 정보 없음"}</p>
                    <p>이용 요금: {favorite.USAGE_AMOUNT || "정보 없음"}</p>
                    <p>TEL: {favorite.CNTCT_TEL || "알 수 없음"}</p>
                    <p>교통 정보: {favorite.TRFC_INFO || "정보 없음"}</p>
                    <p>주소: {favorite.ADDR1 || "정보 없음"}</p>
                    <p>부제목: {favorite.SUBTITLE || "정보 없음"}</p>
                  </PostCardDetails>
                  <PostCardActions>
                    <ButtonIcon style={({border:"none",color:"white",backgroundColor:"#1890ff"})}onClick={() => handleEdit(favorite)}>수정</ButtonIcon>
                    <ButtonIcon style={({border:"none", color: "white", backgroundColor:"#ff7875"})}danger onClick={() => handleDelete(favorite.id)}>삭제</ButtonIcon>
                  </PostCardActions>
                </StyledPostCard>
              ))}
          </PostGrid>
        </FeedHeader>
      </FeedContainer>
    </PageContainer>
  );
}




function CreateForm({onCreate}) {
  const[newPost, setNewPost] = useState({
    MAIN_TITLE: "",
    USAGE_DAY_WEEK_AND_TIME: "",
    USAGE_AMOUNT: "",
    CNTCT_TEL: "",
    TRFC_INFO: "",
    ADDR1: "",
    SUBTITLE: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!newPost.MAIN_TITLE || !newPost.ADDR1) {
      alert("필수 항목(제목, 주소)을 입력하세요!");
      return;
    }
    onCreate(newPost); // 부모 컴포넌트로 전달
  };
  return (
    <StyledPostCard>
      <input
        name="MAIN_TITLE"
        value={newPost.MAIN_TITLE}
        onChange={handleChange}
        placeholder="축제 이름 (필수)"
      />
      <input
        name="USAGE_DAY_WEEK_AND_TIME"
        value={newPost.USAGE_DAY_WEEK_AND_TIME}
        onChange={handleChange}
        placeholder="시간"
      />
      <input
        name="USAGE_AMOUNT"
        value={newPost.USAGE_AMOUNT}
        onChange={handleChange}
        placeholder="요금"
      />
      <input
        name="CNTCT_TEL"
        value={newPost.CNTCT_TEL}
        onChange={handleChange}
        placeholder="연락처"
      />
      <input
        name="TRFC_INFO"
        value={newPost.TRFC_INFO}
        onChange={handleChange}
        placeholder="교통 정보"
      />
      <input
        name="ADDR1"
        value={newPost.ADDR1}
        onChange={handleChange}
        placeholder="주소 (필수)"
      />
      <textarea
        name="SUBTITLE"
        value={newPost.SUBTITLE}
        onChange={handleChange}
        placeholder="부제목"
      />
      <PostCardActions>
        <ButtonIcon style={({border:"none",color:"white",backgroundColor:"#1890ff"})} onClick={handleSubmit}>추가</ButtonIcon>
      </PostCardActions>
    </StyledPostCard>
  );

}

// 수정 폼
function EditForm({ post, onSave, onCancel }) {
  const [updatedPost, setUpdatedPost] = useState(post);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPost((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <StyledPostCard style={({width: "500px"})}>
        <p>축제 이름 <StyledInput
        name="MAIN_TITLE"
        value={updatedPost.MAIN_TITLE}
        onChange={handleChange}
        placeholder="축제 이름"
      /></p>
      시간
      <p>
      <StyledInput
        name="USAGE_DAY_WEEK_AND_TIME"
        value={updatedPost.USAGE_DAY_WEEK_AND_TIME}
        onChange={handleChange}
        placeholder="시간"
      />
      </p>
      요금
      <p>
      <StyledInput
        name="USAGE_AMOUNT"
        value={updatedPost.USAGE_AMOUNT}
        onChange={handleChange}
        placeholder="요금"
      />
      </p>
      연락처
      <p>
      <StyledInput
        name="CNTCT_TEL"
        value={updatedPost.CNTCT_TEL}
        onChange={handleChange}
        placeholder="연락처"
      />
      </p>
      교통 정보
      <p>
      <StyledInput
        style={({width: "450px",
          
        })}
        name="TRFC_INFO"
        value={updatedPost.TRFC_INFO}
        onChange={handleChange}
        placeholder="교통 정보"
      />
      </p>
      주소
      <p>
      <StyledInput
      style={({width: "300px",
          
    })}
        name="ADDR1"
        value={updatedPost.ADDR1}
        onChange={handleChange}
        placeholder="주소"
      />
      </p>
       부제목
      <p>
      <StyledArea
        name="SUBTITLE"
        value={updatedPost.SUBTITLE}
        onChange={handleChange}
        placeholder="부제목"
      />
      </p>
      <PostCardActions>
        <ButtonIcon style={({border:"none",color:"white",backgroundColor:"#1890ff"})}  onClick={() => onSave(updatedPost)}>저장</ButtonIcon>
        <ButtonIcon style={({border:"none",color:"white",backgroundColor:"#ff7875"})} danger onClick={onCancel}>취소</ButtonIcon>
      </PostCardActions>
    </StyledPostCard>
  );
}

export default MyPage;