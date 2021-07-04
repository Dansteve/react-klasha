import { createContext } from 'react';

type IKlashaContext = {
  initializePayment: Function;
  callBack: Function;
};

const KlashaContext = createContext<IKlashaContext>({
  initializePayment: () => null,
  callBack: () => null,
});

export default KlashaContext;
