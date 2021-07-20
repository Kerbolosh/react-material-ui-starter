import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Demo headline", () => {
  render(<App />);
  const linkElements = screen.getAllByText(/Demo/i);
  expect(linkElements.length).toBeGreaterThanOrEqual(1);
  for (const linkElement of linkElements) {
    expect(linkElement).toBeInTheDocument();
  }
});
