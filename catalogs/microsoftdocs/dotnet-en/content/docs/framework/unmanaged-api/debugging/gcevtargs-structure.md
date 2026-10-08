---
description: "Learn more about: GcEvtArgs Structure"
title: "GcEvtArgs Structure"
ms.date: "07/01/2024"
api_name:
  - "GcEvtArgs"
api_location:
  - "mscordacwks.dll"
api_type:
  - "COM"
f1_keywords:
  - "GcEvtArgs"
helpviewer_keywords:
  - "GcEvtArgs structure [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# GcEvtArgs Structure

Describes a particular GC event which occurred.  Such notification is given via the `IXCLRDataExceptionNotification3::OnGcEvent` callback.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
struct GcEvtArgs
{
    GcEvt_t typ;

    union
    {
      int condemnedGeneration;
    }
};
```

## Members

| Member | Description |
| --- | --- |
| `typ` | Indicates the type of GC event. |
| `condemnedGeneration` | The condemned GC generation. |

Note that the `typ` member is an enumeration containing one of the following values:

| Member | Value | Description |
| --- | --- | --- |
| `GC_MARK_END` | 1 | Indicates the end of the mark phase of the GC. |

## Remarks

This structure lives inside the runtime and is not exposed through any headers or library files. To use it, define the structure as specified above.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging Structures](debugging-structures.md)
- [Debugging](index.md)
- [IXCLRDataExceptionNotification4 Interface](ixclrdataexceptionnotification4-interface.md)
- [IXCLRDataExceptionNotification3::OnGcEvent Method](ixclrdataexceptionnotification3-ongcevent-method.md)
