---
description: "Learn more about: How to: Use SpinWait to Implement a Two-Phase Wait Operation"
title: "How to: Use SpinWait to Implement a Two-Phase Wait Operation"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "SpinWait, how to synchronize two-phase wait"
ms.assetid: b2ac4e4a-051a-4f65-b4b9-f8e103aff195
---
# How to: Use SpinWait to Implement a Two-Phase Wait Operation

The following example shows how to use a [System.Threading.SpinWait](https://learn.microsoft.com/search/?terms=System.Threading.SpinWait) object to implement a two-phase wait operation. In the first phase, the synchronization object, a `Latch`, spins for a few cycles while it checks whether the lock has become available. In the second phase, if the lock becomes available, then the `Wait` method returns without using the [System.Threading.ManualResetEvent](https://learn.microsoft.com/search/?terms=System.Threading.ManualResetEvent) to perform its wait; otherwise, `Wait` performs the wait.

## Example

 This example shows a very basic implementation of a Latch synchronization primitive. You can use this data structure when wait times are expected to be very short. This example is for demonstration purposes only. If you require latch-type functionality in your program, consider using [System.Threading.ManualResetEventSlim](https://learn.microsoft.com/search/?terms=System.Threading.ManualResetEventSlim).

 [CDS_SpinWait#03 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/cds_spinwait/cs/spinwait03.cs#03)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/cds_spinwait/cs/spinwait03.cs.md)
 [CDS_SpinWait#03 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/cds_spinwait/vb/spinwait2.vb#03)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/cds_spinwait/vb/spinwait2.vb.md)

 The latch uses the [System.Threading.SpinWait](https://learn.microsoft.com/search/?terms=System.Threading.SpinWait) object to spin in place only until the next call to `SpinOnce` causes the [System.Threading.SpinWait](https://learn.microsoft.com/search/?terms=System.Threading.SpinWait) to yield the time slice of the thread. At that point, the latch causes its own context switch by calling [System.Threading.WaitHandle.WaitOne*](https://learn.microsoft.com/search/?terms=System.Threading.WaitHandle.WaitOne*) on the [System.Threading.ManualResetEvent](https://learn.microsoft.com/search/?terms=System.Threading.ManualResetEvent) and passing in the remainder of the time-out value.

 The logging output shows how often the Latch was able to increase performance by acquiring the lock without using the [System.Threading.ManualResetEvent](https://learn.microsoft.com/search/?terms=System.Threading.ManualResetEvent).

## See also

- [SpinWait](spinwait.md)
- [Threading Objects and Features](threading-objects-and-features.md)
