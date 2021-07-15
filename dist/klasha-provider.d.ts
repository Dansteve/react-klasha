/// <reference types="react" />
import { KlashaOptionsProps } from "./types";
interface KlashaProviderProps extends KlashaOptionsProps {
    children: JSX.Element;
    callBack: Function;
}
declare const KlashaProvider: ({ children, callBack, ...others }: KlashaProviderProps) => JSX.Element;
export default KlashaProvider;
