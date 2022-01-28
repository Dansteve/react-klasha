/// <tx_ref types="react" />
declare type IKlashaContext = {
    initializePayment: Function;
    callBack: Function;
};
declare const KlashaContext: import("react").Context<IKlashaContext>;
export default KlashaContext;
