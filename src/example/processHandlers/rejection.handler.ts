import { Handler, HandlerArgs } from 'camunda-external-task-client-js';

export const requestRejectorHandler: Handler = async ({
  task,
  // @ts-ignore
  taskService,
}: HandlerArgs) => {
  console.log(task);
  console.log(task.variables.getAll());
  console.log(task.variables.get('bar'));
  console.log(task.variables.get('creditScores'));
};
