import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "../utils/api";

const Success: NextPage = () => {
  const router = useRouter();
  const sessionId = useRouter().query.session_id as string;

  const session = api.payment.getStripeSession.useQuery(
    { sessionId },
    {
      enabled: router.isReady,
    }
  );

  useEffect(() => {
    if (session.data?.email) {
      router.push(`/course?email=${session.data.email}`).catch(console.error);
    }
  }, [session.data, router]);

  return (
    <>
      <Head>
        <title>Success!</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        Validating payment...
      </main>
    </>
  );
};

export default Success;
