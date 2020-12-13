import { useState, useEffect } from 'react';
import { fetchJobs } from '../requests/jobs';
import JobDetail from './jobDetail';

const Results = () => {
  const [results, setResults] = useState([]);
  const [requestState, setRequestState] = useState(null);
  const totalResults = results.reduce((total, job) => total + job.total_jobs_in_hospital, 0);

  useEffect(async () => {
    const { jobs, isError } = await fetchJobs();

    if (jobs) {
      setResults(jobs);
      setRequestState('success');
    }

    if (isError) {
      setRequestState('error');
    }
  }, []);

  return (
    <div className="flex flex-1 flex-col m-4 ml-0 bg-white border">
      <div className="flex flex-1 py-8 px-4">
        <div className="flex-1">
          <span className="text-sm">
            <b>{totalResults}</b> job postings
          </span>
        </div>
        <div className="flex-1 flex justify-end">
          <span className="text-sm mx-2 text-gray-400">Sort by</span>
          <span className="text-sm mx-2">Location</span>
          <span className="text-sm mx-2">Role</span>
          <span className="text-sm mx-2">Department</span>
          <span className="text-sm mx-2">Experience</span>
          <span className="text-sm mx-2">Education</span>
        </div>
      </div>
      <div className="flex flex-1 px-4 flex-col">
        {
          results.map((job) => (
            <JobDetail
              key={job.name}
              job={job}  
            />
          ))
        }
      </div>
    </div>
  );
};

export default Results;
