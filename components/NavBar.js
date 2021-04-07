import React from "react";
import NxLink from "next/link";
import { Heading, Box } from "@chakra-ui/react";

export default function NavBar() {
  return (
    <Box py={6} as="nav">
      <Heading size="md">
        <NxLink href="/">Celo Voting Tool</NxLink>
      </Heading>
    </Box>
  );
}
