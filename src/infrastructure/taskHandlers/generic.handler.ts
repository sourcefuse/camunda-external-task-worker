import {
  getTopicConfigurations,
  getWorkerConfiguration,
  TokenService,
  TopicConfiguration,
} from '../index';
import axios from 'axios';
import { Handler } from 'camunda-external-task-client-js';
import { StatusCodes } from 'http-status-codes';

// TODO: inject dependencies
export const genericHandler: Handler = async ({ task, taskService }: any) => {
  const workerConfiguration = getWorkerConfiguration(process);
  const topicConfigurations = getTopicConfigurations(
    workerConfiguration.topicConfigurationLoadMethod
  );
  const filteredConfigs = topicConfigurations?.filter(
    tc => tc.topicName === task?.topicName
  );
  const topicConfig = filteredConfigs[0] as TopicConfiguration;
  if (!!filteredConfigs || !!topicConfig.url) {
    throw new Error(
      `Topic: ${task?.topicName} is not configured correctly. Topic configuration is missing or URL is not configured for the topic.`
    );
  }

  const status =
    task.variables.get(`${task.activityId}_status`)?.toString() ?? 'pending';

  const taskInfo = {
    taskId: task.id,
    taskDefinitionKey: task.activityId,
    activityId: task.activityId,
    processDefinitionId: task.processDefinitionId,
    processInstanceId: task.processInstanceId,
    tenantId: task.tenantId,
    topicName: task.topicName,
  };

  const workflowRequest = {
    vars: task.variables.getAll(),
    taskId: task.id,
    taskDefinitionId: task.activityId,
    status,
    taskInfo,
  };

  const tokenService = TokenService.getInstance();
  const authHeaderValue = `Bearer ${tokenService.getToken()}`;
  const config = {
    headers: {
      common: {
        Authorization: authHeaderValue,
      },
    },
  };

  const axiosInstance = axios.create(config);

  // TODO: define BPMN failure vs BPMN error
  // TODO: define retry conditions
  const response = await axiosInstance.post(
    topicConfig.url ?? '',
    workflowRequest
  );

  if (response.status === StatusCodes.OK) {
    await taskService.complete(task);
  } else {
    await taskService.handleFailure(task, {
      errorMessage: `${task.id} failed. Business key: ${task.businessKey}`,
      errorDetails: response.statusText,
      retries: workerConfiguration.taskFailureRetryCount,
      retryTimeout: workerConfiguration.taskFailureRetryTimeout,
    });
  }
};
