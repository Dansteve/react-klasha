import React, { forwardRef, useContext, FunctionComponentElement } from "react";
import KlashaProvider from "./klasha-provider";
import { KlashaOptionsProps } from "./types";
import KlashaContext from "./klasha-context";

interface KlashaConsumerProps extends KlashaOptionsProps {
  children: Function;
  callBack?: Function;
}

const KlashaConsumerChild = ({
  children,
  ref,
}: {
  children: Function;
  ref: any;
}): FunctionComponentElement<any> => {
  const { initializePayment, callBack } = useContext(KlashaContext);
  const completeInitializePayment = (): void => initializePayment(callBack);
  return children({ initializePayment: completeInitializePayment, ref });
};

const KlashaConsumer = forwardRef(
  (
    { children, callBack: paraSuccess, ...others }: KlashaConsumerProps,
    ref: any
  ): JSX.Element => {
    const callBack = paraSuccess ? paraSuccess : (): any => null;
    return (
      <KlashaProvider {...others} callBack={callBack}>
        <KlashaConsumerChild ref={ref}>{children}</KlashaConsumerChild>
      </KlashaProvider>
    );
  }
);

export default KlashaConsumer;
