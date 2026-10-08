---
description: "Learn more about: DacpReJitData Structure"
title: "DacpReJitData Structure"
ms.date: "02/01/2019"
api.name:
  - "DacpReJitData Structure"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "DacpReJitData Structure"
helpviewer.keywords:
  - "DacpReJitData Structure [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "hoyosjs"
ms.author: "juhoyosa"
---
# DacpReJitData Structure

Defines the basic information about a given profiler-instrumented method.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
struct MSLAYOUT DacpReJitData
{
    enum Flags
    {
        kUnknown,
        kRequested,
        kActive,
        kReverted,
    };

    CLRDATA_ADDRESS                 rejitID;
    Flags                           flags;
    CLRDATA_ADDRESS                 NativeCodeAddr;
};
```

## Members

| Member | Description |
| --- | --- |
| `rejitID` | The ReJit revision number for a method. |
| `flags` | A flag indicating the current state of the method's ReJit instrumentation for the given version. |
| `NativeCodeAddr` | The base address of the method's rejitted implementation. |

## Remarks

This structure lives inside the runtime and is not exposed through any headers or library files. To use it, define the structure as specified above. The structure must also be defined using `ms_struct` packing if not using the Microsoft compilers.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [Debugging Structures](debugging-structures.md)
