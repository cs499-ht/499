import {shallow} from 'enzyme'
import Habit from "./Habit";

describe("Habit component testing", () => {
  const habit = {
    username: "user1",
    description: "habit1",
    dailyCompleted: false,
  };
  const wrapper = shallow(<Habit habit={habit} />);
  //console.log(wrapper.debug());

  test("Renders habit username", () => {
    expect(wrapper.find("h2").text()).toContain("user1");
  });

  test("Renders habit description", () => {
    expect(wrapper.find("h3").text()).toContain("habit1");
  });
});
