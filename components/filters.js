import { useState, useEffect } from 'react';
import { fetchFilters } from '../requests/filters';
import { formatNumberWithComma } from '../utils';
import Modal from './modal';

const Filters = () => {
  const [filters, setFilters] = useState({});
  const [requestState, setRequestState] = useState('loading');
  const [modalFilterType, setModalFilterType] = useState(null);

  useEffect(async () => {
    const { isError, filters } = await fetchFilters();
    if (filters) {
      setFilters(filters);
      setRequestState('success');
    }

    if (isError) {
      setRequestState('error');
    }
  }, []);

  if (requestState !== 'success') {
    return null
  }

  return (
    <div className="w-72 flex-col">
      {
        Object
          .keys(filters)
          .map((filterType) => {
            const filterOptions = filters[filterType];
            const isShowMoreVisible = filterOptions.length > 10;

            return (
              <div
                key={filterType}
                className="bg-white p-4 m-4 border"
              >
                <h3 className="text-sm font-bold">
                  {filterType.replace(/_/g, ' ').toUpperCase()}
                </h3>
                {
                  filterOptions.slice(0, 10).map(({ key, doc_count }) => (
                    <p
                      key={`${filterType}-${key}`}
                      className="text-sm my-2"
                    >
                      {key}
                      <span className="text-xs text-gray-400 ml-2">
                        {formatNumberWithComma(doc_count)}
                      </span>
                    </p>
                  ))
                }
                {
                  isShowMoreVisible
                    ?
                      (
                        <button
                          onClick={() => setModalFilterType(filterType)}
                          className="text-sm text-blue-400 cursor-pointer focus:outline-none"
                        >
                          Show more
                        </button>
                      )
                    : null
                }
              </div>
            );
          })
      }

      <Modal
        open={modalFilterType && modalFilterType.length > 0}
        size="lg"
        onClose={() => setModalFilterType(null)}
      >
        {
          modalFilterType && filters[modalFilterType]
            ? 
              (
                <div className="flex flex-1 flex-col">
                  <h3 className="text-sm font-bold p-4 border-b">
                    {modalFilterType.replace(/_/g, ' ').toUpperCase()}
                  </h3>
                  <div className="flex flex-1 flex-wrap p-4">
                    {
                      filters[modalFilterType].map(({ key, doc_count }) => (
                        <div
                          key={`${modalFilterType}-${key}`}
                          className="text-sm w-full md:w-1/4 p-2"
                        >
                          {key}
                          <span className="text-xs text-gray-400 ml-2">
                            {formatNumberWithComma(doc_count)}
                          </span>
                        </div>
                      ))
                    }
                  </div>
                </div>
              )
            : null
        }
      </Modal>
    </div>
  );
};

export default Filters;
