---
title: "Control Flow Activities in WF"
description: This article summarizes the .NET Framework 4.6.1 activities for controlling flow of execution within a workflow.
ms.date: "03/30/2017"
ms.topic: "reference"
---
# Control Flow Activities in WF

The .NET Framework 4.6.1
 provides several activities for controlling flow of execution within a workflow. Some of these activities (such as `Switch` and `If`) implement flow control structures similar to those in programming environments such as Visual C#, while others (such as `Pick`) model new programming structures.

 Note that while activities such as the `Parallel` and `ParallelForEach` activities schedule multiple child activities for execution simultaneously, only a single thread is used for a workflow. Each child activity of these activities executes sequentially and successive activities do not execute until previous activities either complete or go idle. As a result, these activities are most useful for applications in which several potentially blocking activities must execute in an interleaved fashion. If none of the child activities of these activities go idle, a `Parallel` activity executes just like a `Sequence` activity, and a `ParallelForEach` activity executes just like a `ForEach` activity. If, however, asynchronous activities (such as activities that derive from [System.Activities.AsyncCodeActivity](https://learn.microsoft.com/search/?terms=System.Activities.AsyncCodeActivity)) or messaging activities are used, control will pass to the next branch while the child activity waits for its message to be received or its asynchronous work to be completed.

## Flow control activities

| Activity | Description |
| --- | --- |
| [System.Activities.Statements.DoWhile](https://learn.microsoft.com/search/?terms=System.Activities.Statements.DoWhile) | Executes the contained activities once and continues to do so while a condition is `true`. |
| [System.Activities.Statements.ForEach`1](https://learn.microsoft.com/search/?terms=System.Activities.Statements.ForEach%601) | Executes an embedded statement in sequence for each element in a collection. [System.Activities.Statements.ForEach`1](https://learn.microsoft.com/search/?terms=System.Activities.Statements.ForEach%601) is similar to the keyword `foreach`, but is implemented as an activity rather than a language statement. |
| [System.Activities.Statements.If](https://learn.microsoft.com/search/?terms=System.Activities.Statements.If) | Executes contained activities if a condition is `true`, and can execute activities contained in the [System.Activities.Statements.If.Else](https://learn.microsoft.com/search/?terms=System.Activities.Statements.If.Else) property if the condition is `false`. |
| [System.Activities.Statements.Parallel](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Parallel) | Executes contained activities in parallel. |
| [System.Activities.Statements.ParallelForEach`1](https://learn.microsoft.com/search/?terms=System.Activities.Statements.ParallelForEach%601) | Executes an embedded statement in parallel for each element in a collection. |
| [System.Activities.Statements.Pick](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Pick) | Provides event-based control flow modeling. |
| [System.Activities.Statements.PickBranch](https://learn.microsoft.com/search/?terms=System.Activities.Statements.PickBranch) | Represents a potential path of execution in a [System.Activities.Statements.Pick](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Pick) activity. |
| [System.Activities.Statements.Sequence](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Sequence) | Executes contained activities in sequence. |
| [System.Activities.Statements.Switch`1](https://learn.microsoft.com/search/?terms=System.Activities.Statements.Switch%601) | Selects one choice from a number of activities to execute, based on the value of a given expression. |
| [System.Activities.Statements.While](https://learn.microsoft.com/search/?terms=System.Activities.Statements.While) | Executes contained activities while a condition is `true`. |
