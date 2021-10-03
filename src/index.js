import { GraphQLClient, gql } from "graphql-request";

async function main() {
  const endpoint = "https://api.github.com/graphql";

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "GraphQL-Features": "projects_next_graphql",
    },
  });

  const query = gql`
    {
      search(first: 100, type: ISSUE, query: "${process.env.ISSUE_QUERY}") {
        edges {
          node {
            ... on Issue {
              id
              title
            }
          }
        }
      }
    }
  `;

  const res = await graphQLClient.request(query);
  const targetIssueIds = Array.from(
    new Set(res.search.edges.map((item) => item.node.id).filter((v) => !!v))
  );

  for (const id of targetIssueIds) {
    const mutationQuery = gql`
        mutation {
          addProjectNextItem(input: {projectId: "${process.env.PROJECT_NEXT_ID}" contentId: "${id}"}) {
            projectNextItem {
              id
            }
          }
        }
      `;
    const result = await graphQLClient.request(mutationQuery);
    console.log(result);
  }

  console.log("DONE😀");
}

main().catch((error) => console.error(error));
