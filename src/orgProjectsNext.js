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
      viewer {
        organization(login: "${process.env.ORGANIZATION}") {
          projectsNext(last: 10) {
            edges {
              node {
                id
                number
                title
              }
            }
          }
        }
      }
    }
  `;

  const res = await graphQLClient.request(query);
  console.log(
    JSON.stringify(
      res.viewer.organization.projectsNext.edges.map((item) => item.node)
    )
  );
}

main().catch((error) => console.error(error));
