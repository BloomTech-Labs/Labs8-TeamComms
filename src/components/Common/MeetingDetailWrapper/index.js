import styled from "styled-components";

const MeetingDetailWrapper = styled.div`
  table {
    @media (min-width: 768px) {
      width: 100%;
      margin: 0 auto;
    }
    border-spacing: 1;
    border-collapse: collapse;
    background: white;
    overflow: hidden;
    border-bottom: 1px solid lightgrey;
    margin: 0 auto;
    position: relative;
    margin-bottom: 1%;

    margin-top: 3%;
    letter-spacing: 0.1em;
  }
  table td {
    padding: 10px;
  }
  table h1 {
    color: #ffffff;
    font-size: 20px;
    background: #25bea0;
    line-height: 1.5;
    margin-bottom: 3px;
    font-family: Sans-Serif;
  }
  table * {
    position: relative;
  }
  table td,
  table th {
    padding-left: 8px;
    width: 33%;
  }
  table thead tr {
    background: #f4f4f4;
    color: #374353;
    font-size: 14px;
    line-height: 2;
    border-bottom: 1px solid lightgrey;
  }
  table tbody tr {
    border-bottom: 1px solid #e3f1d5;
    height: 50px;
    text-align: center;
    /* background: #25bea0; */
  }
  table tbody tr:last-child {
    border: 0;
  }
  table td,
  table th {
    text-align: left;
  }
  table td.l,
  table th.l {
    text-align: right;
  }
  table td.c,
  table th.c {
    text-align: center;
  }
  table td.r,
  table th.r {
    text-align: center;
  }

  @media screen and (max-width: 35.5em) {
    table {
      display: block;
    }
    table > *,
    table tr,
    table td,
    table th {
      display: block;
      width: auto;
    }
    table thead {
      display: none;
    }
    table tbody tr {
      height: auto;
      padding: 8px 0;
    }
    table tbody tr td {
      padding-left: 45%;
      margin-bottom: 12px;
    }
    table tbody tr td:last-child {
      margin-bottom: 0;
    }
    table tbody tr td:before {
      position: absolute;
      font-weight: 700;
      width: 40%;
      left: 10px;
      top: 0;
    }
    table tbody tr td:nth-child(1):before {
      content: "Title";
    }
    table tbody tr td:nth-child(2):before {
      content: "Start Time";
    }
    table tbody tr td:nth-child(3):before {
      content: "Zoom Link";
    }
  }
`;

export default MeetingDetailWrapper;
