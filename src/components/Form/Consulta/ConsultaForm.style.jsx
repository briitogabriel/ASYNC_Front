import styled from "styled-components";

export const Form = styled.form`
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 10px 2px rgba(82, 129, 220, 0.25);
  width: 100%;
  box-sizing: border-box;
  padding: 1rem 3rem 2rem 3rem;
  padding-bottom: 2rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const Titles = styled.h3`
  color: #25232f;
  font-weight: 700;
  font-size: 1.3rem;
`;
export const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

export const Button = styled.button`
  padding: 8px 16px;
  border-radius: 5px;
  border: none;
  background-color: ${({ $color }) => {
    return $color === "red" ? "#BE2E2E" : "#159976";
  }};
  width: 5rem;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  cursor: pointer;

  color: #fff;
  font-size: 1rem;
  font-weight: 400;

  opacity: ${({ $active }) => {
    return $active ? 1 : 0.5;
  }};

  &:disabled {
    cursor: not-allowed;
  }
`;
