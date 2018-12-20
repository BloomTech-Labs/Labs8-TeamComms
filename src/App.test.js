import React from "react";
import { shallow, configure } from "enzyme";
import Provider from "react-redux";
import { Route } from "react-router-dom";
import Header from "./components/Header";
import App from "./App";
import Adapter from "enzyme-adapter-react-16";
import { store } from "./index.js";
import { MainLogo } from "./components/Common/Logo";
import ScreensLanding from "./screens/Landing";
import "jest-dom/extend-expect";
import "react-testing-library/cleanup-after-each";
import { Router } from "react-router";
import { render, fireEvent, cleanup } from "react-testing-library";
import { createMemoryHistory } from "history";
import { createStore } from "redux";
import reducer from "./reducers";

configure({ adapter: new Adapter() });

function renderWithRouter(
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history
  };
}

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
    expect(renderedComponent.find(MainLogo)).toHaveLength(1);
  });
});

function renderWithRedux(
  ui,
  { initialState, store = createStore(reducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  };
}

// test("can render with redux with defaults", () => {
//   const { getByTestId, getByText, unmount, container } = renderWithRedux(
//     <App />
//   );
//   fireEvent.click(getByText("LOGIN"));
//   expect(getByText("Log In")).toHaveTextContent("1");
// });
