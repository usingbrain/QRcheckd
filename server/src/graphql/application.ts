import { createApplication } from 'graphql-modules';
import { assignedCourseModule } from './assignedCourseModule';
import { assignedSessionModule } from './assignedSessionModule';
import { courseModule } from './courseModule';
import { userModule } from './userModule';
import { sessionModule } from './sessionModule';

export const application = createApplication({
  modules: [
    courseModule,
    userModule,
    sessionModule,
    assignedCourseModule,
    assignedSessionModule,
  ],
});
