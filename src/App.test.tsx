import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("it renders app", () => {
  render(<App />);
  const linkElement = screen.getByText(/The Movie Database/i);
  expect(linkElement).toBeInTheDocument();
});
