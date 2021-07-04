// @ts-ignore
import { renderHook, cleanup, act } from "@testing-library/react-hooks";
import { render, fireEvent } from "@testing-library/react";
import React from "react";
import useKlashaPayment from "../use-klasha";
import { callKlashaClient } from "../klasha-actions";
import useKlashaScript from "../klasha-script";
import { config } from "./fixtures";

jest.mock("../klasha-actions");

describe("useKlashaPayment()", () => {
  beforeEach(() => {
    // @ts-ignore
    callKlashaClient = jest.fn();
    renderHook(() => useKlashaScript());
  });

  afterAll(() => {
    cleanup();
    document.body.innerHTML = "";
  });

  it("should use useKlashaPayment", () => {
    const { result, rerender } = renderHook(() => useKlashaPayment(config));
    rerender();

    const callBack = jest.fn();
    act(() => {
      result.current(callBack);
    });

    expect(callBack).toHaveBeenCalledTimes(0);
    expect(callKlashaClient).toHaveBeenCalledTimes(1);
  });

  it("should pass if initializePayment does not accept any args", () => {
    const { result, rerender } = renderHook(() => useKlashaPayment(config));
    rerender();

    act(() => {
      result.current();
    });

    expect(callKlashaClient).toHaveBeenCalledTimes(1);
  });

  it("should useKlashaPayment accept all parameters", () => {
    const { result, rerender } = renderHook(() =>
      useKlashaPayment({
        ...config,
        metadata: JSON.stringify({
          custom_field: [
            {
              display_name: "Mobile Number",
              variable_name: "mobile_number",
              value: "+2348143109254",
            },
          ],
        }),
      })
    );
    rerender();
    act(() => {
      result.current();
    });

    expect(callKlashaClient).toHaveBeenCalledTimes(1);
  });

  it("should be accept trigger from other component", () => {
    const { result, rerender } = renderHook(() => useKlashaPayment(config));
    rerender();
    const Btn = (): any => (
      <div>
        <button onClick={(): any => result.current()}>Donation</button>{" "}
      </div>
    );

    const { getByText }: Record<string, any> = render(<Btn />);
    // Click button
    fireEvent.click(getByText("Donation"));
    // @ts-ignore
    expect(callKlashaClient).toHaveBeenCalledTimes(1);
  });

  it("should accept being rendered in a container", () => {
    const wrapper: React.FC = ({ children }: Record<string, any>) => {
      return <div>{children}</div>;
    };

    const { result, rerender } = renderHook(() => useKlashaPayment(config), {
      wrapper,
    });

    rerender();
    act(() => {
      result.current();
    });

    // @ts-ignore
    expect(callKlashaClient).toHaveBeenCalledTimes(1);
  });
});
