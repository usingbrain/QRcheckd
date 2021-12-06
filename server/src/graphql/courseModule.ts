import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';
import { createModule, gql } from 'graphql-modules';
import { Course } from '../entities/Course';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './isAuthenticated';
import { Request } from 'express';
import { AssignedCourse } from '../entities/AssignedCourse';
import { Session } from '../entities/Session';
import { AssignedSession } from '../entities/AssignedSession';

export const courseModule = createModule({
  id: 'course-module',
  dirname: __dirname,
  typeDefs: [
    gql`
      type Query {
        getCourses: CoursesResponse
        getCourse(courseId: Int!): CourseResponse
        getCourseOverview(courseId: Int!): OverviewResponse!
      }

      type Mutation {
        createCourse(name: String): CourseResponse
        deleteCourse(courseId: Int!): DeletionResponse
      }

      type Course {
        id: Int!
        name: String!
        teacher: Int!
      }

      type CourseResponse {
        error: String
        data: Course
      }

      type CoursesResponse {
        error: String
        data: [Course]
      }

      type OverviewResponse {
        error: String
        data: CourseOverview
      }

      type CourseOverview {
        studentTotal: Int!
        sessions: [Session]!
      }

      type DeletionResponse {
        error: String
        data: Boolean
      }
    `,
  ],
  resolvers: {
    Query: {
      getCourse: combineResolvers(
        isAuthenticated,
        async (
          _: any,
          { courseId }: { courseId: number },
          { orm }: { orm: MikroORM<IDatabaseDriver<Connection>>; req: Request }
        ) => {
          try {
            const course = await orm.em.findOneOrFail(Course, courseId);
            return { data: { ...course, teacher: course.teacher.id } };
          } catch (error) {
            return { error: 'Course not found' };
          }
        }
      ),
      getCourses: combineResolvers(
        isAuthenticated,
        async (
          _: any,
          {},
          {
            orm,
            req,
          }: { orm: MikroORM<IDatabaseDriver<Connection>>; req: Request }
        ) => {
          const courses = await orm.em.find(Course, {
            teacher: req.session!.userId,
          });
          const courseList = courses.map((course) => ({
            ...course,
            teacher: course.teacher.id,
          }));
          return { data: courseList };
        }
      ),
      getCourseOverview: combineResolvers(
        isAuthenticated,
        async (
          _: any,
          { courseId }: { courseId: number },
          { orm }: { orm: MikroORM<IDatabaseDriver<Connection>> }
        ) => {
          const assigments = await orm.em.find(AssignedCourse, {
            course_id: courseId,
          });
          const studentTotal = assigments.length;
          const sessions = await orm.em.find(Session, { course: courseId });
          return { data: { studentTotal, sessions } };
        }
      ),
    },

    Mutation: {
      createCourse: combineResolvers(
        isAuthenticated,
        async (
          _: any,
          { name }: { name: string },
          {
            orm,
            req,
          }: { orm: MikroORM<IDatabaseDriver<Connection>>; req: Request }
        ) => {
          const newCourse = orm.em.create(Course, {
            name,
            teacher: req.session!.userId,
          });
          await orm.em.persistAndFlush(newCourse);
          return { data: { ...newCourse, teacher: newCourse.teacher.id } };
        }
      ),

      deleteCourse: combineResolvers(
        isAuthenticated,
        async (
          _: any,
          { courseId }: { courseId: number },
          { orm }: { orm: MikroORM<IDatabaseDriver<Connection>> }
        ) => {
          try {
            const sessionIds: number[] = [];
            // delete students assigment to the course
            await orm.em.nativeDelete(AssignedCourse, { course_id: courseId });
            // delete course sessions
            const sessions = await orm.em.find(Session, { course: courseId });
            for (const session of sessions) {
              sessionIds.push(session.id);
              await orm.em.getRepository(Session).remove(session);
            }
            // delete attendace of deleted sessions
            for (const id of sessionIds) {
              await orm.em.nativeDelete(AssignedSession, { session_id: id });
            }
            // delete course
            await orm.em.nativeDelete(Course, courseId);

            return { data: true };
          } catch (error) {
            console.error(error);
            return { data: false };
          }
        }
      ),
    },
  },
});
