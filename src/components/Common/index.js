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
  grid-column: 1;
  grid-row: 1;
  justify-content: flex-start;
`;
export const DeleteButton = styled.button`
  border: none;
  background-color: white;
  outline: none;
  cursor: pointer;
  color: lightgrey;
  position: relative;
  top: 5px;
  right: 5px;
  font-size: 14px;
  &:hover {
    color: red !important;
  }
`;

export const EditButton = styled.button`
  border: none;
  background-color: white;
  outline: none;
  cursor: pointer;
  color: lightgrey;
  position: relative;
  top: 5px;
  right: 5px;
  font-size: 14px;
  &:hover {
    color: #fabc09 !important;
  }
`;

export const ShareButton = styled.button`
  border: none;
  background-color: white;
  outline: none;
  cursor: pointer;
  color: lightgrey;
  position: relative;
  top: 5px;
  right: 5px;
  font-size: 14px;
  &:hover {
    color: #374353;
  }
`;

export const FavoriteButton = styled.button`
  border: none;
  background-color: white;
  outline: none;
  cursor: pointer;
  color: lightgrey;
  position: relative;
  top: 5px;
  right: 5px;
  font-size: 14px;
  &:hover {
    color: #25bea0 !important;
  }
`;

export const CustomInput = styled.input`
  width: 300px;
  height: 50px;
  font-size: 20px;
  color: #323232;
  text-align: center;
  border-top: none;
  border: 1px solid grey;
`;

export const Overpane = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(0, 0, 0, 0.6);
  padding: 2rem;
  z-index: 1000;
  transition: 250ms cubic-bezier(0.7, 0, 0.3, 1) transform;
  transform: translateY(${props => (props.overpane ? "100%" : "0")});
`;

export const SubmitButton = styled(PrimaryButton)`
  width: 250px;
  height: 50px;
  color: white;
  border-radius: 5px;
  background: #25bea0;
  border: 1px solid grey;
  font-size: 16px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: none;
  margin-left: 10px;
`;
