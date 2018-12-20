import styled from "styled-components";

const DeleteButton = styled.button`
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

export default DeleteButton;
