import styled from "styled-components";
import ReactQuill from "react-quill";

const Editor = styled(ReactQuill)`
  width: 500px;
  margin-top: 20px;
  .ql-container {
    height: 253px;
  }
  @media (max-width: 768px) {
    max-width: 400px;
  }
  @media (max-width: 400px) {
    max-width: 330px;
  }
`;

export default Editor;
