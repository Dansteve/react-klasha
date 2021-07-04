export interface KlashaOptionsProps {
    /**
     * development status | Should be set to true when using the sandbox and false when on production
     */
    isTestMode?: true | false;
    /**
     * Merchant's API Key (Can be found on the Klasha dashboard)
     */
    merchantKey: string;
    /**
     * Merchant's contract code (Can be found on the Klasha dashboard)
     */
    businessId: string;
    /**
     * The amount to be paid by the customer
     */
    amount: number;
    /**
     * The currency of the transaction being paid. `NGN`
     */
    destinationCurrency: string;
    /**
     * The currency of the transaction being initialized. `NGN`
     */
    sourceCurrency: string;
    /**
     * Merchant's Unique tx_ref for every transaction.
     * (The SDK already has a code snippet that generates this for you, but you can always replace it)
     */
    tx_ref: string;
    /**
     * Full name of the customer
     */
    fullname: string;
    /**
     * Email address of the customer
     */
    email: string;
    /**
     * Phone number of the customer.
     */
    phone_number: string;
    /**
     * callbackUrl
     */
    callbackUrl?: string;
    /**
     * When you need to pass extra data to the API.
     */
    metadata?: any;
    /**
     * When you need to pass extra data to the API.
     */
    kit: KlashaKitOptions;
    /**
     * paymentDescription
     */
    paymentDescription: string;
}
export interface KlashaKitOptions {
    /**
     * The unique tx_ref for the sub account that should receive the split.
     */
    currency: string;
    /**
     * the phone_number
     */
    phone_number?: string;
    /**
     * The  email
     */
    email?: string;
    /**
     * The  fullname
     */
    fullname?: string;
    /**
     * The tx_ref.
     */
    tx_ref?: string;
    /**
     * The percentage of the amount paid to be split into the sub account.
     */
    paymentType?: string;
    /**
     * The callBack function.
     */
    callBack?: any;
}
