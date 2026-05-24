import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

jest.mock("react-cinemagraph", () => ({
  Cinemagraph: () => <div data-testid="mock-cinemagraph">Mock Cinemagraph</div>
}));

it("renders the v3 playground without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<App />, div);

  expect(div.textContent).toContain("react-cinemagraph");

  ReactDOM.unmountComponentAtNode(div);
});
