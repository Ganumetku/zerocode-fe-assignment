import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';


// For proper page layout typing
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ThemeProvider>
      <AuthProvider>
        {getLayout(
          <>
            <Component {...pageProps} />
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: 'var(--background)',
                  color: 'var(--foreground)',
                },
              }}
            />
          </>
        )}
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;