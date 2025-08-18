import { render, fireEvent } from "@testing-library/react";
import AgendaItem from "./AgendaItem";

describe("AgendaItem", () => {
  it("should render the date and hour correctly", () => {
    const mockDate = new Date("2025-08-03T00:00:00");
    const mockSchedules = ["08:00", "10:00"];
    const mockOnHourClick = jest.fn();

    const { getByTestId, getByText } = render(
      <AgendaItem
        date={mockDate}
        schedules={mockSchedules}
        onHourClick={mockOnHourClick}
      />
    );

    expect(getByTestId("agenda-item")).toBeInTheDocument();
    expect(getByText(mockDate.toString())).toBeInTheDocument();
    mockSchedules.forEach((hour) => {
      expect(getByText(hour)).toBeInTheDocument();
    });

    fireEvent.click(getByText("08:00"));
    expect(mockOnHourClick).toHaveBeenCalledWith("08:00");
  });
});
