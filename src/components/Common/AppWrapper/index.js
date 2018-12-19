import styled from "styled-components";

const AppWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: hidden;
  background: #374353;
  background-position: fixed;
  color: #374353;
  display: grid;
  grid-template-columns: 15rem auto;
  grid-template-rows: 6rem 25rem 5rem;
  @media (min-width: 1100px) {
    max-width: 1100px;
    margin: 0 auto;
    border: 1px solid lightgrey;
  }
`;

export default AppWrapper;
