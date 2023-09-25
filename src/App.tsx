// React library
import React from "react";

// Styled-component library for designing components and utilize it's components
import styled, { ThemeProvider } from "styled-components";

// Constant variables
import { GlobalColors, DeviceWidth } from "utils/constants";

// Custom component
import ScoresDashboard from "./components/scoreboard/ScoresDashboard";

// Global css styling for body tag
import "./styles.css";

// -------------------- Custom Style using styled-component --------------------
const Heading = styled.h1`
  color: ${(props) => props.theme.colors.white};
  text-align: center;
  margin: 5px 0 30px 0;
  font-family: circular, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;

  @media only screen and ${DeviceWidth.m} {
    font-size: 14px;
    margin: 0 0 15px 0;
  }
`;
// -------------------- Custom Style using styled-component --------------------

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={{ colors: GlobalColors }}>
      <Heading>Leader board</Heading>
      <ScoresDashboard />
    </ThemeProvider>
  );
};

export default App;
