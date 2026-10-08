---
description: "Learn more about: <add> of <services>"
title: "<add> of <services>"
ms.date: "03/30/2017"
ms.assetid: 6bdc4590-aa9c-4ec8-9345-879d780cd141
---
# `<add>` of `<services>`

Specifies settings for an instance of [System.Workflow.Runtime.WorkflowRuntime](https://learn.microsoft.com/search/?terms=System.Workflow.Runtime.WorkflowRuntime) for hosting workflow-based Windows Communication Foundation (WCF) services. This element is of type [System.Workflow.Runtime.Configuration.WorkflowRuntimeServiceElement](https://learn.microsoft.com/search/?terms=System.Workflow.Runtime.Configuration.WorkflowRuntimeServiceElement).

[`<configuration>`](../configuration-element.md)\
&nbsp;&nbsp;[`<system.serviceModel>`](system-servicemodel.md)\
&nbsp;&nbsp;&nbsp;&nbsp;[`<behaviors>`](behaviors.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[`<serviceBehaviors>`](servicebehaviors.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[`<behavior>`](behavior-of-servicebehaviors.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[`<workflowRuntime>`](workflowruntime.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[`<services>`](services-of-workflowruntime.md)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`<add>`

## Syntax

```xml
<workflowRuntime>
  <services>
    <add type="String" />
  </services>
</workflowRuntime>
```

## Attributes and Elements

 The following sections describe attributes, child elements, and parent elements.

### Attributes

| Attribute | Description |
| --- | --- |
| type | A string that specifies the assembly-qualified type name of the service to be initialized. The service specified must follow certain rules about the signatures of their constructors. See [System.Workflow.Runtime.Configuration.WorkflowRuntimeServiceElement](https://learn.microsoft.com/search/?terms=System.Workflow.Runtime.Configuration.WorkflowRuntimeServiceElement) for more information. |

### Child Elements

 None.

### Parent Elements

| Element | Description |
| --- | --- |
| [\<services>](services-of-workflowruntime.md) | A collection of services that will be added to the [System.Workflow.Runtime.WorkflowRuntime](https://learn.microsoft.com/search/?terms=System.Workflow.Runtime.WorkflowRuntime) engine. The elements are of type [System.Workflow.Runtime.Configuration.WorkflowRuntimeServiceElement](https://learn.microsoft.com/search/?terms=System.Workflow.Runtime.Configuration.WorkflowRuntimeServiceElement).  The services specified in the collection will be initialized by the workflow runtime engine and added to its services when the appropriate [System.Workflow.Runtime.WorkflowRuntime](https://learn.microsoft.com/search/?terms=System.Workflow.Runtime.WorkflowRuntime) constructor is called. Therefore, the services specified in the collection must follow certain rules about the signatures of their constructors. See [System.Workflow.Runtime.Configuration.WorkflowRuntimeServiceElement](https://learn.microsoft.com/search/?terms=System.Workflow.Runtime.Configuration.WorkflowRuntimeServiceElement) for more information. |

## Remarks

 The service specified in this element will be initialized by the workflow runtime engine and added to its services when the appropriate [System.Workflow.Runtime.WorkflowRuntime](https://learn.microsoft.com/search/?terms=System.Workflow.Runtime.WorkflowRuntime) constructor is called. Therefore, the service specified must follow certain rules about the signatures of their constructors. See [System.Workflow.Runtime.Configuration.WorkflowRuntimeServiceElement](https://learn.microsoft.com/search/?terms=System.Workflow.Runtime.Configuration.WorkflowRuntimeServiceElement) for more information.

## Example

```xml
<serviceBehaviors>
  <behavior name="ServiceBehavior">
    <workflowRuntime name="WorkflowServiceHostRuntime"
                     validateOnCreate="true"
                     enablePerformanceCounters="true">
      <services>
        <add type="NetFx.Checkin.Scenario.WorkflowServices.WorkflowBasedServices.Common.TestPersistenceService.FilePersistenceService, NetFx.Checkin.Scenario.WorkflowServices.WorkflowBasedServices.Common" />
      </services>
    </workflowRuntime>
  </behavior>
</serviceBehaviors>
```

## See also

- [System.ServiceModel.Configuration.WorkflowRuntimeElement](https://learn.microsoft.com/search/?terms=System.ServiceModel.Configuration.WorkflowRuntimeElement)
- [System.Workflow.Runtime.Configuration.WorkflowRuntimeServiceElement](https://learn.microsoft.com/search/?terms=System.Workflow.Runtime.Configuration.WorkflowRuntimeServiceElement)
- [System.Workflow.Runtime.WorkflowRuntime](https://learn.microsoft.com/search/?terms=System.Workflow.Runtime.WorkflowRuntime)
- [Workflow Configuration Files](https://learn.microsoft.com/previous-versions/dotnet/netframework-3.5/ms732240\(v=vs.90\))
