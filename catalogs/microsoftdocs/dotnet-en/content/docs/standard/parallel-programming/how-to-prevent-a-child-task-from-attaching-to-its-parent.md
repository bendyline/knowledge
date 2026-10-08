---
description: "Learn more about: How to: Prevent a Child Task from Attaching to its Parent"
title: "How to: Prevent a Child Task from Attaching to its Parent"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "tasks, preventing attachments"
ms.assetid: c0fb85d4-9e80-4905-9f65-29acc54201c4
---
# How to: Prevent a Child Task from Attaching to its Parent

This document demonstrates how to prevent a child task from attaching to the parent task. Preventing a child task from attaching to its parent is useful when you call a component that is written by a third party and that also uses tasks. For example, a third-party component that uses the [System.Threading.Tasks.TaskCreationOptions.AttachedToParent](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCreationOptions.AttachedToParent) option to create a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) or [System.Threading.Tasks.Task`1](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task%601) object can cause problems in your code if it is long-running or throws an unhandled exception.

## Example

 The following example compares the effects of using the default options to the effects of preventing a child task from attaching to the parent. The example creates a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) object that calls into a third-party library that also uses a [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) object. The third-party library uses the [System.Threading.Tasks.TaskCreationOptions.AttachedToParent](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCreationOptions.AttachedToParent) option to create the [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) object. The application uses the [System.Threading.Tasks.TaskCreationOptions.DenyChildAttach](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCreationOptions.DenyChildAttach) option to create the parent task. This option instructs the runtime to remove the [System.Threading.Tasks.TaskCreationOptions.AttachedToParent](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCreationOptions.AttachedToParent) specification in child tasks.

 [TPL_DenyChildAttach#1 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/tpl_denychildattach/cs/denychildattach.cs#1)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/tpl_denychildattach/cs/denychildattach.cs.md)
 [TPL_DenyChildAttach#1 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/tpl_denychildattach/vb/denychildattach.vb#1)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/tpl_denychildattach/vb/denychildattach.vb.md)

 Because a parent task does not finish until all child tasks finish, a long-running child task can cause the overall application to perform poorly. In this example, when the application uses the default options to create the parent task, the child task must finish before the parent task finishes. When the application uses the [System.Threading.Tasks.TaskCreationOptions.DenyChildAttach](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.TaskCreationOptions.DenyChildAttach) option, the child is not attached to the parent. Therefore, the application can perform additional work after the parent task finishes and before it must wait for the child task to finish.

## See also

- [Task-based Asynchronous Programming](task-based-asynchronous-programming.md)
