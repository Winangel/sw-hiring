import React from "react";
import { Box } from "rebass";

export default function Table({ children }) {
  return (
    <Box
      sx={{
        height: "auto",
        overflowY: "scroll",
      }}
    >
      <Box
        as={"table"}
        sx={{
          width: "100%",
          padding: 10,
          borderCollapse: "collapse",
          overflow: "scroll",
          height: "100px",
          tableLayout: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
