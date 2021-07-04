export const callKlashaClient = (klashaArgs: Record<string, any>): void => {
  console.log('callKlashaClient', klashaArgs);
  //@ts-ignore
  // const handler = window.KlashaSDK && window.KlashaSDK.initialize(klashaArgs);
  const handler = new window.KlashaClient(
    klashaArgs.merchantKey,
    klashaArgs.businessId || 1,
    klashaArgs.amount,
    'ktest',
    klashaArgs.callbackUrl,
    klashaArgs.destinationCurrency,
    klashaArgs.sourceCurrency,
    klashaArgs.kit);
  handler.init();
  console.log('handler', window);
  // handler && handler.loadIframe(klashaArgs);
};
