import { Octokit } from "octokit";
import { env } from "~/env.mjs";
import { siteConfig } from "~/config/site";
const octokit = new Octokit({
  auth: env.GITHUB_API_AUTH_TOKEN,
  request: { fetch: fetch },
});

interface SearchIssuesParams {
  querySearch?: string[] | string | undefined;
}

async function searchIssues({ querySearch }: SearchIssuesParams) {
  const defaulQuery = `type:issue no:assignee ${
    siteConfig.github.searchQueryString
  } ${(querySearch as string) || ""}`;
  const { data } = await octokit.rest.search.issuesAndPullRequests({
    q: defaulQuery,
  });

  return data.items;
}

export async function searchContributions(
  username: string,
  querySearch: string
) {
  const defaulQuery = `type:pr ${
    siteConfig.github.searchQueryString
  } author:${username} ${querySearch || ""}`;

  console.log(defaulQuery);
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
    "GET /user/" + userId
  );
  return response?.data;
}

export { octokit, searchIssues };
