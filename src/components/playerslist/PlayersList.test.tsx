import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { GlobalColors } from "utils/constants";
import PlayersList from "./PlayersList";
import streamersData from "assets/data/streamers.json";

describe("PlayersList", () => {
  let renderedComp: any;

  beforeEach(() => {
    // render the component on virtual dom
    renderedComp = render(
      <ThemeProvider theme={{ colors: GlobalColors }}>
        <PlayersList data={streamersData} />
      </ThemeProvider>
    );
  });

  it("should render number of li element as length of data", () => {
    expect(renderedComp.container.querySelectorAll("li").length).toEqual(
      streamersData?.length
    );
  });

  it("should render number of img element as length of data", () => {
    expect(renderedComp.container.querySelectorAll("img").length).toEqual(
      streamersData?.length
    );
  });
});
