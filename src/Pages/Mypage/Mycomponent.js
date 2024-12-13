import styled from "styled-components";

export const StyledPostCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  margin: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.02);
  }
`;

export const PostCardHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const PostCardDetails = styled.div`
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
`;

export const PostCardActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const Button = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  background-color: ${(props) => (props.danger ? "#ff4d4f" : "#1890ff")};
  color: #fff;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${(props) => (props.danger ? "#ff7875" : "#40a9ff")};
  }
`;

export const StyledArea = styled.textarea`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  margin-left: 16px;
  background-color: white;
  color: #333;
  &:focus {
    outline: none;
    border-color: #007aff;
  }
`;