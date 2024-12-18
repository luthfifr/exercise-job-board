import { getCompany } from './db/companies.js'
import { getJob, getJobs, getJobsByCompany } from './db/jobs.js';

export const resolvers = {
    Query: {
        company: async(_root, { id }) => {
            return await getCompany(id);
        },
        job: async (_root, { id }) => {
            return await getJob(id);
        },
        jobs: async () => {
            return await getJobs();
        },
    },

    Company: {
        jobs: (company) => getJobsByCompany(company.id),
    },

    Job: {
        company: (job) => getCompany(job.companyId),
        // case: field names of date and time are not the same on DB and GraphQL schema. resolving it as follow:
        date: (job) =>  toIsoDate(job.createdAt),
    },
};

// showing date only
function toIsoDate(value) {
    return value.slice(0, 'yyyy-mm-dd'.length);
}