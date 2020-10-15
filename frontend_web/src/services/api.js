import useSWR, { useSWRInfinite } from "swr";

export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const useCompanies = (page) => {
  return useSWR(`/api/companies-${page}.json`, fetcher);
};

export const useCompany = (id) => {
  return useSWR(`/api/companies/${id}.json`, fetcher);
};
