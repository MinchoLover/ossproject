import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Api = () => {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        const response = await axios.get(
          "https://apis.data.go.kr/6260000/FestivalService/getFestivalKr",
          {
            params: {
              serviceKey: process.env.REACT_APP_API_KEY,
              numOfRows: 10,

              resultType: "json",
            },
          }
        );

        console.log("응답 데이터:", response.data);

        const items = response.data.getFestivalKr?.item || [];
        if (items.length === 0) {
          throw new Error("축제 데이터가 비어 있습니다.");
        }
        setFestivals(items); // 데이터 상태에 저장
      } catch (err) {
        setError(err.message || "데이터를 불러오는 데 실패했습니다.");
        console.error("API 요청 에러:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFestivals();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>부산 축제 정보</h1>
      {festivals.length > 0 ? (
        festivals.map((festival, index) => (
          <div key={index}>
            <h2>{festival.MAIN_TITLE}</h2>
            <p>{festival.ITEMCNTNTS}</p>
            {festival.MAIN_IMG_THUMB && (
              <img
                src={festival.MAIN_IMG_THUMB}
                alt={festival.MAIN_TITLE}
                style={{ width: "200px" }}
              />
            )}
          </div>
        ))
      ) : (
        <p>축제 정보를 찾을 수 없습니다.</p>
      )}
    </div>
  );
};

export default Api;