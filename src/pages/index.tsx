import { type NextPage } from "next";
import Head from "next/head";

import { type Stripe, loadStripe } from "@stripe/stripe-js";
import { useMemo } from "react";
import { api } from "../utils/api";
import { env } from "../env/client.mjs";

const useStripe = () => {
  const stripe = useMemo<Promise<Stripe | null>>(
    () => loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY),
    []
  );

  return stripe;
};

const Home: NextPage = () => {
  const createCheckout = api.payment.createCheckout.useMutation();
  const stripePromise = useStripe();

  async function checkout() {
    const response = await createCheckout.mutateAsync({
      email: "webdevcody@gmail.com",
    });
    const stripe = await stripePromise;

    if (stripe !== null) {
      await stripe.redirectToCheckout({
        sessionId: response.id,
      });
    }
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <button
          onClick={() => {
            checkout().catch(console.error);
          }}
        >
          Buy Now
        </button>
      </main>
    </>
  );
};

export default Home;
