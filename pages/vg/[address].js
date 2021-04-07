import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Nav from "../../components/NavBar";
import {
  Container,
  Box,
  Heading,
  Link,
  SimpleGrid,
  Text,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import useValidatorGroup from "../../hooks/useValidatorGroup";

const ValidatorGroup = () => {
  const [VG, setVG] = useState({});
  const [VGStats, setVGStats] = useState({});
  const router = useRouter();
  const { address } = router.query;
  const { data, fetching, error } = useValidatorGroup();

  useEffect(() => {
    if (!fetching) {
      setVG(data["ValidatorGroups"].find((vg) => vg.address == address));
    }
  }, [fetching]);

  useEffect(() => {
    if (VG?.stats) {
      setVGStats(VG.stats[VG.stats.length - 1]);
    }
  }, [Object.keys(VG).length]);

  return (
    <Container style={{ minHeight: "100vh" }} maxW="container.md">
      <Head>
        <title>Validator Group</title>
      </Head>
      <Nav />
      <Box>
        {!fetching ? (
          <Box mt={8}>
            {VG.name && <Heading size="xl">{VG.name}</Heading>}
            <Heading size="md">{VG.address}</Heading>
            {VG.website_url && (
              <Box mt={2} display="inline-block">
                <Link
                  href={`https://${VG.website_url}`}
                  isExternal
                  color="green.600"
                  fontSize="lg"
                  style={{
                    textDecoration: "underline",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  {VG.website_url}
                  <span style={{ marginLeft: "4px" }}>
                    <ExternalLinkIcon w={3} h={3} />
                  </span>
                </Link>
              </Box>
            )}

            <Box borderWidth="1.4px" borderRadius="md" px={3} py={6} mt={4}>
              <Heading size="md">Validator Group Stats</Heading>
              <UnorderedList mt={3}>
                <ListItem>
                  <Text>
                    Locked Gold -{" "}
                    {(parseInt(VGStats.locked_gold) / Math.pow(10, 18)).toFixed(
                      2
                    )}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text>
                    Votes received -{" "}
                    {(parseInt(VGStats.votes) / Math.pow(10, 18)).toFixed(2)}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text>
                    Votes left -{" "}
                    {(parseInt(VGStats.voting_cap) / Math.pow(10, 18)).toFixed(
                      2
                    )}
                  </Text>
                </ListItem>
              </UnorderedList>
            </Box>
            {VG?.validators?.length > 0 ? (
              <Box mt={6}>
                <Heading size="md">Validators</Heading>
                <SimpleGrid spacing={4} mt={2}>
                  {VG.validators.map((v) => {
                    let stats = v.stats[v.stats.length - 1];
                    let currentlyElected =
                      parseInt(stats.last_elected / 17280) == stats.epoch_num;

                    return (
                      <Box
                        borderWidth="2px"
                        px={2}
                        py={4}
                        borderRadius="md"
                        borderColor={currentlyElected ? "green.400" : "red.400"}
                        boxShadow="xs"
                      >
                        <Text>{v.address}</Text>
                        {v.name && <Text>{v.name}</Text>}

                        {currentlyElected ? (
                          <Box mt={2}>
                            <Text fontWeight="bold">Elected</Text>

                            <Box mt={1}>
                              <Text>
                                Attestations Completed -{" "}
                                {stats.attenstations_fulfilled}
                              </Text>
                              <Text>
                                Attestations Requested -{" "}
                                {stats.attestations_requested}
                              </Text>
                            </Box>
                            <Box mt={1}>
                              <Text>
                                Uptime score -{" "}
                                {(
                                  parseInt(stats.score) / Math.pow(10, 22)
                                ).toFixed(2)}
                              </Text>
                            </Box>
                          </Box>
                        ) : (
                          <Text fontWeight="bold">Not elected</Text>
                        )}
                      </Box>
                    );
                  })}
                </SimpleGrid>
              </Box>
            ) : (
              <Text mt={6} fontWeight="bold" fontSize="xl">
                This Validator Group has no validators.
              </Text>
            )}
            <Box></Box>
            {/* <pre>{JSON.stringify(VG.validators.length, null, 4)}</pre> */}
          </Box>
        ) : (
          <Heading>Loading</Heading>
        )}
      </Box>
    </Container>
  );
};

export default ValidatorGroup;
