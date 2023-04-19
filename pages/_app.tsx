import "@/styles/globals.css";
import Layout from "@/components/Layout";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import EditModal from "@/components/modals/EditModal";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        {/* <Modal actionLabel="Submit" isOpen title="Test Modal" /> */}
        <Toaster />
        <EditModal />
        <RegisterModal />
        <LoginModal />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </QueryClientProvider>
  );
}
