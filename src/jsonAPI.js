import axios from "axios";

const fetchOpenAPIData = async () => {
    try {
        const response = await axios.get("https://apis.data.go.kr/6260000/FestivalService/getFestivalKr", {
            params: {
                serviceKey: process.env.REACT_APP_API_KEY, // API Key
                numOfRows: 100,
                pageNo: 1,
                resultType: "json",
            },
        });

        const data = response.data.getFestivalKr?.item || [];
        console.log("OpenAPI 데이터:", data);

        return data;
    } catch (error) {
        console.error("OpenAPI 데이터 불러오기 실패:", error);
        return [];
    }  
};

const sendToMockAPI = async (festival) => {
    try {
        const response = await axios.post("https://674d47b354e1fca9290eeeb5.mockapi.io/fesivals", festival);
        console.log("MockAPI에 데이터 전송 성공:", response.data);
    } catch (error) {
        console.error("MockAPI에 데이터 전송 실패:", error);
    }
};

const fetchAndSendData = async () => {
    const openAPIData = await fetchOpenAPIData();

    const transformedData = openAPIData.map((item) => ({
        title: item.MAIN_TITLE,          // OpenAPI의 필드를 MockAPI 필드에 맞게 매핑
        description: item.ITEMCNTNTS,
        date: item.USAGE_DAY_WEEK_AND_TIME || "날짜 정보 없음",
        location: item.GUGUN_NM || "위치 정보 없음",
    }));

    // 데이터를 MockAPI로 전송
    for (const festival of transformedData) {
        await sendToMockAPI(festival);
    }

    console.log("MockAPI로 데이터 전송 완료!");
};

fetchAndSendData();

