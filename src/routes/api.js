import express from "express";
import { graphqlHTTP } from "express-graphql";

import graphQLSchema from "../graphql/schema/index.js";
import graphQLResolver from "../graphql/resolvers/index.js"

const router = express.Router();

router.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQLSchema,
   rootValue: graphQLResolver,
    graphiql: true,
  })
);
export { router as apiRouter };
