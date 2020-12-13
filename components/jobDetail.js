import { useState } from 'react';
import { pluralize, timeSince } from '../utils';

const Row = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleJobDetail = () => setIsExpanded((isExpanded) => !isExpanded);

  return (
    <div className="w-full text-sm">
      <div
        onClick={toggleJobDetail}
        className="w-full flex py-3 border-t cursor-pointer"
      >
        <div className="w-3/4">
          <b>{data.job_title}</b>
          <div>
            {data.job_type}{' | '}
            ${data.salary_range[0]} - ${data.salary_range[1]} an hour{' | '}
            {data.city}
          </div>
        </div>
        <div className="w-1/4 flex flex-1 items-center justify-end">
          {timeSince(data.created)} ago
        </div>
      </div>
      {
        isExpanded && (
          <div className="w-full flex">
            <div className="w-3/4">
              <div className="flex flex-1 my-2">
                <div className="w-1/2">
                  Department
                </div>
                <div className="w-1/2">
                  {data.department.join(', ')}
                </div>
              </div>
              <div className="flex flex-1 my-2">
                <div className="w-1/2">
                  Hours / shifts
                </div>
                <div className="w-1/2">
                  {data.hours} hours / {data.work_schedule}
                </div>
              </div>
              <div className="flex flex-1 my-2">
                <div className="w-1/2">
                  Summary
                </div>
                <div className="w-1/2">
                  {data.description}
                </div>
              </div>
            </div>
            <div className="w-1/4 flex flex-col items-center justify-center">
              <button className="block font-medium text-sm p-2 bg-primary rounded-md text-white">
                Job details
              </button>
              <div className="h-2" />
              <button className="block font-medium text-sm p-2 border-2 border-primary-light rounded-md text-primary-light">
                Save job
              </button>
            </div>
          </div>
        )
      }
    </div>
  );
};

const JobDetail = ({ job }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { total_jobs_in_hospital: totalJobs, name, items } = job;
  const firstTwoLetters = name.slice(0, 2).toUpperCase();
  const toggleJobDetail = () => setIsExpanded((isExpanded) => !isExpanded);

  return (
    <div>
      <div
        onClick={toggleJobDetail}
        className="flex flex-1 pt-2 pb-3 items-center cursor-pointer"
      >
        <div className="bg-gray-300 rounded-md text-white flex items-center justify-center text-lg focus:outline-none h-10 w-10">
          {firstTwoLetters}
        </div>
        <div className="ml-2">
          {pluralize(totalJobs, 'job')} for {name}
        </div>
      </div>
      {
        isExpanded && (
          items.map((item, index) => (
            <Row
              key={`${name}-${item.job_title}-${index}`}
              data={item}
            />
          ))
        )
      }
    </div>
  );
};

export default JobDetail;
