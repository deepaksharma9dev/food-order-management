import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {
  describe,
  expect,
  test,
  beforeEach,
  vi,
} from "vitest";

import { CartProvider } from "../context/CartContext";
import CheckoutPage from "../pages/CheckoutPage";

vi.mock("../services/api", () => ({
  default: {
    post: vi.fn(),
  },
}));

const renderWithProviders = (ui) => {
  return render(
    <MemoryRouter>
      <CartProvider>{ui}</CartProvider>
    </MemoryRouter>
  );
};

beforeEach(() => {
  localStorage.clear();
});

describe("Checkout page", () => {
  test("shows empty cart message when cart has no items", () => {
    renderWithProviders(<CheckoutPage />);

    expect(
      screen.getByText(/your cart is empty/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/add food items before checkout/i)
    ).toBeInTheDocument();
  });

  test("does not show place order form for empty cart", () => {
    renderWithProviders(<CheckoutPage />);

    expect(
      screen.queryByRole("button", {
        name: /place order/i,
      })
    ).not.toBeInTheDocument();
  });
});