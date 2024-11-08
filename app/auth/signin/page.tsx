import { getCsrfToken } from "next-auth/react";
import LoginForm from "@/components/login-form";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import Redirect from "@/components/redirect";
import { Suspense } from "react";
import { Metadata } from "next";
import { defaultOpenGraphMD, defaultTwitterMD } from "@/lib/configs/metadata";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to mlbb.fyi",
  openGraph: {
    title: "Sign in",
    description: "Sign in to mlbb.fyi",
    url: "https://mlbb.fyi/auth/signin",
    ...defaultOpenGraphMD,
  },
  twitter: {
    title: "Sign in",
    description: "Sign in to mlbb.fyi",
    ...defaultTwitterMD,
  },
};

export default async function Signin() {
  const csrfToken = await getCsrfToken();
  const currentUser = await getCurrentUser();

  if (currentUser) {
    return <Redirect />;
  }

  return (
    <main className="mt-24 h-screen">
      <div className="text-center">
        <h1 className="text-[44px] font-bold leading-10 tracking-tight md:text-[64px] md:leading-[60px]">
          Sign in
        </h1>
        <p className="pt-3 text-[16px] md:text-[16px]">
          Join the community and dominate the battlefield!
        </p>
        <Suspense>
          <LoginForm csrfToken={csrfToken} />
        </Suspense>
      </div>
    </main>
  );
}
