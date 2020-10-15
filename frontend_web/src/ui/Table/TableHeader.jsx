import React from "react";
import { Box } from "rebass";

export default function TableHeader({ headers }) {
  return (
    <Box as={"thead"} sx={{ position: "sticky", top: 0 }}>
      {headers.map((header) => (
        <Box
          as={"th"}
          sx={{
            textAlign: "left",
            position: "sticky",
            top: 0,
            backgroundColor: "#FFF",
            height: 50,
            borderColor: "lightgrey",
            border: "1px solid",
            boxShadow: "1px 1px 3px grey",
            width: 100,
            padding: 10,
          }}
        >
          {header}
        </Box>
      ))}
    </Box>
  );
}
