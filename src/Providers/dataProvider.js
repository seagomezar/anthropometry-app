import { buildFields } from 'ra-data-hasura';
import gql from 'graphql-tag';

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

// Define the additional fields that we want.
const EXTENDED_GET_MANY_REFERENCE_PLAN = gql`
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

const EXTENDED_GET_MANY_REFERENCE_PRESCRIBED_FOOD = gql`
  {
    prescribed_food_aggregate {
      nodes {
        food {
          calories
          chos
          description
          fat
          protein
          quantity
        }
      }
    }
  }
`;

const EXTENDED_GET_MANY_PRESCRIBED_FOOD = gql`
  {
    prescribed_food_aggregate {
      nodes {
        food {
          calories
          chos
          description
          fat
          protein
          quantity
        }
      }
    }
  }
`;

export const customBuildFields = (type, fetchType) => {
  const resourceName = type.name;

  // First take the default fields (all, but no related or nested).
  const defaultFields = buildFields(type, fetchType);

  if (resourceName === 'plans' && fetchType === 'GET_ONE') {
    const relatedEntities = extractFieldsFromQuery(
      EXTENDED_GET_ONE_PLAN
    );
    defaultFields.push(...relatedEntities);
  }

  if (
    resourceName === 'plans' &&
    fetchType === 'GET_MANY_REFERENCE'
  ) {
    const relatedEntities = extractFieldsFromQuery(
      EXTENDED_GET_MANY_REFERENCE_PLAN
    );
    defaultFields.push(...relatedEntities);
  }

  if (
    resourceName === 'prescribed_foods' &&
    fetchType === 'GET_MANY_REFERENCE'
  ) {
    const relatedEntities = extractFieldsFromQuery(
      EXTENDED_GET_MANY_REFERENCE_PRESCRIBED_FOOD
    );
    defaultFields.push(...relatedEntities);
  }

  if (
    resourceName === 'prescribed_foods' &&
    fetchType === 'GET_MANY'
  ) {
    const relatedEntities = extractFieldsFromQuery(
      EXTENDED_GET_MANY_PRESCRIBED_FOOD
    );
    defaultFields.push(...relatedEntities);
  }

  // Extend other queries for other resources/fetchTypes here...

  return defaultFields;
};
