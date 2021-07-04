import React from "react";
// @ts-ignore
import { renderHook, cleanup, act } from "@testing-library/react-hooks";
import { render, fireEvent } from "@testing-library/react";
import { callKlashaClient } from "../klasha-actions";
import useKlashaScript from "../klasha-script";
import KlashaConsumer from "../klasha-consumer";
import { config } from "./fixtures";

jest.mock("../klasha-actions");

const componentProps = {
  ...config,
  text: "Pay now",
  callBack: () => null,
};

describe("<KlashaProvider />", () => {
  beforeEach(() => {
    // @ts-ignore
    callKlashaClient = jest.fn();
    renderHook(() => useKlashaScript());
  });

  afterAll(() => {
    cleanup();
    document.body.innerHTML = "";
  });

  it("render KlashaProvider", () => {
    const tree = (
      <KlashaConsumer {...componentProps}>
        {({ initializePayment }: Record<string, any>) => (
          <button onClick={() => initializePayment()}>
            Use render props 2000
          </button>
        )}
      </KlashaConsumer>
    );
    const { getByText }: Record<string, any> = render(tree);
    // Click button
    fireEvent.click(getByText("Use render props 2000"));
    // @ts-ignore
    expect(callKlashaClient).toHaveBeenCalledTimes(1);
  });
});
