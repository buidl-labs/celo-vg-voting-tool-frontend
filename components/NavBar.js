import React from "react";
import { Heading, Box } from "@chakra-ui/react";

export default function NavBar() {
  return (
    <Box py={6} as="nav">
      <Heading size="md">Celo Voting Tool</Heading>
    </Box>
  );
}
