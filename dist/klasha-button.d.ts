import { ReactNode } from "react";
import { KlashaOptionsProps } from "./types";
interface KlashaButtonProps extends KlashaOptionsProps {
    text?: string;
    className?: string;
    children?: ReactNode;
    callBack?: Function;
}
declare const KlashaButton: ({ text, className, children, callBack, ...others }: KlashaButtonProps) => JSX.Element;
export default KlashaButton;
