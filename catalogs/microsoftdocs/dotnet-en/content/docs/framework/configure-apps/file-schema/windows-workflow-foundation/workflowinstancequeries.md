---
description: "Learn more about: <workflowInstanceQueries>"
title: "<workflowInstanceQueries>"
ms.date: "03/30/2017"
ms.assetid: 4fe7ce85-cf9a-4dbf-a8f7-bc9b1fc2fe35
---
# `<workflowInstanceQueries>`

Represents a collection of configuration elements that track workflow instance life cycle changes such as a started or completed event.

For more information on tracking profile queries, see [Tracking Profiles](../../../windows-workflow-foundation/tracking-profiles.md)

[`<configuration>`](../configuration-element.md)\
&nbsp;&nbsp;[`<system.ServiceModel>`](system-servicemodel-of-workflow.md)\
&nbsp;&nbsp;&nbsp;&nbsp;[`<tracking>`](tracking.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[`<trackingProfile>`](trackingprofile.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[`<workflow>`](workflow.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`<workflowInstanceQueries>`

## Syntax

```xml
<tracking>
  <trackingProfile name="Name">
    <workflow>
      <workflowInstanceQueries>
        <workflowInstanceQuery>
          <states>
            <state name="Name"/>
          </states>
        </workflowInstanceQuery>
      </workflowInstanceQueries>
    </workflow>
  </trackingProfile>
</tracking>
```

## Attributes and Elements

The following sections describe attributes, child elements, and parent elements.

### Attributes

None.

### Child Elements

| Element | Description |
| --- | --- |
| [\<workflowInstanceQuery>](workflowinstancequery.md) | A query that is used to track workflow instance life cycle changes. |

### Parent Elements

| Element | Description |
| --- | --- |
| [\<workflow>](workflow.md) | A configuration element that contains all queries for a specific workflow identified by the `activityDefinitionId` property. |

## Remarks

The [System.Activities.Tracking.WorkflowInstanceQuery](https://learn.microsoft.com/search/?terms=System.Activities.Tracking.WorkflowInstanceQuery) is used to subscribe to the following [System.Activities.Tracking.TrackingRecord](https://learn.microsoft.com/search/?terms=System.Activities.Tracking.TrackingRecord) objects:

- [System.Activities.Tracking.WorkflowInstanceRecord](https://learn.microsoft.com/search/?terms=System.Activities.Tracking.WorkflowInstanceRecord)

- [System.Activities.Tracking.WorkflowInstanceAbortedRecord](https://learn.microsoft.com/search/?terms=System.Activities.Tracking.WorkflowInstanceAbortedRecord)

- [System.Activities.Tracking.WorkflowInstanceUnhandledExceptionRecord](https://learn.microsoft.com/search/?terms=System.Activities.Tracking.WorkflowInstanceUnhandledExceptionRecord)

- [System.Activities.Tracking.WorkflowInstanceTerminatedRecord](https://learn.microsoft.com/search/?terms=System.Activities.Tracking.WorkflowInstanceTerminatedRecord)

- [System.Activities.Tracking.WorkflowInstanceSuspendedRecord](https://learn.microsoft.com/search/?terms=System.Activities.Tracking.WorkflowInstanceSuspendedRecord)

## Example

The following configuration subscribes to workflow instance-level tracking records for the `Started` instance state using this query.

```xml
<workflowInstanceQueries>
    <workflowInstanceQuery>
      <states>
        <state name="Started"/>
      </states>
    </workflowInstanceQuery>
</workflowInstanceQueries>
```

## See also

- [System.ServiceModel.Activities.Tracking.Configuration.WorkflowInstanceQueryElementCollection](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Tracking.Configuration.WorkflowInstanceQueryElementCollection)
- [System.Activities.Tracking.WorkflowInstanceQuery](https://learn.microsoft.com/search/?terms=System.Activities.Tracking.WorkflowInstanceQuery)
- [Workflow Tracking and Tracing](../../../windows-workflow-foundation/workflow-tracking-and-tracing.md)
- [Tracking Profiles](../../../windows-workflow-foundation/tracking-profiles.md)
