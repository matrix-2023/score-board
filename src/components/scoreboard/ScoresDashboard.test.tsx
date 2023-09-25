import { render } from "@testing-library/react";
import ScoresDashboard from "./ScoresDashboard";
import { ThemeProvider } from "styled-components";
import { GlobalColors } from "utils/constants";

describe("ScoresDashboard", () => {
  let renderedComp: any;

  beforeEach(() => {
    // render the component on virtual dom
    renderedComp = render(
      <ThemeProvider theme={{ colors: GlobalColors }}>
        <ScoresDashboard />
      </ThemeProvider>
    );

    // renderedComp.debug();
  });

  it("should have only one children ul element", () => {
    // To have the first child
    expect(renderedComp.container.firstChild).toBeTruthy();
    // To have the first child element of UL only
    expect(renderedComp.container.firstChild.children[0].nodeName).toBe("UL");
    // Should not have the another child element
    expect(renderedComp.container.firstChild.children[1]).toBeUndefined();
    // Should have only 1 ul element
    expect(renderedComp.container.querySelectorAll("ul").length).toBe(1);
  });
});
