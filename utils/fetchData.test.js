import React from 'react';
import { shallow } from "enzyme";
import App from '../App';
import { fetchData} from "../utils/fetchData";


describe("fetchData", () => {
  const mockURL = "www.reddit.com";
  const mockLocations = ["test"];
  beforeEach(() => {
    window.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: true,
        json: jest.fn(() => mockLocations)
      });
    });
  });

  it("should call fetch with the correct parameters", async () => {
    await fetchData(mockURL);
    expect(window.fetch).toHaveBeenCalledWith(mockURL);
  });

  it("should return data when response is successful", async () => {
    const result = await fetchData(mockURL);
    expect(result).toEqual(mockLocations);
  });

  it("should throw an error when response is not successful", async () => {
    window.fetch = await jest.fn(() => {
      return Promise.resolve({
        ok: false,
        statusText: "Error",
        status: "500"
      });
    });
    const expectedError = Error("Error - Status 500");
    expect(fetchData(mockURL)).rejects.toEqual(expectedError);
  });
})