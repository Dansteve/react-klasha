import React, { ReactNode } from "react";
import useKlashaPayment from "./use-klasha";
import { KlashaOptionsProps } from "./types";

interface KlashaButtonProps extends KlashaOptionsProps {
  text?: string;
  className?: string;
  children?: ReactNode;
  callBack?: Function;
}

const KlashaButton = ({
  text,
  className,
  children,
  callBack,
  ...others
}: KlashaButtonProps): JSX.Element => {
  const initializePayment = useKlashaPayment(others);
  return (
    <button
      className={className}
      onClick={(): void => initializePayment(callBack)}
    >
      {text || children}
    </button>
  );
};

export default KlashaButton;
