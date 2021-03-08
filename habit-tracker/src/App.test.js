import { mount, shallow } from "enzyme";
import App from "./App";

describe("App testing", () => {
  test("Renders correctly", () => {
    mount(<App />);
  });
});
