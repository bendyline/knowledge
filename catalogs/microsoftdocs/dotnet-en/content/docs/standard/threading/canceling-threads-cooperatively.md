---
description: "Learn more about: Canceling threads cooperatively"
title: "Canceling threads cooperatively"
ms.date: "03/30/2017"
dev_langs: 
  - "csharp"
  - "vb"
helpviewer_keywords: 
  - "threads, cancellation"
ms.assetid: d2d6d5fd-e263-4fa0-847b-2fc3e0d82337
---
# Canceling threads cooperatively

You can use a [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) to cancel threads, just as you can use them to cancel [System.Threading.Tasks.Task](https://learn.microsoft.com/search/?terms=System.Threading.Tasks.Task) objects or PLINQ queries. Although the [System.Threading.Thread](https://learn.microsoft.com/search/?terms=System.Threading.Thread) class does not offer built-in support for cancellation tokens, you can pass a token to a thread procedure by using the [System.Threading.Thread](https://learn.microsoft.com/search/?terms=System.Threading.Thread) constructor that takes a [System.Threading.ParameterizedThreadStart](https://learn.microsoft.com/search/?terms=System.Threading.ParameterizedThreadStart) delegate. The following example demonstrates how to do this.  
  
 [Cancellation#14 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/cancellation/cs/CooperativeThreads.cs#14)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/cancellation/cs/CooperativeThreads.cs.md)
 [Cancellation#14 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/cancellation/vb/CooperativeThreads.vb#14)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/cancellation/vb/CooperativeThreads.vb.md)  
  
## See also

- [Using Threads and Threading](using-threads-and-threading.md)
