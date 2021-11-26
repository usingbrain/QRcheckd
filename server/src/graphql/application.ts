import { createApplication } from 'graphql-modules';
import { courseModule } from './courseModule';
import { userModule } from './userModule';

export const application = createApplication({
  modules: [courseModule, userModule],
});
