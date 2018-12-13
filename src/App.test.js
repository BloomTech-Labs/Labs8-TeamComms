import React from "react";
import { shallow, configure } from "enzyme";
import Provider from "react-redux";
import { Route } from "react-router-dom";
import Header from "./components/Header";
import App from "./App";
import Adapter from "enzyme-adapter-react-16";
import { store } from "./index.js";
import { FadedLogo } from "./App";

configure({ adapter: new Adapter() });

describe("<App />", () => {
  it("should render the header", () => {
    const renderedComponent = shallow(<App store={store} />).dive();
    expect(renderedComponent.find(Header)).toHaveLength(1);
  });

  it("should render some routes", () => {
    const renderedComponent = shallow(<App store={store} />).dive();
    expect(renderedComponent.find(Route)).not.toHaveLength(0);
  });

  it("should render the logo", () => {
    const renderedComponent = shallow(<App store={store} />).dive();
    expect(renderedComponent.find(FadedLogo)).toHaveLength(1);
  });
});
