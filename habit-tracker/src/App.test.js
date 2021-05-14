import React from 'react'
import {mount} from 'enzyme'
import App from "./App";

describe("App testing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
  });

  test("Renders correctly", () => {
    wrapper;
  });

  test("Add habit form component renders", () => {
    const button = wrapper.find("button");
    button.simulate("click");
    // console.log(wrapper.debug());
    expect(wrapper.find("form.add-habit-form")).toHaveLength(1);
  });
});
