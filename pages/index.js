import Head from "next/head";
import { Container } from "@chakra-ui/react";

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Celo Voting Tool</title>
      </Head>
      <div>Celo Voting tool</div>
    </Container>
  );
}
