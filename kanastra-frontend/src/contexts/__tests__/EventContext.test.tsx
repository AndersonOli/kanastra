import React, { useEffect } from "react";
import { render, act } from "@testing-library/react";
import { useEvent, EventProvider } from "../EventContext";

describe("EventProvider", () => {
  it("should allow components to emit and listen to events", () => {
    const TestComponent: React.FC = () => {
      const { emitEvent, addEventListener } = useEvent();

      useEffect(() => {
        const unsubscribe = addEventListener("test-event", (data: string) => {
          console.log(data);
        });

        return unsubscribe;
      }, [addEventListener]);

      return (
        <button onClick={() => emitEvent("test-event", "Hello, World!")}>
          Emit Event
        </button>
      );
    };

    const { getByText } = render(
      <EventProvider>
        <TestComponent />
      </EventProvider>
    );

    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    act(() => {
      getByText("Emit Event").click();
    });

    expect(consoleSpy).toHaveBeenCalledWith("Hello, World!");

    consoleSpy.mockRestore();
  });
});
