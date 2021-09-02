import {
  Handler,
  HandlerArgs,
  Variables,
} from 'camunda-external-task-client-js';

export const loanProcessHandler: Handler = async ({
  task,
  taskService,
}: HandlerArgs) => {
  // Get task variable 'defaultScore'
  const defaultScore = task.variables.get('defaultScore');

  // Set process variable 'creditScores'
  const creditScores = [defaultScore, 9, 1, 4, 10];
  const processVariables = new Variables()
    .set('creditScores', creditScores)
    .set('bar', new Date());
  console.log('Logging task');
  console.log(task);
  console.log(task.variables.getAll());

  // Complete the task
  try {
    await taskService.complete(task, processVariables);
    console.log('I completed my task successfully!!');
  } catch (e) {
    console.error(`Failed completing my task, ${e}`);
  }
};
