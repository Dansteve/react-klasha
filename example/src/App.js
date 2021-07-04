/*jshint esversion: 9 */

import React from "react";
import logo from "./site-logo.png";
import { useKlashaPayment, KlashaButton, KlashaConsumer } from "./dist";
import "./App.css";

const config = {
  email: "dansteve@email.com",
  phone_number: "+2348143108254",
  merchantKey: "GByi/gkhn5+BX4j6uI0lR7HCVo2NvTsVAQhyPko/uK4=",
  amount: 1000,
  sourceCurrency: "",
  destinationCurrency: "",
  tx_ref: "" + Math.floor(Math.random() * 1000000000 + 1),
  businessId: "1",
  fullname: "Dansteve Adekanbi",
  paymentDescription: "",
  kit: {
    currency: "",
    phone_number: "+2348143108254",
    email: "dansteve@email.com",
    fullname: "Dansteve Adekanbi",
    tx_ref: "",
    paymentType: "",
  },
};

const KlashaHookExample = () => {
  const componentProps = {
    ...config,
  };
  componentProps.kit.callBack = (response) => console.log(response);

  const initializePayment = useKlashaPayment(componentProps);
  return (
    <div>
      <button
        onClick={() => {
          initializePayment();
        }}
      >
        Klasha Hooks Implementation
      </button>
    </div>
  );
};

function App() {
  const componentProps = {
    ...config,
    text: "Klasha Button Implementation",
  };

  componentProps.kit.callBack = (response) => console.log(response);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Implementation Klasha React
        </a>
      </header>
      <div>
        <KlashaHookExample className="btn" />
      </div>
      <div>
        <KlashaButton {...componentProps} className="btn" />
      </div>
      <div>
        <KlashaConsumer {...componentProps} className="btn">
          {({ initializePayment }) => (
            <button onClick={() => initializePayment()}>
              Klasha Consumer Implementation
            </button>
          )}
        </KlashaConsumer>
      </div>
    </div>
  );
}

export default App;
