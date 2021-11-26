import { createApplication } from 'graphql-modules';
import { assignedCourseModule } from './assignedCourseModule';
import { courseModule } from './courseModule';
import { userModule } from './userModule';

export const application = createApplication({
  modules: [courseModule, userModule, assignedCourseModule],
});
