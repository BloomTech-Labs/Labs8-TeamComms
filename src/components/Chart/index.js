import React, { PureComponent } from "react";
import styled from "styled-components";
import { Pie } from "react-chartjs-2";

const StyledChartWrapper = styled.div`
  display: flex;
  margin: 20px auto;
  width: 100%;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgrey;
`;

class StyledChart extends PureComponent {
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
