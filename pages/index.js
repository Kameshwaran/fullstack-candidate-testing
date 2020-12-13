import React, { useState, useCallback } from 'react';
import Head from 'next/head'
import Layout from '../components/layout';
import Search from '../components/search';
import Filters from '../components/filters';
import Results from '../components/results';

const Home = () => {
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState({
    job_type: [],
    department: [],
    work_schedule: [],
    experience: [],
  });
  const [sortOptions, setSortOptions] = useState({
    attribute: '',
    order: '',
  });
  const onToggleFilter = useCallback((filterType, value) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [filterType]: value,
    }));
  }, []);

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mt-16">
        <Search
          keyword={keyword}
          onKeywordChange={setKeyword}
        />
        <div className="flex flex-1">
          <div className="hidden md:block">
            <Filters
              applied={filters}
              onToggleFilter={onToggleFilter}
            />
          </div>
          <Results
            keyword={keyword}
            filters={filters}
            sortOptions={sortOptions}
            onChangeSortOptions={setSortOptions}
          />
        </div>
      </main>
    </Layout>
  )
};

export default Home;
