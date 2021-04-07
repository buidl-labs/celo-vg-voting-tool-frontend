import React, { useEffect } from "react";
import Head from "next/head";
import {
  Container,
  Box,
  InputGroup,
  Input,
  InputLeftElement,
  Code,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Nav from "../components/NavBar";
import { useQuery } from "urql";

const VG_Query = `
  query{
    ValidatorGroups {
      name
      website_url
      address
    
      validators {
        name
        stats{
          last_elected
          attestations_requested
          attenstations_fulfilled
          score
        } 
      }
      stats{
        epoch_num
        votes
        locked_gold
        voting_cap
        reward_ratio
        group_share
        attestation_percentage
      }
    }
  }
`;

export default function Home() {
  const [result, _] = useQuery({
    query: VG_Query,
  });

  const { data, fetching, error } = result;

  useEffect(() => {
    console.log(data);
    console.log(fetching);
    console.log(error);
  }, [data, fetching, error]);
  return (
    <Container style={{ minHeight: "100vh" }}>
      <Head>
        <title>Celo Voting Tool</title>
      </Head>
      <Nav />
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.400" />}
        />
        <Input placeholder="Search Validator Group by name or address" />
      </InputGroup>
      <Box>
        <Code>{fetching}</Code>
        <Code>{error}</Code>
        <pre>
          <Code>{JSON.stringify(data, null, 2)}</Code>
        </pre>
      </Box>
    </Container>
  );
}
