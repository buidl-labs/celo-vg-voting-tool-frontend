import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Nav from "../../components/NavBar";
import { Container, Box, Heading, Code } from "@chakra-ui/react";
import useValidatorGroup from "../../hooks/useValidatorGroup";

const ValidatorGroup = () => {
  const [VG, setVG] = useState({});
  const router = useRouter();
  const { address } = router.query;
  const { data, fetching, error } = useValidatorGroup();

  useEffect(() => {
    if (!fetching) {
      setVG(data["ValidatorGroups"].find((vg) => vg.address == address));
    }
  }, [fetching]);

  return (
    <Container style={{ minHeight: "100vh" }} maxW="container.md">
      <Nav />
      <Box>
        <p>{JSON.stringify(fetching)}</p>
        {/* <Heading size="xl">Name</Heading> */}
        {/* <Heading size="md">Address</Heading> */}
        <pre>
          <Code p={2}>{JSON.stringify(VG, null, 2)}</Code>
        </pre>
      </Box>
    </Container>
  );
};

export default ValidatorGroup;
