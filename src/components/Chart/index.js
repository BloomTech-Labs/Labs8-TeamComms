import React, { Component } from "react";
import styled from "styled-components";
import { Pie } from "react-chartjs-2";

const StyledChartWrapper = styled.div`
  display: flex;
  margin: 10px auto;
  width: 100%;
  justify-content: center;
  align-items: center;
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
        <Pie
          responsive={false}
          data={this.props.data}
          options={{ maintainAspectRatio: false }}
        />
      </StyledChartWrapper>
    );
  }
}

export default StyledChart;
