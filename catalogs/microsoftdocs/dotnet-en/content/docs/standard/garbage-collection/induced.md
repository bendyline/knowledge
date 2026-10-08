---
description: "Learn more about: Induced Collections"
title: "Induced Collections"
ms.date: "03/30/2017"
helpviewer_keywords:
  - "garbage collection, forced"
ms.assetid: 019008fe-4708-4e65-bebf-04fd9941e149
---
# Induced Collections

In most cases, the garbage collector can determine the best time to perform a collection, and you should let it run independently. There are rare situations when a forced collection might improve your application's performance. In these cases, you can induce garbage collection by using the [System.GC.Collect*](https://learn.microsoft.com/search/?terms=System.GC.Collect*) method to force a garbage collection.

 Use the [System.GC.Collect*](https://learn.microsoft.com/search/?terms=System.GC.Collect*) method when there is a significant reduction in the amount of memory being used at a specific point in your application's code. For example, if your application uses a complex dialog box that has several controls, calling [System.GC.Collect*](https://learn.microsoft.com/search/?terms=System.GC.Collect*) when the dialog box is closed could improve performance by immediately reclaiming the memory used by the dialog box. Be sure that your application is not inducing garbage collection too frequently, because that can decrease performance if the garbage collector is trying to reclaim objects at non-optimal times. You can supply a [System.GCCollectionMode.Optimized](https://learn.microsoft.com/search/?terms=System.GCCollectionMode.Optimized) enumeration value to the [System.GC.Collect*](https://learn.microsoft.com/search/?terms=System.GC.Collect*) method to collect only when collection would be productive, as discussed in the next section.

## GC collection mode

 You can use one of the [System.GC.Collect*](https://learn.microsoft.com/search/?terms=System.GC.Collect*) method overloads that includes a [System.GCCollectionMode](https://learn.microsoft.com/search/?terms=System.GCCollectionMode) value to specify the behavior for a forced collection as follows.

| `GCCollectionMode` value | Description |
| --- | --- |
| [System.GCCollectionMode.Default](https://learn.microsoft.com/search/?terms=System.GCCollectionMode.Default) | Uses the default garbage collection setting for the running version of .NET. |
| [System.GCCollectionMode.Forced](https://learn.microsoft.com/search/?terms=System.GCCollectionMode.Forced) | Forces garbage collection to occur immediately. This is equivalent to calling the [System.GC.Collect](https://learn.microsoft.com/search/?terms=System.GC.Collect) overload. It results in a full blocking collection of all generations.<br /><br /> You can also compact the large object heap by setting the [System.Runtime.GCSettings.LargeObjectHeapCompactionMode](https://learn.microsoft.com/search/?terms=System.Runtime.GCSettings.LargeObjectHeapCompactionMode) property to [System.Runtime.GCLargeObjectHeapCompactionMode.CompactOnce](https://learn.microsoft.com/search/?terms=System.Runtime.GCLargeObjectHeapCompactionMode.CompactOnce) before forcing an immediate full blocking garbage collection. |
| [System.GCCollectionMode.Optimized](https://learn.microsoft.com/search/?terms=System.GCCollectionMode.Optimized) | Enables the garbage collector to determine whether the current time is optimal to reclaim objects.<br /><br /> The garbage collector could determine that a collection would not be productive enough to be justified, in which case it will return without reclaiming objects. |

## Background or blocking collections

 You can call the [System.GC.Collect%28System.Int32%2CSystem.GCCollectionMode%2CSystem.Boolean%29](https://learn.microsoft.com/search/?terms=System.GC.Collect%2528System.Int32%252CSystem.GCCollectionMode%252CSystem.Boolean%2529) method overload to specify whether an induced collection is blocking or not. The type of collection performed depends on a combination of the method's `mode` and `blocking` parameters. `mode` is a member of the [System.GCCollectionMode](https://learn.microsoft.com/search/?terms=System.GCCollectionMode) enumeration, and `blocking` is a [System.Boolean](https://learn.microsoft.com/search/?terms=System.Boolean) value. The following table summarizes the interaction of the `mode` and `blocking` arguments.

| `mode` | `blocking` = `true` | `blocking` = `false` |
| --- | --- | --- |
| [System.GCCollectionMode.Forced](https://learn.microsoft.com/search/?terms=System.GCCollectionMode.Forced) or [System.GCCollectionMode.Default](https://learn.microsoft.com/search/?terms=System.GCCollectionMode.Default) | A blocking collection is performed as soon as possible. If a background collection is in progress and generation is 0 or 1, the [System.GC.Collect%28System.Int32%2CSystem.GCCollectionMode%2CSystem.Boolean%29](https://learn.microsoft.com/search/?terms=System.GC.Collect%2528System.Int32%252CSystem.GCCollectionMode%252CSystem.Boolean%2529) method immediately triggers a blocking collection and returns when the collection is finished. If a background collection is in progress and the `generation` parameter is 2, the method waits until the background collection is finished, triggers a blocking generation 2 collection, and then returns. | A collection is performed as soon as possible. The [System.GC.Collect%28System.Int32%2CSystem.GCCollectionMode%2CSystem.Boolean%29](https://learn.microsoft.com/search/?terms=System.GC.Collect%2528System.Int32%252CSystem.GCCollectionMode%252CSystem.Boolean%2529) method requests a background collection, but this is not guaranteed; depending on the circumstances, a blocking collection may still be performed. If a background collection is already in progress, the method returns immediately. |
| [System.GCCollectionMode.Optimized](https://learn.microsoft.com/search/?terms=System.GCCollectionMode.Optimized) | A blocking collection may be performed, depending on the state of the garbage collector and the `generation` parameter. The garbage collector tries to provide optimal performance. | A collection may be performed, depending on the state of the garbage collector. The [System.GC.Collect%28System.Int32%2CSystem.GCCollectionMode%2CSystem.Boolean%29](https://learn.microsoft.com/search/?terms=System.GC.Collect%2528System.Int32%252CSystem.GCCollectionMode%252CSystem.Boolean%2529) method requests a background collection, but this is not guaranteed; depending on the circumstances, a blocking collection may still be performed. The garbage collector tries to provide optimal performance. If a background collection is already in progress, the method returns immediately. |

## See also

- [Latency Modes](latency.md)
- [Garbage Collection](index.md)
