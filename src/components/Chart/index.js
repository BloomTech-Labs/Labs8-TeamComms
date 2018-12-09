import React, { Component } from "react";
import styled from "styled-components";
import { Pie } from "react-chartjs-2";

const StyledChartWrapper = styled.div`
  margin-bottom: 10px;
  width: 100%;
`;

class StyledChart extends React.PureComponent {
  // componentShouldUpdate(nextProps, nextState) {
  //   if (nextProps.data !== this.props.data) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  render() {
    return (
      <StyledChartWrapper>
        <Pie data={this.props.data} />
      </StyledChartWrapper>
    );
  }
}

export default StyledChart;
