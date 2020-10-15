import React from "react";
import { Box } from "rebass";

export default function TableBody({ children }) {
  return <Box as={"tbody"}>{children}</Box>;
}
