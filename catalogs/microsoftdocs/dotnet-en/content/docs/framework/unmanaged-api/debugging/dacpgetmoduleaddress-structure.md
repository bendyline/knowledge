---
description: "Learn more about: DacpGetModuleAddress Structure"
title: "DacpGetModuleAddress Structure"
ms.date: "01/16/2019"
api.name:
  - "DacpGetModuleAddress Structure"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "DacpGetModuleAddress Structure"
helpviewer.keywords:
  - "DacpGetModuleAddress Structure [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "cshung"
---
# DacpGetModuleAddress Structure

Defines the container for a module address request.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
struct DacpGetModuleAddress
{
    CLRDATA_ADDRESS ModulePtr;
};
```

## Members

| Member | Description |
| --- | --- |
| `ModulePtr` | The pointer to the module. |

## Methods

| Method | Description |
| --- | --- |
| [Request](dacpgetmoduleaddress-request-method.md) | Performs a request to populate the structure from the given runtime structure. |

## Remarks

This structure lives inside the runtime and is not exposed through any headers or library files. To use it, define the structure as specified above, where `CLRDATA_ADDRESS` is a 64-bit unsigned integer.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [Debugging Structures](debugging-structures.md)
