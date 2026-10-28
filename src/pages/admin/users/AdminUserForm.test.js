import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { createAdminUser, updateAdminUser } from "../../../api/admin.user.api";
import AdminUserForm from "./AdminUserForm";

jest.mock("../../../api/admin.user.api", () => ({
  createAdminUser: jest.fn(),
  updateAdminUser: jest.fn(),
}));

const user = {
  id: 23,
  name: "Ana Pérez",
  email: "ana@example.com",
  semester: 1,
  university: 1,
  role: "pro student",
  dueDate: "2026-10-28T00:00:00.000Z",
};

const showForm = (props = {}) =>
  render(<AdminUserForm {...user} {...props} />, { wrapper: MemoryRouter });

beforeEach(() => jest.clearAllMocks());

test.each(["2027-08-01", "2027-08-01T00:00:00.000Z"])(
  "shows %s as day/month/year when reopening a user",
  (dueDate) => {
    const { container } = showForm({ dueDate });
    expect(container.querySelector('[name="user-due-date"]')).toHaveValue("01/08/2027");
  }
);

test("saves 01/08/2027 as August 1 and preserves it when reopening", async () => {
  const form = showForm();
  fireEvent.change(screen.getByLabelText(/Fecha de vencimiento/), {
    target: { value: "01/08/2027" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Modificar" }));

  await waitFor(() => expect(updateAdminUser).toHaveBeenCalledWith(23, {
    name: "Ana Pérez",
    email: "ana@example.com",
    type: "pro student",
    studentTypeId: 1,
    universityId: 1,
    dueDate: "2027-08-01",
  }));
  form.unmount();
  showForm({ dueDate: "2027-08-01T00:00:00.000Z" });
  expect(screen.getByLabelText(/Fecha de vencimiento/)).toHaveValue("01/08/2027");
});

test.each(["31/02/2027", "08/31/2027", "", "29/02/2027"])(
  "rejects invalid premium expiration %s without saving",
  (value) => {
    const { container } = showForm();
    fireEvent.change(screen.getByLabelText(/Fecha de vencimiento/), { target: { value } });
    fireEvent.submit(container.querySelector("form"));
    expect(updateAdminUser).not.toHaveBeenCalled();
    expect(screen.getByText(/fecha válida.*dd\/MM\/yyyy/i)).toBeInTheDocument();
  }
);

test("creates a user with a leap-day expiration in ISO format", async () => {
  showForm({ id: undefined, dueDate: "" });
  fireEvent.change(screen.getByLabelText(/Fecha de vencimiento/), {
    target: { value: "29/02/2028" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Crear" }));
  await waitFor(() => expect(createAdminUser).toHaveBeenCalledWith(
    expect.objectContaining({ dueDate: "2028-02-29" })
  ));
});
