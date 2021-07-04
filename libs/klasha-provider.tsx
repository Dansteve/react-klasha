import React from "react";
import KlashaContext from "./klasha-context";
import useKlashaPayment from "./use-klasha";
import { KlashaOptionsProps } from "./types";

interface KlashaProviderProps extends KlashaOptionsProps {
  children: JSX.Element;
  callBack: Function;
}

const KlashaProvider = ({
  children,
  callBack,
  ...others
}: KlashaProviderProps): JSX.Element => {
  const initializePayment = useKlashaPayment(others);
  return (
    <KlashaContext.Provider value={{ initializePayment, callBack }}>
      {children}
    </KlashaContext.Provider>
  );
};

export default KlashaProvider;
