import React, { useCallback, useState } from "react";
import { Box, Flex, Button } from "rebass";
import { Label, Input } from "@rebass/forms";

export default function CompanyConfigBar({ page, setPage, hasMore }) {
  const [currentPageValue, setCurrentPageValue] = useState(page);
  const incPage = useCallback(
    (inc) => {
      setCurrentPageValue(Math.max(1, page + inc));
      setPage(Math.max(1, page + inc));
    },
    [setCurrentPageValue, setPage, page]
  );
  return (
    <Flex flexDirection="row" justifyContent="center" alignItems="center" m={4}>
      <Box>
        <Button disabled={page === 1} onClick={() => incPage(-1)}>
          {"<<"}
        </Button>
      </Box>
      <Flex
        marginLeft={2}
        marginRight={2}
        flexDirection={"row"}
        justifyContent="center"
        alignItems="center"
      >
        <Input
          id="page"
          value={currentPageValue}
          onChange={(e) => setCurrentPageValue(parseInt(e.target.value, 0))}
        />
        <Button
          width={100}
          m={1}
          sx={{ cursor: "pointer" }}
          onClick={() => {
            console.log(currentPageValue);
            setPage(currentPageValue);
          }}
        >
          Go
        </Button>
      </Flex>
      <Box>
        <Button disabled={!hasMore} onClick={() => incPage(1)}>
          {">>"}
        </Button>
      </Box>
    </Flex>
  );
}
