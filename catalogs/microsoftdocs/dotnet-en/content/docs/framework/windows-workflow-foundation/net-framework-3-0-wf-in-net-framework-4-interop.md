---
description: "Learn more about: Using .NET Framework 3.0 WF Activities in .NET Framework 4 with the Interop Activity"
title: "Using .NET Framework 3.0 WF Activities in .NET Framework 4 with the Interop Activity"
ms.date: "03/30/2017"
ms.assetid: 71f112ba-abb0-46f7-b05f-a5d2eb9d0c5c
---
# Using .NET Framework 3.0 WF Activities in .NET Framework 4 with the Interop Activity

The [System.Activities.Statements.Interop](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Interop) activity is a .NET Framework 4.6.1 (WF 4.5) activity that wraps a .NET Framework 3.5 (WF 3.5) activity within a .NET Framework 4.6.1 workflow. The WF 3 activity can be a single leaf activity or an entire tree of activities. The execution (including cancellation and exception handling) and the persistence of the .NET Framework 3.5 activity occur within the context of the .NET Framework 4.6.1 workflow instance that is executing.

> **Note:**
> The [System.Activities.Statements.Interop](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Interop) activity does not appear in the workflow designer toolbox unless the workflow's project has its **Target Framework** setting set to **.NET Framework 4.5**.

## Criteria for Using a WF 3 Activity with an Interop Activity

 For a WF 3 activity to successfully execute within an [System.Activities.Statements.Interop](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Interop) activity, the following criteria must be met:

- The WF 3 activity must derive from [System.Workflow.ComponentModel.Activity](https://learn.microsoft.com/search/?terms=System.Workflow.ComponentModel.Activity).

- The WF 3 activity must be declared as `public` and cannot be `abstract`.

- The WF 3 activity must have a public parameterless constructor.

- Due to limitations in the interface types that the [System.Activities.Statements.Interop](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Interop) activity can support, [System.Workflow.Activities.HandleExternalEventActivity](https://learn.microsoft.com/search/?terms=System.Workflow.Activities.HandleExternalEventActivity) and [System.Workflow.Activities.CallExternalMethodActivity](https://learn.microsoft.com/search/?terms=System.Workflow.Activities.CallExternalMethodActivity) cannot be used directly, but derivative activities created using the Workflow Communication Activity tool (WCA.exe) can be used. See [Windows Workflow Foundation Tools](https://learn.microsoft.com/previous-versions/dotnet/netframework-3.5/ms734408\(v=vs.90\)) for details.

## Configuring a WF 3 Activity Within an Interop Activity

 To configure and pass data into and out of a WF 3 activity, across the interoperation boundary, the WF 3 activity’s properties and metadata properties are exposed by the [System.Activities.Statements.Interop](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Interop) activity. The WF 3 activity’s metadata properties (such as [System.Workflow.ComponentModel.Activity.Name*](https://learn.microsoft.com/search/?terms=System.Workflow.ComponentModel.Activity.Name*)) are exposed through the [System.Activities.Statements.Interop.ActivityMetaProperties*](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Interop.ActivityMetaProperties*) collection. This is a collection of name-value pairs used to define the values for the WF 3 activity’s metadata properties. A metadata property is a property backed by dependency property for which the [System.Workflow.ComponentModel.DependencyPropertyOptions.Metadata](https://learn.microsoft.com/search/?terms=System.Workflow.ComponentModel.DependencyPropertyOptions.Metadata) flag is set.

 The WF 3 activity’s properties are exposed through the [System.Activities.Statements.Interop.ActivityProperties*](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Interop.ActivityProperties*) collection. This is a set of name-value pairs, where each value is a [System.Activities.Argument](https://learn.microsoft.com/search/?terms=System.Activities.Argument) object, used to define the arguments for the WF 3 activity’s properties. Because the direction of a WF 3 activity property cannot be inferred, every property is surfaced as an [System.Activities.InArgument](https://learn.microsoft.com/search/?terms=System.Activities.InArgument)/[System.Activities.OutArgument](https://learn.microsoft.com/search/?terms=System.Activities.OutArgument) pair. Depending on the activity’s usage of the property, you may want to provide an [System.Activities.InArgument](https://learn.microsoft.com/search/?terms=System.Activities.InArgument) entry, an [System.Activities.OutArgument](https://learn.microsoft.com/search/?terms=System.Activities.OutArgument) entry, or both. The expected name of the [System.Activities.InArgument](https://learn.microsoft.com/search/?terms=System.Activities.InArgument) entry in the collection is the name of the property as defined on the WF 3 activity. The expected name of the [System.Activities.OutArgument](https://learn.microsoft.com/search/?terms=System.Activities.OutArgument) entry in the collection is a concatenation of the name of the property and the string "Out".

## Limitations of Using a WF 3 Activity Within an Interop Activity

 The WF 3 system-provided activities cannot be directly wrapped in an [System.Activities.Statements.Interop](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Interop) activity. For some WF 3 activities, such as [System.Workflow.Activities.DelayActivity](https://learn.microsoft.com/search/?terms=System.Workflow.Activities.DelayActivity), this is because there is an analogous WF 4.5 activity. For others, this is because the functionality of the activity is not supported. Many WF 3 system-provided activities can be used within workflows wrapped by the [System.Activities.Statements.Interop](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Interop) activity, subject to the following restrictions:

1. [System.ServiceModel.Activities.Send](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Send) and [System.ServiceModel.Activities.Receive](https://learn.microsoft.com/search/?terms=System.ServiceModel.Activities.Receive) cannot be used in an [System.Activities.Statements.Interop](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Interop) activity.

2. [System.Workflow.Activities.WebServiceInputActivity](https://learn.microsoft.com/search/?terms=System.Workflow.Activities.WebServiceInputActivity), [System.Workflow.Activities.WebServiceOutputActivity](https://learn.microsoft.com/search/?terms=System.Workflow.Activities.WebServiceOutputActivity), and [System.Workflow.Activities.WebServiceFaultActivity](https://learn.microsoft.com/search/?terms=System.Workflow.Activities.WebServiceFaultActivity) cannot be used within an [System.Activities.Statements.Interop](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Interop) activity.

3. [System.Workflow.Activities.InvokeWorkflowActivity](https://learn.microsoft.com/search/?terms=System.Workflow.Activities.InvokeWorkflowActivity) cannot be used within an [System.Activities.Statements.Interop](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Interop) activity.

4. [System.Workflow.ComponentModel.SuspendActivity](https://learn.microsoft.com/search/?terms=System.Workflow.ComponentModel.SuspendActivity) cannot be used within an [System.Activities.Statements.Interop](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Interop) activity.

5. Compensation-related activities cannot be used within an [System.Activities.Statements.Interop](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Interop) activity.

 There are also some behavioral specifics to understand regarding the use of WF 3 activities within the [System.Activities.Statements.Interop](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Interop) activity:

1. WF 3 activities contained within an [System.Activities.Statements.Interop](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Interop) activity are initialized when the [System.Activities.Statements.Interop](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Interop) activity is executed. In WF 4.5 there is no initialization phase for a workflow instance prior to its execution.

2. The WF 4.5 runtime does not checkpoint workflow instance state when a transaction begins, regardless of where that transaction begins (within or outside of an [System.Activities.Statements.Interop](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Interop) activity).

3. WF 3 tracking records for activities within an [System.Activities.Statements.Interop](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Interop) activity are provided to WF 4.5 tracking participants as [System.Activities.Tracking.InteropTrackingRecord](https://learn.microsoft.com/search/?terms=System.Activities.Tracking.InteropTrackingRecord) objects. [System.Activities.Tracking.InteropTrackingRecord](https://learn.microsoft.com/search/?terms=System.Activities.Tracking.InteropTrackingRecord) is a derivative of [System.Activities.Tracking.CustomTrackingRecord](https://learn.microsoft.com/search/?terms=System.Activities.Tracking.CustomTrackingRecord).

4. A WF 3 custom activity can access data using workflow queues within the interoperation environment in exactly the same way as within the WF 3 workflow runtime. No custom activity code changes are required. On the host, data is enqueued to a WF 3 workflow queue by resuming a [System.Activities.Bookmark](https://learn.microsoft.com/search/?terms=System.Activities.Bookmark). The name of the bookmark is the string form of the [System.IComparable](https://learn.microsoft.com/search/?terms=System.IComparable) workflow queue name.
