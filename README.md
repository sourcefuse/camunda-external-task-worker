# camunda-external-task-worker

Implementation based off of [camunda-external-task-client-js](https://github.com/camunda/camunda-external-task-client-js).

## Configuration

### Worker Configuration

| Name                       | Type     | Default | Description                                                  |
| -------------------------- | -------- | ------- | ------------------------------------------------------------ |
| CAMUNDA_REST_URL           | `string` |         | URL of Camunda REST API, i.e. http://localhost:8080/engine-rest or http://camunda:8080/engine-rest if inside of the `docker-compose` network. |
| WORKFLOW_SERVICE_BASE_URL  | `string` |         | Base URL for workflow-service. This will be moved to the handler configuration. |
| TASK_FAILURE_RETRY_COUNT   | `number` | 1       | Number of retries to perform if the task fails. Default is `1`. |
| TASK_FAILURE_RETRY_TIMEOUT | `number` | 1000    | Number of milliseconds to wait between retries. Default is `1000`. |



### Handler Configuration

## Examples

To run the examples packaged with the project, run

```sh
docker-compose up --build
```

You will eventually see output similar to this:

```
camunda-external-task-worker_1  | {
camunda-external-task-worker_1  |   activityId: 'rejectLoanRequest',
camunda-external-task-worker_1  |   activityInstanceId: 'rejectLoanRequest:e437fa76-d84c-11eb-a3d5-0242ac130002',
camunda-external-task-worker_1  |   errorMessage: null,
camunda-external-task-worker_1  |   errorDetails: null,
camunda-external-task-worker_1  |   executionId: 'e437fa75-d84c-11eb-a3d5-0242ac130002',
camunda-external-task-worker_1  |   id: 'e437fa77-d84c-11eb-a3d5-0242ac130002',
camunda-external-task-worker_1  |   lockExpirationTime: '2021-06-28T20:11:22.589+0000',
camunda-external-task-worker_1  |   processDefinitionId: 'loan_process:23:c859bc08-d84c-11eb-a3d5-0242ac130002',
camunda-external-task-worker_1  |   processDefinitionKey: 'loan_process',
camunda-external-task-worker_1  |   processDefinitionVersionTag: null,
camunda-external-task-worker_1  |   processInstanceId: 'e42b77f6-d84c-11eb-a3d5-0242ac130002',
camunda-external-task-worker_1  |   retries: null,
camunda-external-task-worker_1  |   suspended: false,
camunda-external-task-worker_1  |   workerId: 'some-random-id',
camunda-external-task-worker_1  |   topicName: 'requestRejecter',
camunda-external-task-worker_1  |   tenantId: null,
camunda-external-task-worker_1  |   variables: Variables {
camunda-external-task-worker_1  |     getTyped: [Function (anonymous)],
camunda-external-task-worker_1  |     get: [Function (anonymous)],
camunda-external-task-worker_1  |     getAll: [Function (anonymous)],
camunda-external-task-worker_1  |     getAllTyped: [Function (anonymous)],
camunda-external-task-worker_1  |     getDirtyVariables: [Function (anonymous)]
camunda-external-task-worker_1  |   },
camunda-external-task-worker_1  |   priority: 0,
camunda-external-task-worker_1  |   businessKey: null,
camunda-external-task-worker_1  |   extensionProperties: {}
camunda-external-task-worker_1  | }
camunda-external-task-worker_1  | {
camunda-external-task-worker_1  |   score: 4,
camunda-external-task-worker_1  |   nrOfActiveInstances: 5,
camunda-external-task-worker_1  |   bar: 2021-06-28T20:10:32.272Z,
camunda-external-task-worker_1  |   loopCounter: 3,
camunda-external-task-worker_1  |   defaultScore: 5,
camunda-external-task-worker_1  |   creditScores: [ 5, 9, 1, 4, 10 ],
camunda-external-task-worker_1  |   nrOfInstances: 5,
camunda-external-task-worker_1  |   nrOfCompletedInstances: 0
camunda-external-task-worker_1  | }
camunda-external-task-worker_1  | 2021-06-28T20:10:32.272Z
camunda-external-task-worker_1  | [ 5, 9, 1, 4, 10 ]

```

The examples log the `task` and `task.variables.getAll()` objects. To match the outputs to the BPMN, see below.

`activityId` - corresponds to the task ID set in Camunda modeler, or to the `id` attribute of the following BPMN XML.

```xml
      <bpmn:serviceTask id="rejectLoanRequest" name="Reject loan request" camunda:type="external" camunda:topic="requestRejecter">
        <bpmn:incoming>SequenceFlow_0vpum3q</bpmn:incoming>
        <bpmn:outgoing>SequenceFlow_1p8qb0a</bpmn:outgoing>
      </bpmn:serviceTask>
```

