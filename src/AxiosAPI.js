import React, { useState, useEffect } from "react";
import axios from "axios";

const AxiosAPI = () => {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFestivals = async () => {
      const API_KEY = process.env.REACT_APP_API_KEY; // .env에서 URL 인코딩된 API 키 가져오기
      const BASE_URL = "http://apis.data.go.kr/6260000/FestivalService/getFestivalKr";
      const params = {
        serviceKey: API_KEY, // 서비스 키 그대로 사용
        numOfRows: 10, // 한 번에 가져올 데이터 수
        pageNo: 1, // 첫 번째 페이지
        resultType: "application/json", // 응답 형식
      };

      try {
        const response = await axios.get(BASE_URL, { params });

        console.log("응답 데이터:", response.data);

        const items = response.data.response?.body?.items?.item || [];
        console.log("아이템 데이터:", items);
 
        if (items.length > 0) {
          setFestivals(items); // 데이터를 상태에 업데이트
        } else {
          throw new Error("응답 데이터가 예상과 다릅니다.");
        }
      } catch (err) {
        setError("데이터를 불러오는 데 실패했습니다.");
        console.error("API 요청 에러:", err.message);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchFestivals(); // 함수 호출
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>부산 축제 정보</h1>
      <ul>
        {festivals.map((festival, index) => (
          <li key={index}>
            <h2>{festival.MAIN_TITLE}</h2>
            <p>{festival.ITEMCNTNTS}</p>
            {/* <img
              src={festival.MAIN_IMG_THUMB}
              alt={festival.MAIN_TITLE}
              style={{ width: "200px" }}
            /> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AxiosAPI;