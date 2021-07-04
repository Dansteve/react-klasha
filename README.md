# react-klasha

This is a react library for implementing klasha payment gateway

## Demo

![Demo](App.png?raw=true "Demo Image")

## Get Started

This React library provides a wrapper to add Klasha Payments to your React application

### Install

```sh
npm install react-klasha --save
```

or with `yarn`

```sh
yarn add react-klasha
```

### Usage

```javascript
    import React, { Component } from 'react';
    //import the library
    import { useKlashaPayment, KlashaButton, KlashaConsumer, KlashaHookExample } from 'react-klasha';

    class App extends Component {

    	state = {
          email: 'dansteve@email.com',
          phone_number: '+2348143108254',
          merchantKey: 'GByi/gkhn5+BX4j6uI0lR7HCVo2NvTsVAQhyPko/uK4=',
          amount: 1000,
          sourceCurrency: '',
          destinationCurrency: '',
          tx_ref: '' + Math.floor((Math.random() * 1000000000) + 1),
          businessId: '1',
          fullname: 'Dansteve Adekanbi',
          paymentDescription: '',
          kit: {
            currency: '',
            phone_number: '+2348143108254',
            email: 'dansteve@email.com',
            fullname: 'Dansteve Adekanbi',
            tx_ref: '',
            paymentType: '',
          }
        }

    	callBack = (response) => {
    		console.log(response); // card charged successfully, get tx_ref here
    	}


      render() {
        return (
        <div>
          <KlashaHookExample className="btn" />
        </div>
        <div>
            <p>
              <KlashaButton
                text="Make Payment"
                className="payButton"
                callBack={this.callBack}
                disabled={true} {/*disable payment button*/}
                embed={true} {/*payment embed in your app instead of a pop up*/}
                fullname={this.state.fullname}
                email={this.state.email}
                phone_number={this.state.phone_number}
                amount={this.state.amount}
                merchantKey={this.state.merchantKey}
                businessId={this.state.businessId}
                tx_ref={this.state.tx_ref}
                kit={this.state.kit}
                tag="button"{/*it can be button or a or input tag */}
              />
            </p>
        </div>
        <div>
        <KlashaConsumer {...componentProps} className="btn">
          {({initializePayment}) => (
            <button onClick={() => initializePayment()}>Klasha Consumer Implementation</button>
          )}
        </KlashaConsumer>
      </div>
        );
      }
    }

    export default App;
```

For more information checkout [klasha's documentation](https://documenter.getpostman.com/view/8963555/TzJoFgHh)

## Deployment

REMEMBER TO CHANGE THE MID WHEN DEPLOYING ON A LIVE/PRODUCTION SYSTEM

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Some commit message'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request 😉😉

## How can I thank you?

Why not star the github repo? I'd love the attention! Why not share the link for this repository on Twitter or Any Social Media? Spread the word!

Don't forget to [follow me on twitter](https://twitter.com/dansteveade)!

Thanks!
Adekanbi Dansteve.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
