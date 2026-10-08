---
title: "Windows Workflow Architecture"
description: Windows Workflow Foundation encapsulates units of work as activities, which run in an environment with flow control, exception handling, and other features.
ms.date: "03/30/2017"
ms.assetid: 1d4c6495-d64a-46d0-896a-3a01fac90aa9
---
# Windows Workflow Architecture

Windows Workflow Foundation (WF) raises the abstraction level for developing interactive long-running applications. Units of work are encapsulated as activities. Activities run in an environment that provides facilities for flow control, exception handling, fault propagation, persistence of state data, loading and unloading of in-progress workflows from memory, tracking, and transaction flow.

## Activity Architecture

 Activities are developed as CLR types that derive from either [System.Activities.Activity](https://learn.microsoft.com/search/?terms=System.Activities.Activity), [System.Activities.CodeActivity](https://learn.microsoft.com/search/?terms=System.Activities.CodeActivity), [System.Activities.AsyncCodeActivity](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivity), or [System.Activities.NativeActivity](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivity), or their variants that return a value, [System.Activities.Activity`1](https://learn.microsoft.com/search/?terms=System.Activities.Activity%601), [System.Activities.CodeActivity`1](https://learn.microsoft.com/search/?terms=System.Activities.CodeActivity%601), [System.Activities.AsyncCodeActivity`1](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivity%601), or [System.Activities.NativeActivity`1](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivity%601). Developing activities that derive from [System.Activities.Activity](https://learn.microsoft.com/search/?terms=System.Activities.Activity) allows the user to assemble pre-existing activities to quickly create units of work that execute in the workflow environment. [System.Activities.CodeActivity](https://learn.microsoft.com/search/?terms=System.Activities.CodeActivity), on the other hand, enables execution logic to be authored in managed code using [System.Activities.CodeActivityContext](https://learn.microsoft.com/search/?terms=System.Activities.CodeActivityContext) primarily for access to activity arguments. [System.Activities.AsyncCodeActivity](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivity) is similar to [System.Activities.CodeActivity](https://learn.microsoft.com/search/?terms=System.Activities.CodeActivity) except that it can be used to implement asynchronous tasks. Developing activities that derive from [System.Activities.NativeActivity](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivity) allows users to access the runtime through the [System.Activities.NativeActivityContext](https://learn.microsoft.com/search/?terms=System.Activities.NativeActivityContext) for functionality like scheduling children, creating bookmarks, invoking asynchronous work, registering transactions, and more.

 Authoring activities that derive from [System.Activities.Activity](https://learn.microsoft.com/search/?terms=System.Activities.Activity) is declarative and these activities can be authored in XAML. In the following example, an activity called `Prompt` is created using other activities for the execution body.

```xml
<Activity x:Class='Prompt'
  xmlns:x='http://schemas.microsoft.com/winfx/2006/xaml'
    xmlns:z='http://schemas.microsoft.com/netfx/2008/xaml/schema'
xmlns:my='clr-namespace:XAMLActivityDefinition;assembly=XAMLActivityDefinition'
xmlns:s="clr-namespace:System;assembly=mscorlib"
xmlns="http://schemas.microsoft.com/2009/workflow">
<z:SchemaType.Members>
  <z:SchemaType.SchemaProperty Name='Text' Type='InArgument(s:String)' />
  <z:SchemaType.SchemaProperty Name='Response' Type='OutArgument(s:String)' />
</z:SchemaType.Members>
  <Sequence>
    <my:WriteLine Text='[Text]' />
    <my:ReadLine BookmarkName='r1' Result='[Response]' />
  </Sequence>
</Activity>
```

## Activity Context

 The [System.Activities.ActivityContext](https://learn.microsoft.com/search/?terms=System.Activities.ActivityContext) is the activity author's interface to the workflow runtime and provides access to the runtime's wealth of features. In the following example, an activity is defined that uses the execution context to create a bookmark (the mechanism that allows an activity to register a continuation point in its execution that can be resumed by a host passing data into the activity).

 [CFX_WorkflowApplicationExample#15 (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_CFX/cfx_workflowapplicationexample/cs/program.cs#15)](../../../_code/samples/snippets/csharp/VS_Snippets_CFX/cfx_workflowapplicationexample/cs/program.cs.md)

## Activity Life Cycle

 An instance of an activity starts out in the [System.Activities.ActivityInstanceState.Executing](https://learn.microsoft.com/search/?terms=System.Activities.ActivityInstanceState.Executing) state. Unless exceptions are encountered, it remains in this state until all child activities are finished executing and any other pending work ([System.Activities.Bookmark](https://learn.microsoft.com/search/?terms=System.Activities.Bookmark) objects, for instance) is completed, at which point it transitions to the [System.Activities.ActivityInstanceState.Closed](https://learn.microsoft.com/search/?terms=System.Activities.ActivityInstanceState.Closed) state. The parent of an activity instance can request a child to cancel; if the child is able to be canceled it completes in the [System.Activities.ActivityInstanceState.Canceled](https://learn.microsoft.com/search/?terms=System.Activities.ActivityInstanceState.Canceled) state. If an exception is thrown during execution, the runtime puts the activity into the [System.Activities.ActivityInstanceState.Faulted](https://learn.microsoft.com/search/?terms=System.Activities.ActivityInstanceState.Faulted) state and propagates the exception up the parent chain of activities. The following are the three completion states of an activity:

- **Closed:** The activity has completed its work and exited.

- **Canceled:** The activity has gracefully abandoned its work and exited. Work is not explicitly rolled back when this state is entered.

- **Faulted:** The activity has encountered an error and has exited without completing its work.

 Activities remain in the [System.Activities.ActivityInstanceState.Executing](https://learn.microsoft.com/search/?terms=System.Activities.ActivityInstanceState.Executing) state when they are persisted or unloaded.
