import { TopicConfigurationLoadMethod } from './topic-configuration';

export class WorkerConfiguration {
  workflowBaseUrl: string;
  camundaRestUrl: string;
  topicConfigurationLoadMethod: TopicConfigurationLoadMethod;
  taskFailureRetryCount: number;
  taskFailureRetryTimeout: number;

  constructor(
    workflowBaseUrl: string,
    camundaRestUrl: string,
    topicConfigurationLoadMethod: TopicConfigurationLoadMethod = TopicConfigurationLoadMethod.InMemory,
    taskFailureRetryCount: number = 1,
    taskFailureRetryTimeout: number = 1000
  ) {
    this.workflowBaseUrl = workflowBaseUrl;
    this.camundaRestUrl = camundaRestUrl;
    this.taskFailureRetryCount = taskFailureRetryCount;
    this.taskFailureRetryTimeout = taskFailureRetryTimeout;
    this.topicConfigurationLoadMethod = topicConfigurationLoadMethod;
  }
}
