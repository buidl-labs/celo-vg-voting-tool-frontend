import { ChakraProvider } from "@chakra-ui/react";
import { createClient, Provider } from "urql";

const client = createClient({
  url: "http://localhost:8080/query",
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Provider value={client}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
