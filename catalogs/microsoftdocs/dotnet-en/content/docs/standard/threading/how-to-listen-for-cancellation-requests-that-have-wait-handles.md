---
description: "Learn more about: How to: Listen for Cancellation Requests That Have Wait Handles"
title: "How to: Listen for Cancellation Requests That Have Wait Handles"
ms.date: "03/30/2017"
dev_langs: 
  - "csharp"
  - "vb"
helpviewer_keywords: 
  - "cancellation, waiting with wait handles"
ms.assetid: 6e2aa49b-fc84-4bcf-962b-17db98b7edcb
---
# How to: Listen for Cancellation Requests That Have Wait Handles

If a method is blocked while it is waiting for an event to be signaled, it cannot check the value of the cancellation token and respond in a timely manner. The first example shows how to solve this problem when you are working with events such as [System.Threading.ManualResetEvent](https://learn.microsoft.com/search/?terms=System.Threading.ManualResetEvent) that do not natively support the unified cancellation framework. The second example shows a more streamlined approach that uses [System.Threading.ManualResetEventSlim](https://learn.microsoft.com/search/?terms=System.Threading.ManualResetEventSlim), which does support unified cancellation.  
  
> **Note:**
> When "Just My Code" is enabled, Visual Studio in some cases will break on the line that throws the exception and display an error message that says "exception not handled by user code." This error is benign. You can press F5 to continue from it, and see the exception-handling behavior that is demonstrated in the examples below. To prevent Visual Studio from breaking on the first error, just uncheck the "Just My Code" checkbox under **Tools, Options, Debugging, General**.  
  
## Example 1

 The following example uses a [System.Threading.ManualResetEvent](https://learn.microsoft.com/search/?terms=System.Threading.ManualResetEvent) to demonstrate how to unblock wait handles that do not support unified cancellation.  
  
 [Cancellation#9 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/cancellation/cs/cancellationex9.cs#9)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/cancellation/cs/cancellationex9.cs.md)
 [Cancellation#9 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/cancellation/vb/cancellationex9.vb#9)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/cancellation/vb/cancellationex9.vb.md)  
  
## Example 2  

 The following example uses a [System.Threading.ManualResetEventSlim](https://learn.microsoft.com/search/?terms=System.Threading.ManualResetEventSlim) to demonstrate how to unblock coordination primitives that do support unified cancellation. The same approach can be used with other lightweight coordination primitives, such as [System.Threading.Semaphore](https://learn.microsoft.com/search/?terms=System.Threading.Semaphore)`Slim` and [System.Threading.CountdownEvent](https://learn.microsoft.com/search/?terms=System.Threading.CountdownEvent).  
  
 [Cancellation#10 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/cancellation/cs/cancellationex10.cs#10)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/cancellation/cs/cancellationex10.cs.md)
 [Cancellation#10 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/cancellation/vb/cancellationex10.vb#10)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/cancellation/vb/cancellationex10.vb.md)  
  
## See also

- [Cancellation in Managed Threads](cancellation-in-managed-threads.md)
