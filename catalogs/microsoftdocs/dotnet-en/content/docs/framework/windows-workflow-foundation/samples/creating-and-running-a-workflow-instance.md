---
description: "Learn more about: Creating and Running a Workflow Instance"
title: "Creating and Running a Workflow Instance"
ms.date: "03/30/2017"
ms.assetid: 19d27f47-0491-4569-8f53-51bc1d940e80
---
# Creating and Running a Workflow Instance

The [CreatingWorkflowInstances sample](https://github.com/dotnet/samples/tree/main/framework/windows-workflow-foundation/basic/Execution/CreatingWorkflowInstances/CS) shows how to run a workflow instance. It shows how to execute it synchronously and asynchronously.

## Demonstrates

[System.Activities.WorkflowInvoker](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowInvoker), [System.Activities.WorkflowApplication](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowApplication).

## Discussion

The first part of the sample uses [System.Activities.WorkflowInvoker.Invoke*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowInvoker.Invoke*). This is the most basic way to execute a workflow. Workflows executed with [System.Activities.WorkflowInvoker.Invoke*](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowInvoker.Invoke*) are executed synchronously.

The second part of the sample uses the [System.Activities.WorkflowApplication](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowApplication) class. [System.Activities.WorkflowApplication](https://learn.microsoft.com/search/?terms=System.Activities.WorkflowApplication) enables you to have more control over each instance, including the ability to interact with the running workflow and to run the workflow asynchronously.

## See also

- [Using WorkflowInvoker and WorkflowApplication](../using-workflowinvoker-and-workflowapplication.md)
