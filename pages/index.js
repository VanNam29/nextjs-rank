import Head from "next/head";
import { useState } from "react";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");
  // console.log("countries", countries);

  const filterCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) || country.region.toLowerCase().includes(keyword)
  );

  const handleChange = (event) => {
    event.preventDefault();

    setKeyword(event.target.value);
  };

  return (
    <Layout>
      <div>Found {countries.length} countries</div>
      <SearchInput placeholder="filter name..." onChange={handleChange} />

      <CountriesTable countries={filterCountries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};
