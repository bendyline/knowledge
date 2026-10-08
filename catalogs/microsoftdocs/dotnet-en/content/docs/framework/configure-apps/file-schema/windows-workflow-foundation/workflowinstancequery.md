---
description: "Learn more about: <workflowInstanceQuery>"
title: "<workflowInstanceQuery>"
ms.date: "03/30/2017"
ms.assetid: 9096e812-626a-409a-9eda-c31a60b84c55
---
# `<workflowInstanceQuery>`

Represents a query that tracks workflow instance life cycle changes such as a started or completed event.

 For more information on tracking profile queries, see [Tracking Profiles](../../../windows-workflow-foundation/tracking-profiles.md)

[`<configuration>`](../configuration-element.md)\
&nbsp;&nbsp;[`<system.ServiceModel>`](system-servicemodel-of-workflow.md)\
&nbsp;&nbsp;&nbsp;&nbsp;[`<tracking>`](tracking.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[`<trackingProfile>`](trackingprofile.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[`<workflow>`](workflow.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[`<workflowInstanceQueries>`](workflowinstancequeries.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`<workflowInstanceQuery>`

## Syntax

```xml
<tracking>
  <trackingProfile name="Name">
    <workflow>
      <workflowInstanceQueries>
        <workflowInstanceQuery>
          <states>
            <state name="Name" />
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
| [\<states>](states.md) | A collection of subscribed states from the tracked workflow instance when the tracking records are created. |

### Parent Elements

| Element | Description |
| --- | --- |
| [\<workflowInstanceQueries>](workflowinstancequeries.md) | Represents a collection of configuration elements that track workflow instance life cycle changes such as a started or completed event. |

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

- [System.ServiceModel.Activities.Tracking.Configuration.WorkflowInstanceQueryElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Tracking.Configuration.WorkflowInstanceQueryElement)
- [System.Activities.Tracking.WorkflowInstanceQuery](https://learn.microsoft.com/search/?terms=System.Activities.Tracking.WorkflowInstanceQuery)
- [Workflow Tracking and Tracing](../../../windows-workflow-foundation/workflow-tracking-and-tracing.md)
- [Tracking Profiles](../../../windows-workflow-foundation/tracking-profiles.md)
