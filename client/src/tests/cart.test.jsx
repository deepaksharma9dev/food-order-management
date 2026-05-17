import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import {
  describe,
  expect,
  test,
  beforeEach,
} from "vitest";

import { CartProvider } from "../context/CartContext";
import FoodCard from "../components/FoodCard";
import CartPage from "../pages/CartPage";

const mockItem = {
  id: "item-1",
  name: "Test Pizza",
  description: "Cheesy test pizza",
  price: 299,
  image: "https://example.com/pizza.jpg",
};

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

describe("Cart functionality", () => {
  test("adds item to cart", async () => {
    const user = userEvent.setup();

    const { unmount } = renderWithProviders(
      <FoodCard item={mockItem} />
    );

    await user.click(
      screen.getByRole("button", {
        name: /add to cart/i,
      })
    );

    unmount();

    renderWithProviders(<CartPage />);

    expect(
      screen.getByRole("heading", {
        name: /test pizza/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getAllByText("₹299").length
    ).toBeGreaterThan(0);
  });

  test("shows empty cart message", () => {
    renderWithProviders(<CartPage />);

    expect(
      screen.getByText(/your cart is empty/i)
    ).toBeInTheDocument();
  });
});