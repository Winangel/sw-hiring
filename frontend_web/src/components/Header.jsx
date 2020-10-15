import React from "react";
import { Box, Heading } from "rebass";

export default function Header() {
  return (
    <Box backgroundColor="primary" padding={3}>
      <Heading fontSize={6} sx={{ color: "white" }}>
        Sharework
      </Heading>
    </Box>
  );
}
