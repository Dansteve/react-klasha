import React from "react";
// @ts-ignore
import { renderHook, cleanup, act } from "@testing-library/react-hooks";
import { render, fireEvent } from "@testing-library/react";
import { callKlashaClient } from "../klasha-actions";
import useKlashaScript from "../klasha-script";
import KlashaButton from "../klasha-button";
import { config } from "./fixtures";

jest.mock("../klasha-actions");

const componentProps = {
  ...config,
  className: "btn",
  text: "Pay now",
  callBack: () => null,
};

describe("<KlashaButton />", () => {
  beforeEach(() => {
    // @ts-ignore
    callKlashaClient = jest.fn();
    renderHook(() => useKlashaScript());
  });

  afterAll(() => {
    cleanup();
    document.body.innerHTML = "";
  });

  it("render KlashaButton", () => {
    const tree = <KlashaButton {...componentProps} />;
    const { getByText }: Record<string, any> = render(tree);
    // Click button
    fireEvent.click(getByText("Pay me"));
    // @ts-ignore
    expect(callKlashaClient).toHaveBeenCalledTimes(1);
  });
});
