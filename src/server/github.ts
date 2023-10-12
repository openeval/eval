import { Octokit } from "octokit";
import { env } from "~/env.mjs";
import { siteConfig } from "~/config/site";
const octokit = new Octokit({
  auth: env.GITHUB_API_AUTH_TOKEN,
  request: { fetch: fetch },
});

const octokitPublic = new Octokit({
  request: { fetch: fetch },
});

interface SearchIssuesParams {
  querySearch?: string[] | string | undefined;
}

export async function searchIssues({ querySearch }: SearchIssuesParams) {
  const defaulQuery = `type:issue no:assignee ${
    siteConfig.github.searchQueryString
  } ${(querySearch as string) || ""}`;
  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: defaulQuery,
  });

  return data.items;
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
