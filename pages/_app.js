import { AuthProvider } from "../contexts/AuthContext";
import { RealtimeDBProvider } from "../contexts/RealtimeDBContext";

function MyApp({ Component, pageProps }) {
  return <RealtimeDBProvider>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  </RealtimeDBProvider>;
}

export default MyApp;
