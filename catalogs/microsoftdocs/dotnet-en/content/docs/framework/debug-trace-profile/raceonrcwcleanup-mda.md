---
title: "raceOnRCWCleanup MDA"
description: Review the raceOnRCWCleanup managed debugging assistant (MDA), which is activated if the RCW is in use on another thread or on the freeing thread stack in .NET.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "RCW"
  - "managed debugging assistants (MDAs), RCWs"
  - "race on RCW cleanup"
  - "MDAs (managed debugging assistants), RCWs"
  - "RaceOnRCWCleanup MDA"
  - "runtime callable wrappers"
ms.assetid: bee1e9b1-50a8-4c89-9cd9-7dd6b2458187
---
# raceOnRCWCleanup MDA

> **Note:**
> This article is specific to .NET Framework. It doesn't apply to newer implementations of .NET, including .NET 6 and later versions.


The `raceOnRCWCleanup` managed debugging assistant (MDA) is activated when the common language runtime (CLR) detects that a [Runtime Callable Wrapper](../../standard/native-interop/runtime-callable-wrapper.md) (RCW) is in use when a call to release it is made using a command such as the [System.Runtime.InteropServices.Marshal.ReleaseComObject*](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.Marshal.ReleaseComObject*) method.

## Symptoms

 Access violations or memory corruption during or after freeing an RCW using [System.Runtime.InteropServices.Marshal.ReleaseComObject*](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.Marshal.ReleaseComObject*) or a similar method.

## Cause

 The RCW is in use on another thread or on the freeing thread stack.  An RCW that is in use cannot be released.

## Resolution

 Do not free an RCW that could be in use either in the current or in other threads.

## Effect on the Runtime

 This MDA has no effect on the CLR.

## Output

 A message describing the error.

## Configuration

```xml
<mdaConfig>
  <assistants>
    <raceOnRCWCleanup/>
  </assistants>
</mdaConfig>
```

## See also

- [System.Runtime.InteropServices.MarshalAsAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.MarshalAsAttribute)
- [Diagnosing Errors with Managed Debugging Assistants](diagnosing-errors-with-managed-debugging-assistants.md)
- [Interop Marshaling](../../standard/native-interop/interop-marshalling.md)
