import React from "react";
import { useParams } from "react-router-dom";
import CompanyCard from "../components/companies/CompanyCard";
import { useCompany } from "../services/api";

export default function Company() {
  const { companyId } = useParams();
  const { data } = useCompany(companyId);
  console.log(companyId);
  console.log(data);
  if (!data) {
    return null;
  }
  return <CompanyCard company={data}></CompanyCard>;
}
