import { Provider as ReduxProvider } from 'react-redux';
import { SessionProvider, useSession } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { store } from '../store';
import '../styles/globals.css';

const queryClient = new QueryClient();

function Auth({ children }) {
  const { data: session, status } = useSession({ required: true });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return children;
}

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </ReduxProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
