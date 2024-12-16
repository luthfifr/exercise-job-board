import { getJobs } from './db/jobs.js';

export const resolvers = {
    Query: {
        jobs: async () => {
            return await getJobs();
        },
    },

    Job: {
        // case: field names of date and time are not the same on DB and GraphQL schema. resolving it as follow:
        date: (job) =>  toIsoDate(job.createdAt),
    },
};

// showing date only
function toIsoDate(value) {
    return value.slice(0, 'yyyy-mm-dd'.length);
}