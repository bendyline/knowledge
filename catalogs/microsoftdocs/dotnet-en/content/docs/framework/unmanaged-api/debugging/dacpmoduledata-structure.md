---
description: "Learn more about: DacpModuleData Structure"
title: "DacpModuleData Structure"
ms.date: "02/01/2019"
api.name:
  - "DacpModuleData Structure"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "DacpModuleData Structure"
helpviewer.keywords:
  - "DacpModuleData Structure [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "hoyosjs"
ms.author: "juhoyosa"
---
# DacpModuleData Structure

Defines a transport buffer for a module's runtime information.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
struct DacpModuleData
{
    CLRDATA_ADDRESS Address;
    CLRDATA_ADDRESS File;
    CLRDATA_ADDRESS  ilBase;
    char payLoad[132];
};
```

## Members

| Member | Description |
| --- | --- |
| `Address` | Address of the module object. |
| `File` | A pointer to the portable executable (PE) file. |
| `ilBase` | The address of the loaded image's base. |
| `payLoad` | A payload buffer for additional module information used by the runtime. |

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
