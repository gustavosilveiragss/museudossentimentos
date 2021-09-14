import { AuthProvider } from "../contexts/AuthContext";
import { RealtimeDBProvider } from "../contexts/RealtimeDBContext";
import { ChakraProvider } from "@chakra-ui/react"

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <RealtimeDBProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </RealtimeDBProvider>
    </ChakraProvider>
  );
}

export default MyApp;
