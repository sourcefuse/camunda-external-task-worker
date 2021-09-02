import { dynamicHandler } from '../taskHandlers';
import { TopicConfigurationLoadMethod } from '../configuration';

const _loadInMemoryConfiguration = () => {
  return [
    {
      topicName: 'emailForm',
      handlerFunction: dynamicHandler('genericHandler'),
      url: 'http://workflow-service//workflows/taskCreated',
    },
    {
      topicName: 'verityOTPForm',
      handlerFunction: dynamicHandler('genericHandler'),
      url: 'http://workflow-service//workflows/taskCreated',
    },
    {
      topicName: 'registrationForm',
      handlerFunction: dynamicHandler('genericHandler'),
      url: 'http://workflow-service//workflows/taskCreated',
    },
  ];
};

export const getTopicConfigurations = (
  loadMethod: TopicConfigurationLoadMethod
) => {
  switch (loadMethod) {
    case TopicConfigurationLoadMethod.FileSystemPath:
    case TopicConfigurationLoadMethod.EnvironmentVariable:
    case TopicConfigurationLoadMethod.S3:
      return [];
    default:
      return _loadInMemoryConfiguration();
  }
};
