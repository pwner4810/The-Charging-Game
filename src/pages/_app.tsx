import '@/styles/globals.css'
import {Provider} from "react-redux";
import {useStore} from "@/state";
import {useState} from "react";
import {Hydrate, QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AppProps} from "next/app";
import Layout from "@/components/atoms/Layout";

export default function App({Component, pageProps}: AppProps) {
    const store = useStore(pageProps.initialReduxState);
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <Provider store={store}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </Provider>
            </Hydrate>

        </QueryClientProvider>

    );
}
