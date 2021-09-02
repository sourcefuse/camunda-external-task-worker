import {
  TopicConfigurationLoadMethod,
  WorkerConfiguration,
} from '../configuration';
import { enumFromName } from '../utilities';

export const getWorkerConfiguration = (process: NodeJS.Process) => {
  const taskFailureRetryCount = process.env.TASK_FAILURE_RETRY_COUNT
    ? Number(process.env.TASK_FAILURE_RETRY_COUNT)
    : undefined;

  const taskFailureRetryTimeout = process.env.TASK_FAILURE_RETRY_TIMEOUT
    ? Number(process.env.TASK_FAILURE_RETRY_TIMEOUT)
    : undefined;

  const topicConfigurationLoadMethod = process.env
    .TOPIC_CONFIGURATION_LOAD_METHOD
    ? enumFromName(
        process.env.TOPIC_CONFIGURATION_LOAD_METHOD as string,
        TopicConfigurationLoadMethod
      )
    : undefined;

  return new WorkerConfiguration(
    process.env.WORKFLOW_SERVICE_BASE_URL as string,
    process.env.CAMUNDA_REST_URL as string,
    topicConfigurationLoadMethod,
    taskFailureRetryCount,
    taskFailureRetryTimeout
  );
};
