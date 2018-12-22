import styled from "styled-components";

export const DeleteButton = styled.button`
  border: none;
  background-color: white;
  outline: none;
  cursor: pointer;
  color: lightgrey;
  position: relative;

  font-size: 14px;
  &:hover {
    color: red !important;
  }
`;

export const BurgerButton = styled.div`
  border: none;
  position: absolute;
  top: 20px;
  right: 10px;
  z-index: 1100;
  outline: none;
  cursor: pointer;
  background-color: none;
  color: #ffffff;
  display: inline-block;
  width: 40px;
  height: 40px;
  font-size: 35px;
  margin-right: 20px;
  &:hover {
    color: #facc43 !important;
  }
  &&:first-child {
    font-size: 35px;
  }
`;

export const EditButton = styled.button`
  border: none;
  background-color: white;
  outline: none;
  cursor: pointer;
  color: lightgrey;
  position: relative;
  padding: 0;
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

export const CloseButton = styled.button`
  border: none;
  background-color: white;
  outline: none;
  cursor: pointer;
  width: 10px;
  color: lightgrey;
  position: relative;
  top: -15px;
  right: -310px;
  font-size: 20px;
  &:hover {
    color: #25bea0 !important;
  }
  @media (max-width: 400px) {
    position: absolute;
    right: 20px;
    top: 10px;
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
  z-index: 1100;
  transition: 250ms cubic-bezier(0.7, 0, 0.3, 1) transform;
  transform: translateY(${props => (props.overpane ? "100%" : "0")});
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 10000;
`;

export const Ul = styled.ul`
  margin-left: 2rem;
`;
export const Li = styled.li`
  font: sans-serif;

  margin: 1rem;
  padding: 1%;

  :hover {
    // background-color: #25bea0;
    p {
      opacity: 1;
    }
  }
  :last-child {
    border: none;
  }
`;

export const Group = styled.fieldset`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45%;
  border: 2px groove white;
  border-radius: 5px;
  padding: 0 10px 20px 10px;
  margin: 10px 15px;
  legend {
    padding: 8px;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    width: 90%;
  }
`;
