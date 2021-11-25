import { typeDef as User } from './user';
import { typeDef as InputUser } from './inputUser';

const Query = `
    type Query {
        registerUser(user: InputUser!): User
    }
`;

makeExecutableSchema({
  typeDefs: [Query, User, InputUser],
  resolvers: {},
});
