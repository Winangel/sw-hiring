import React from "react";
import { Box } from "rebass";

export default function TableRow({ rowData, sx, ...rest }) {
  return (
    <Box
      as={"tr"}
      sx={{
        height: 40,
        ...sx,
      }}
      {...rest}
    >
      {rowData.map((d) => (
        <Box
          as={"td"}
          sx={{
            borderColor: "lightgrey",
            borderWidth: "1px",
            borderStyle: "solid",
            padding: 1,
            ":first-child": {
              borderWidth: "0 1px 1px 0px",
            },
            ":last-child": {
              borderWidth: "1px 0px 1px 1px",
            },
          }}
        >
          {d}
        </Box>
      ))}
    </Box>
  );
}
