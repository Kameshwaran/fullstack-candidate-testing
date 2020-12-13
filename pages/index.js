import React, { useState } from 'react';
import Head from 'next/head'
import Layout from '../components/layout';
import Filters from '../components/filters';
import Results from '../components/results';

const Home = () => {
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState({
    jopType: [],
    department: [],
    workSchedule: [],
    experience: [],
  });
  const [sortOptions, setSortOptions] = useState({
    attribute: '',
    order: '',
  });

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-1 mt-16">
        <Filters />
        <Results />
      </main>
    </Layout>
  )
};

export default Home;
