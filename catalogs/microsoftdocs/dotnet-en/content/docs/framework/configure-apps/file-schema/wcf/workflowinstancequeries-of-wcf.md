---
description: "Learn more about: <workflowInstanceQueries> of WCF"
title: "<workflowInstanceQueries> of WCF"
ms.date: "03/30/2017"
ms.assetid: b0852f77-16e4-4d55-8eb7-a19feb0e8fc4
---
# `<workflowInstanceQueries>` of WCF

Represents a collection of configuration elements that track workflow instance life cycle changes such as a started or completed event.

For more information on tracking profile queries, see [Tracking Profiles](../../../windows-workflow-foundation/tracking-profiles.md)

[`<configuration>`](../configuration-element.md)\
&nbsp;&nbsp;[`<system.serviceModel>`](system-servicemodel.md)\
&nbsp;&nbsp;&nbsp;&nbsp;[`<tracking>`](tracking-of-wcf.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`<profiles>`\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[`<trackingProfile>`](trackingprofile-of-wcf.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[`<workflow>`](workflow-of-wcf.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`<workflowInstanceQueries>`

## Syntax

```xml
<tracking>
  <profiles>
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
  </profiles>
</tracking>
```

## Attributes and elements

The following sections describe attributes, child elements, and parent elements.

### Attributes

None.

### Child elements

| Element | Description |
| --- | --- |
| [\<workflowInstanceQuery>](workflowinstancequery-of-wcf.md) | A query that is used to track workflow instance life cycle changes. |

### Parent elements

| Element | Description |
| --- | --- |
| [\<workflow>](../windows-workflow-foundation/workflow.md) | A configuration element that contains all queries for a specific workflow identified by the [activityDefinitionId](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Tracking.Configuration.ProfileWorkflowElement.ActivityDefinitionId) property. |

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
      <state name="Started" />
    </states>
  </workflowInstanceQuery>
</workflowInstanceQueries>
```

## See also

- [System.ServiceModel.Activities.Tracking.Configuration.WorkflowInstanceQueryElementCollection](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Tracking.Configuration.WorkflowInstanceQueryElementCollection)
- [System.Activities.Tracking.WorkflowInstanceQuery](https://learn.microsoft.com/search/?terms=System.Activities.Tracking.WorkflowInstanceQuery)
- [Workflow Tracking and Tracing](../../../windows-workflow-foundation/workflow-tracking-and-tracing.md)
- [Tracking Profiles](../../../windows-workflow-foundation/tracking-profiles.md)
