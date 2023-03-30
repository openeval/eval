import { Octokit } from "octokit";
import { env } from "~/env.mjs";
import { siteConfig } from "~/config/site";
const octokit = new Octokit({
  auth: env.GITHUB_API_AUTH_TOKEN,
});

interface SearchIssuesParams {
  querySearch?: string | string[] | undefined;
}

async function searchIssues({ querySearch }: SearchIssuesParams) {
  const defaulQuery = `type:issue no:assignee ${
    siteConfig.github.searchQueryString
  } ${querySearch || ""}`;
  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: defaulQuery,
  });

  return data.items;
}

export async function searchContributions(userId, querySearch) {
  const user = await getProfile(userId);
  console.log(user);
  const defaulQuery = `type:pr ${siteConfig.github.searchQueryString} author:${
    user.login
  } ${querySearch || ""}`;

  console.log(defaulQuery);
  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: defaulQuery,
  });

  return data.items;
}

export async function getProfile(userId: string) {
  const { data } = await octokit.request("GET /user/" + userId);
  return data;
}

export { octokit, searchIssues };
