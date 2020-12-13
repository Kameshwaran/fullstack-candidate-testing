export const fetchJobs = async () => {
  try {
    const jobs = await fetch('/api/jobs').then((res) => res.json());
    return { jobs };
  } catch(err) {
    return { isError: true };
  }
};