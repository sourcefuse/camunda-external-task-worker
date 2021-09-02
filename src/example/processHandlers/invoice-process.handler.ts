// @ts-ignore
import { File, Handler, Variables } from 'camunda-external-task-client-js';

export const invoiceProcessHandler: Handler = async ({ task, taskService }) => {
  // Put your business logic
  // complete the task
  const date = new Date();

  const file = new new File({ localPath: './assets/invoice.txt' })() as any;
  const invoice = await file.load();
  const minute = date.getMinutes();
  const variables = new Variables().setAll({ invoice, date });
  // Check if minute is even
  if (minute % 2 === 0) {
    // For even minutes, store variables in the process scope
    console.log('Logging task');
    console.log(task);
    await taskService.complete(task, variables);
  } else {
    // For odd minutes, store variables in the task local scope
    await taskService.complete(task, undefined, variables);
  }
};
