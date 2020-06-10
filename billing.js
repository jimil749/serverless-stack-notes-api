import stripePackage from "stripe";
import handler from './libs/handler-lib';
import { calculateCost } from './libs/billing-lib';

export const main = handler(async (event, context) => {

    //storage is the number of notes to store and source is the stripe token
    const { storage, source } = JSON.parse(event.body);
    const amount = calculateCost(storage);
    const description = "Scratch charge";

    const stripe = stripePackage(process.env.stripeSecretKey);

    await stripe.charges.create({
        source,
        amount,
        description,
        currency: "usd",
        shipping: {
            name: "Jenny Rosen",
            address: {
              line1: "510 Townsend St",
              postal_code: "98140",
              city: "San Francisco",
              state: "CA",
              country: "US",
            },
          },
    });

    return { status: true };
});
