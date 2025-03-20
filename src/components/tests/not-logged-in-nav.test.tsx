import { render, screen } from "@testing-library/react";
import { NotLoggedInNav } from "@/components/not-logged-in-nav";

describe("NotLoggedInNav", () => {
  it("should render the Login Button", async () => {
    render(<NotLoggedInNav />);
    const LoginButton = await screen.findByText("Login");
    expect(LoginButton).toBeDefined();
  });

  it("should match snapshot", async () => {
    const { container } = render(<NotLoggedInNav />);
    expect(container).toMatchSnapshot();
  });
});
