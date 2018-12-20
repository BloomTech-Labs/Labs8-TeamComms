import { ScrollPanel } from "primereact/scrollpanel";
import styled from "styled-components";

export const AttendeeScroll = styled(ScrollPanel)`
display: flex;
 justify-content: center;
 align-items: center;
 flex-direction: column;
  @media (min-width: 768px) {
    margin: 0 20px;
    margin-right: 0;
    }
  }

`;
