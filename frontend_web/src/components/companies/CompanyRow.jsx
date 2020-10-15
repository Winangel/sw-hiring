import React, { useCallback } from "react";
import { Box, Button } from "rebass";
import { TableRow } from "../../ui/Table";
import { Link, useHistory } from "react-router-dom";

export default function CompanyRow({ company }) {
  const history = useHistory();
  const goTo = useCallback(() => {
    history.push(`/${company.id}`);
  }, [history, company.id]);
  return (
    <TableRow
      sx={{
        ":hover": { backgroundColor: "lightgrey" },
        cursor: "pointer",
      }}
      rowData={[company.id, company.name]}
      onClick={goTo}
    ></TableRow>
  );
}
