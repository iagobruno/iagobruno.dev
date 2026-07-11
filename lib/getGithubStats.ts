// import { cacheLife } from 'next/cache';

const query = `
  query GetUserStats($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      repositories(ownerAffiliations: OWNER, isFork: false) {
        totalCount
      }

      starredRepositories {
        totalCount
      }

      contributionsCollection(from: $from, to: $to) {
        contributionYears
        contributionCalendar {
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

export async function getGithubStats(username: string) {
  // 'use cache';
  // cacheLife('hours');

  const years = 13; // Number of years to fetch data for
  const stats = {
    totalCommits: 0,
    repositories: 0,
    starredRepositories: 0,
  };

  for (let i = 0; i < years; i++) {
    const from = new Date();
    from.setFullYear(from.getFullYear() - i);
    from.setMonth(0, 1); // Set to January 1st of the year
    from.setHours(0, 0, 0, 0); // Set to midnight

    const to = new Date(from);
    to.setMonth(11, 31); // Set to December 31st of the same year
    to.setHours(23, 59, 59, 999); // Set to end of day

    try {
      const data = await executeGraphQLQuery(username, { from, to });

      for (const week of data.contributionWeeks) {
        for (const day of week.contributionDays) {
          stats.totalCommits += day.contributionCount;
        }
      }
      stats.repositories = data.repositories;
      stats.starredRepositories = data.starredRepositories;
    } catch (error) {
      console.error(
        `Error fetching GitHub stats for ${username} in year ${from.getFullYear()}:`,
        error,
      );
    }
  }

  return stats;
}

async function executeGraphQLQuery(
  username: string,
  variables: { from: Date; to: Date },
  token: string = process.env.GITHUB_STATS_TOKEN!,
) {
  const GITHUB_API_URL = 'https://api.github.com/graphql';
  const response = await fetch(GITHUB_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        login: username,
        from: variables.from.toISOString(),
        to: variables.to.toISOString(),
      },
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch GitHub GraphQL API.');
  }

  const { data, errors } = await response.json();

  if (errors) {
    throw new Error(errors[0].message);
  }

  return {
    contributionWeeks: data.user.contributionsCollection.contributionCalendar.weeks,
    repositories: data.user.repositories.totalCount,
    starredRepositories: data.user.starredRepositories.totalCount,
  };
}
