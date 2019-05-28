import React from 'react';
import { shallow } from "enzyme";
import App from '../App';


describe("App", () => {
  let wrapper;
  const mockFunc = jest.fn()
  
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should match the snapshot when on the Home page', async () => {
    await wrapper.setState({ displayedPage: 'home' });
    expect(wrapper).toMatchSnapshot();
  });
  it("should have default state", () => {
    expect(wrapper.state()).toEqual({
      randomNum: 1,
      fontLoaded: false,
      currentLatitude: null,
      currentLongitude: null,
      currentWall: {
        latitude: 39.7653,
        longitude: -104.9791,
        title: "Improper City",
        subtitle: "Subtitle"
      },
      displayedPage: "home",
      openers: [
        {
          quote: `Maybe it will work when I'm fully dead inside`,
          author: "Peregrine"
        },
        {
          quote: `React Native is like a friend you think you know, but you don't.`,
          author: "Tommy"
        },
        { quote: `I f****** hate Django`, author: "Scott" }
      ],
      markers: [
        {
          latitude: 39.7653,
          longitude: -104.9791,
          title: "Improper City",
          subtitle: "Subtitle"
        },
        {
          latitude: 39.7653,
          longitude: -104.9793,
          title: "Test 2",
          subtitle: "Subtitle"
        },
        {
          latitude: 39.7653,
          longitude: -104.9796,
          title: "Test 3",
          subtitle: "Subtitle"
        },
        {
          latitude: 39.7653,
          longitude: -104.9799,
          title: "Test 4",
          subtitle: "Subtitle"
        },
        {
          latitude: 39.7653,
          longitude: -104.98,
          title: "Scott likes meatballs",
          subtitle: "Subtitle"
        }
      ]
    });
  });

})