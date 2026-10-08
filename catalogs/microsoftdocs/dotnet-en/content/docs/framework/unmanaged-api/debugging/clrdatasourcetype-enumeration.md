---
description: "Learn more about: CLRDataSourceType Enumeration"
title: "CLRDataSourceType Enumeration"
ms.date: "01/16/2019"
api.name:
  - "CLRDataSourceType Enumeration"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "CLRDataSourceType Enumeration"
helpviewer.keywords:
  - "CLRDataSourceType Enumeration [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "cshung"
---
# CLRDataSourceType Enumeration

Provides values that are used by the CLRDATA_IL_ADDRESS_MAP structure.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
typedef enum
{
    CLRDATA_SOURCE_TYPE_INVALID        = 0x00, // To indicate that nothing else applies
} CLRDataSourceType;
```

## Members

| Member | Description |
| --- | --- |
| `CLRDATA_SOURCE_TYPE_INVALID` | To indicate that nothing else applies |

## Remarks

This enumeration lives inside the runtime and is not exposed through any headers or library files. To use it, define an enumeration as defined above in your code. This is also aliased to `CLRDATA_ENUM` as mentioned in [Common Data Types](../common-data-types-unmanaged-api-reference.md).

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [Debugging Enumerations](debugging-enumerations.md)
