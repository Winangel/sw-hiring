import React, { Fragment, useState } from "react";
import useSWR from "swr";
import CompanyConfigBar from "../components/companies/CompanyConfigBar";
import CompanyTable from "../components/companies/CompanyTable";
import { useCompanies } from "../services/api";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const [page, setPage] = useState(1);
  const { data, error, size, setSize } = useCompanies(page);
  if (error) return <div>error</div>;
  return (
    <Fragment>
      <CompanyConfigBar
        page={page}
        setPage={setPage}
        hasMore={data && data.has_more}
      />
      {data && <CompanyTable companies={data.results} />}
    </Fragment>
  );
}
