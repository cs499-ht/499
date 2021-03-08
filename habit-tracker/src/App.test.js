import { configure, mount, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import App from "./App";

configure({ adapter: new Adapter() });

describe("App testing", () => {
  test("Renders correctly", () => {
    mount(<App />);
  });
});
