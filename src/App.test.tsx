import { render, screen } from "@testing-library/react";
import App from "App";

test("renders heading label", async () => {
  render(<App />);
  const headingLabel = screen.getByText(/Scores Leaderboard/i);
  expect(headingLabel).toBeTruthy();
});
