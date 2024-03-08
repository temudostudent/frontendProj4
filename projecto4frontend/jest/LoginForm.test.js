import React  from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"
import LoginForm from '../src/Components/Forms/LoginForm'


describe("LoginForm", () => {
  test("renders correctly", () => {
    const { getByLabelText, getByText } = render(<LoginForm />);

    // Check that the form contains the expected input fields and labels
    expect(getByLabelText("Username")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
    expect(getByText("Login")).toBeInTheDocument();

    // Check that the form is initially disabled
    expect(getByText("Login")).toBeDisabled();

    // Simulate a user entering values into the input fields
    fireEvent.change(getByLabelText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "testpassword" },
    });

    // Check that the form is now enabled
    expect(getByText("Login")).toBeEnabled();

    // Simulate a user clicking the Login button
    fireEvent.click(getByText("Login"));

    // Add any assertions here to verify the behavior of the form after it is submitted
  });
});