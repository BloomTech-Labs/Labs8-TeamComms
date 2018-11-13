import styled from "styled-components";

export const PrimaryButton = styled.button`
  border: none;
  background: transparent;
  color: #25bea0;
  padding: 0.5rem 1rem 0.5rem 1rem;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  cursor: pointer;
  outline: none;
  border-radius: 5px;

  :active {
    background: #25bea0;
    color: #ffffff;
  }

  :hover {
    color: #ffffff;
  }
`;

export const Logo = styled.img`
  order: 0;
  display: block;
  background: transparent;
  padding: 1rem;
  grid-column: 1;
  grid-row: 1;
  justify-content: flex-start;
`;

export const CustomInput = styled.input`
  width: 300px;
  height: 50px;
  font-size: 20px;
  color: #323232;
  text-align: center;
  border-top: none;
  border-bottom: 1px solid grey;
`;
