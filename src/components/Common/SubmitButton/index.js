import styled from "styled-components";
import PrimaryButton from "../PrimaryButton";

export const SubmitButton = styled(PrimaryButton)`
  width: 150px;
  height: 30px;
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

export const FinalizeButton = styled(SubmitButton)`
  margin: 20px 0 20px 0;
`;
