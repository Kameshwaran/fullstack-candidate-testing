import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Layout from '../components/layout';
import Filters from '../components/filters';

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

      <main className="flex flex-1">
        <Filters />
      </main>
    </Layout>
  )
};

export default Home;
