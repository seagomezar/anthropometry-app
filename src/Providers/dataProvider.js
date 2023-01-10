import { buildFields } from "ra-data-hasura";
import gql from "graphql-tag";

const extractFieldsFromQuery = (queryAst) => {
  return queryAst.definitions[0].selectionSet.selections;
};

// Define the additional fields that we want.
const EXTENDED_GET_ONE_PLAN = gql`
  {
    plan_aggregate {
      nodes {
        prescribed_foods {
          food {
            chos
            fat
            description
            calories
            protein
          }
        }
      }
    }
  }
`;

export const customBuildFields = (type, fetchType) => {
  const resourceName = type.name;

  // First take the default fields (all, but no related or nested).
  const defaultFields = buildFields(type, fetchType);

  if (resourceName === "plans" && fetchType === "GET_ONE") {
    const relatedEntities = extractFieldsFromQuery(EXTENDED_GET_ONE_PLAN);
    defaultFields.push(...relatedEntities);
  }
  // Extend other queries for other resources/fetchTypes here...

  return defaultFields;
};
