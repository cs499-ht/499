import { mount, shallow } from "enzyme";
import App from "./App";

describe("App testing", () => {
  test("Renders correctly", () => {
    mount(<App />);
  });

  let wrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
  });
  test("Add habit form renders", () => {
    const button = wrapper.find("button");
    button.simulate("click");
    // console.log(wrapper.debug());
    expect(wrapper.find("form.add-habit-form")).toHaveLength(1);
  });
});
