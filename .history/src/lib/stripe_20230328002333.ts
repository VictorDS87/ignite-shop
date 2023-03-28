import Stripe from "stripe";
// @ts-ignore 
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-03-28",
  appInfo: {
    name: 'Ignite-Shop',
  }
})

