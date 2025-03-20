import { render, screen } from "@testing-library/react";
import { LoggedInNav } from "@/components/logged-in-nav";

describe("NotLoggedInNav", () => {
  it("should render the Login Button", async () => {
    render(<LoggedInNav name="Abdallah" email="abdallah@test.com" />);
    const LoginButton = await screen.findByText("Ab");
    expect(LoginButton).toBeDefined();
  });

  it("should match snapshot", async () => {
    const { container } = render(
      <LoggedInNav name="Abdallah" email="abdallah@test.com" />
    );
    expect(container).toMatchSnapshot();
  });
});
