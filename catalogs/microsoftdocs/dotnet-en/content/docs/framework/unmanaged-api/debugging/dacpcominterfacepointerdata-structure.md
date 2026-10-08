---
description: "Learn more about: DacpCOMInterfacePointerData Structure"
title: "DacpCOMInterfacePointerData Structure"
ms.date: "07/30/2026"
api.name:
  - "DacpCOMInterfacePointerData Structure"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "DacpCOMInterfacePointerData Structure"
helpviewer.keywords:
  - "DacpCOMInterfacePointerData Structure [.NET Framework debugging]"
topic_type:
  - "apiref"
ai-usage: ai-assisted
author: "leculver"
ms.author: "leculver"
---
# DacpCOMInterfacePointerData Structure

Defines a transport buffer for COM interface pointer information.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
struct DacpCOMInterfacePointerData : ZeroInit<DacpCOMInterfacePointerData>
{
    CLRDATA_ADDRESS methodTable;
    CLRDATA_ADDRESS interfacePtr;
    CLRDATA_ADDRESS comContext;
};
```

## Members

| Member | Description |
| --- | --- |
| `methodTable` | The address of the method table for the interface. |
| `interfacePtr` | The address of the COM interface pointer. |
| `comContext` | The address of the COM context associated with the interface pointer. |

## Remarks

This structure lives inside the runtime and is not exposed through any headers or library files. To use it, define the structure as specified above.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [Debugging Structures](debugging-structures.md)
