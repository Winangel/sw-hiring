import React from "react";
import { Card, Heading, Text, Box, Flex } from "rebass";

export default function CompanyCard({ company }) {
  return (
    <Card m={4}>
      <Heading>
        {company.id} - {company.name}
      </Heading>
      <Box>
        {Object.entries(company)
          .filter((e) => e[0] !== "id" && e[0] !== "name")
          .map(([key, value]) => (
            <Flex p={2} flexDirection={"row"}>
              <Text fontWeight="bold">{key}</Text>
              <Text ml={2}>{value || "-"}</Text>
            </Flex>
          ))}
      </Box>
    </Card>
  );
}
