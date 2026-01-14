export interface ITask {
  id?: string;
  title: string;
  date: string; // або Date, залежно від потреб
}

export interface ITaskFormValues {
  title: string;
  date: string;
}