import { Handler } from 'camunda-external-task-client-js';

export interface TopicConfiguration {
  topicName: string;
  handlerFunction: Handler;
  url?: string;
}

export enum TopicConfigurationLoadMethod {
  InMemory = 'InMemory',
  FileSystemPath = 'FileSystemPath',
  EnvironmentVariable = 'EnvironmentVariable',
  S3 = 'S3',
}
