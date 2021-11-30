import { createContext, useContext } from 'react';

export const CourseContext = createContext<{ name: string; id: string } | null>(
  null
);

export function useCourseContext() {
  const context = useContext(CourseContext);
  if (!context) throw new Error('context provider not present.');
  return context;
}

export const SetCourseContext = createContext<React.Dispatch<
  React.SetStateAction<{ name: string; id: string }>
> | null>(null);

export function useSetCourseContext() {
  const context = useContext(SetCourseContext);
  if (!context) throw new Error('context provider not present.');
  return context;
}
