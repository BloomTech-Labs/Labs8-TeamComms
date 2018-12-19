import styled from "styled-components";

const PLink = styled.p`
  font-size: 1rem;
  text-decoration: none;
  color: #ffffff;
  cursor: pointer;
  margin: 0 10px 0 10px;
  @media (max-width: 1024px) {
    margin: 0 auto;
    padding: 20px;
  }
  @media (max-width: 800px) {
    margin: 0 auto;
  }
`;

export default PLink;
