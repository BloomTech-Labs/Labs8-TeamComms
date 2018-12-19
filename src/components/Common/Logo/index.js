import styled from "styled-components";

export const Logo = styled.img`
  order: 0;
  display: block;
  background: transparent;
  grid-column: 1;
  grid-row: 1;
  justify-content: flex-start;
`;

export const LoginLogo = styled(Logo)`
  margin-top: 20px;
`;

export const MainLogo = styled(Logo)`
  margin-left: 35px;
  margin-top: 10px;
`;
