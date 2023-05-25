import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: Int
    first_name: String
    last_name: Int
    age: Int
    country: String
    email: String
    date_of_birth: String
    phone: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    users(limit:Int!, page: Int!): [Book]
  }
`;





// for(let i=0 ;i<1000; i++)
// {

//     updatedRecord.push({ 
//         first_name: "username",
//         last_name: parseInt(1)+parseInt(i),
//         id:  parseInt(1)+parseInt(i),
//         email: "user1_email@website.com",
//         country: "USA",
//         date_of_birth: 1310654350393,
//         age:  parseInt(1)+parseInt(i),
//         phone: 987543210
//       })
// }

const createRecord =(limit, page)=>{
   
    let updatedRecord=[];
    for(let i=0 ;i<limit; i++)
    {
    
        updatedRecord=[...   updatedRecord,{ 
            first_name: "username",
            last_name: parseInt(1)+parseInt(i),
            id:  parseInt(1)+parseInt(i),
            email: "user1_email@website.com",
            country: "USA",
            date_of_birth: 1310654350393,
            age:  parseInt(1)+parseInt(i),
            phone: 987543210
          }]
    
}
    return updatedRecord;
}

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
// createRecord(args.limit, args.page)
const resolvers = {
  Query: {
    users:(parent, args, contextValue, info) =>createRecord(args.limit, args.page)
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Server listening at: ${url}`);
