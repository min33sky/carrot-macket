import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <div className="mx-auto w-full max-w-xl">
        <Component {...pageProps} />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
