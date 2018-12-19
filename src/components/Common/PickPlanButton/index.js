import styled from "styled-components";
import PrimaryButton from "../PrimaryButton";
const PickPlanButton = styled(PrimaryButton)`
  background: #facc43;
  width: 300px;
  cursor: pointer;
  z-index: 1000;
  font-size: 20px;
  font-weight: bold;
  color: #374353;
  :hover {
    color: #25bea0;
  }
`;

export default PickPlanButton;
