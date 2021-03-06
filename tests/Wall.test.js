import React from 'react';
import { shallow } from "enzyme";
import Wall from '../Wall';


describe("Wall", () => {
  let wrapper;
  const mockFunc = jest.fn()
  const mockWall = {
    latitude: 39.7653,
    longitude: -104.9791,
    title: "Improper City",
    subtitle: "Subtitle"
  }
  
  beforeEach(() => {
    wrapper = shallow(<Wall checkProximity={mockFunc} currentWall={mockWall} />);
  });

  it('should match the snapshot when on the Home page', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have default state", () => {
    expect(wrapper.state()).toEqual({
      key: null,
      text: "",
      comments: null
    });
  });

})