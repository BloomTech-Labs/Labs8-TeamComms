import styled from "styled-components";
import { ListBox } from "primereact/listbox";

export const ListItem = styled.p`
  white-space: pre-wrap;
  max-width: 100%;
  border: none;
`;

export const StyledListAttendees = styled(ListBox)`
  &&& {
    width: 100%;
    margin-bottom: 20px;
    border: none;
  }
`;

export const StyledListQuestions = styled(ListBox)`
  &&& {
    white-space: pre-wrap;
    width: 100%;
    border: none;
    overflow-x: hidden;
  }
`;
