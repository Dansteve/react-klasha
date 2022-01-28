import React from "react";
import { KlashaOptionsProps } from "./types";
interface KlashaConsumerProps extends KlashaOptionsProps {
    children: Function;
    callBack?: Function;
}
declare const KlashaConsumer: React.ForwardRefExoticComponent<KlashaConsumerProps & React.RefAttributes<KlashaOptionsProps>>;
export default KlashaConsumer;
