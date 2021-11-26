import { createModule, gql } from 'graphql-modules';

export const courseModule = createModule({
  id: 'course-module',
  dirname: __dirname,
  typeDefs: [
    gql`
      type Query {
        createCourse: String
      }

      type Course {
        id: Int
        name: String
        teacher_id: Int
      }
    `,
  ],
  resolvers: {
    Query: {
      createCourse: () => 'hello world',
    },
  },
});
