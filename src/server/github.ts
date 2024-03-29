import { Octokit } from "octokit";

import { siteConfig } from "~/config/site";
import { env } from "~/env.mjs";

const octokit = new Octokit({
  auth: env.GITHUB_API_AUTH_TOKEN,
  request: { fetch: fetch },
  log: env.NODE_ENV !== "production" ? console : undefined,
});

// public client to use in auto completions
// const octokitPublic = new Octokit({
//   request: { fetch: fetch },
// });

interface SearchIssuesParams {
  querySearch?: string[] | string | null;
}

export async function searchIssues({ querySearch = "" }: SearchIssuesParams) {
  const defaulQuery = `type:issue no:assignee ${siteConfig.github.searchQueryString} ${querySearch}`;
  try {
    const { data } = await octokit.rest.search.issuesAndPullRequests({
      q: defaulQuery,
    });

    return data;
  } catch (e) {
    return { items: [], total_count: 0 };
  }
}

export async function searchRepos(searchQueryString) {
  return await octokit.request(
    `GET /search/repositories?q=${searchQueryString}&has_issues=true&archived=false&per_page=10`,
  );
}

export async function searchPullRequestContributions(
  username: string,
  querySearch: string,
) {
  const defaulQuery = `type:pr ${
    siteConfig.github.searchQueryString
  } author:${username} ${querySearch || ""}`;

  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: defaulQuery,
  });

  return data.items;
}

type Profile = {
  login: string;
};

/**
 * Return Github username by userId instead of
 * using Github `username` field.
 * NOTE: this is better in case users changes its username
 * @param userId
 * @returns
 */
export async function getProfile(userId: string): Promise<Profile> {
  const response: { data: Profile } = await octokit.request(
    "GET /user/" + userId,
  );
  return response?.data;
}

export async function getInstallations() {
  return await octokit.request("GET /installation/repositories", {});
}

export async function getPullRequests(username, assessment) {
  return await searchPullRequestContributions(
    username,
    assessment.ghIssuesQuerySeach,
  );
}

export async function getPullRequest(
  owner: string,
  repo: string,
  pull_number: number,
) {
  const { data: pullRequest } = await octokit.rest.pulls.get({
    owner,
    repo,
    pull_number,
  });

  return pullRequest;
}
