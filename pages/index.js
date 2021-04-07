import React, { useEffect, useState } from "react";
import Head from "next/head";
import NxLink from "next/link";
import {
  Container,
  Box,
  SimpleGrid,
  InputGroup,
  Input,
  InputLeftElement,
  Heading,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Nav from "../components/NavBar";
import useValidatorGroup from "../hooks/useValidatorGroup";

export default function Home() {
  const { data, fetching, error } = useValidatorGroup();
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let q = search.toLowerCase();
    setGroups(
      data["ValidatorGroups"].filter(
        (vg) =>
          vg.name.toLowerCase().includes(q) ||
          vg.address.toLowerCase().includes(q)
      )
    );
  }, [search]);

  useEffect(() => {
    if (!fetching) {
      setGroups(data["ValidatorGroups"]);
    }
  }, [data, fetching, error]);

  return (
    <Container style={{ minHeight: "100vh" }} maxW="container.md">
      <Head>
        <title>Celo Voting Tool</title>
      </Head>
      <Nav />
      <InputGroup mt={4}>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.400" />}
        />
        <Input
          placeholder="Search Validator Group by name or address"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>
      {/* <Box>
        <Code>{JSON.stringify(fetching)}</Code>
        <Code>{JSON.stringify(error)}</Code>
        <pre>
          <Code>{JSON.stringify(data, null, 2)}</Code>
        </pre>
      </Box> */}
      <SimpleGrid columns={1} spacing={4} mt={6}>
        {!fetching ? (
          groups.map((vg) => (
            <NxLink href={`/vg/${vg.address}`} style={{ cursor: "pointer" }}>
              <Box
                borderWidth="1.4px"
                borderRadius="md"
                px={4}
                py={6}
                boxShadow="sm"
                transition="all .3s ease"
                _hover={{
                  background: "yellow.100",
                  transform: "translateY(-1.5px)",
                  borderColor: "green.400",
                  boxShadow: "lg",
                }}
              >
                {vg.name && <Heading size="sm">{vg.name}</Heading>}
                <Heading size="xs" mt={1}>
                  <Text color="green.600" fontWeight="500">
                    {vg.address}
                  </Text>
                </Heading>
              </Box>
            </NxLink>
          ))
        ) : (
          <div>Loading</div>
        )}
      </SimpleGrid>
    </Container>
  );
}
