import React from "react";
import { Box, Flex } from "rebass";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <Flex
      flexDirection="column"
      sx={{ margin: "auto", maxWidth: ["100%", 600, 1100], height: "100vh" }}
    >
      <Header></Header>
      <Box flex="1 1 auto">{children}</Box>
    </Flex>
  );
}
