import React from "react";
import { shallow } from "enzyme";
import CreateWall from "../CreateWall";

describe("CreateWall", () => {
  let wrapper;
  const mockFunc = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<CreateWall />);
  });

  it("should match the snapshot when on the Home page", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have default state", () => {
    expect(wrapper.state()).toEqual({
      text: "",
      comments: []
    });
  });
});
