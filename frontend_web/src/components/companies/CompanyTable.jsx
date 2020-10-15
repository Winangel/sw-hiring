import React from "react";
import { Text, Box } from "rebass";
import { Table, TableBody, TableHeader } from "../../ui/Table";
import CompanyRow from "./CompanyRow";

export default function CompanyTable({ companies }) {
  if (!companies) return <Text>Loading</Text>;
  return (
    <Table>
      <TableHeader headers={["id", "name"]} />
      <TableBody>
        {companies.map((company) => (
          <CompanyRow company={company} />
        ))}
      </TableBody>
    </Table>
  );
}
