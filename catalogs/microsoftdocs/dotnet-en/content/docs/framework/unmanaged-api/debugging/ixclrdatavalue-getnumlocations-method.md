---
description: "Learn more about: IXCLRDataValue::GetNumLocations Method"
title: "IXCLRDataValue::GetNumLocations Method"
ms.date: "07/03/2024"
api.name:
  - "IXCLRDataValue::GetNumLocations Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataValue::GetNumLocations Method"
helpviewer.keywords:
  - "IXCLRDataValue::GetNumLocations Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataValue::GetNumLocations Method

Gets the number of locations the value's data is spread across.  Note that calling this method requires that the value be of revision 3 or higher.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetNumLocations(
    [out] ULONG32 *numLocs
);
```

## Parameters

`numLocs`\
[out] The number of locations that value's data is spread across.

## Remarks

The provided method is part of the `IXCLRDataValue` interface and corresponds to the 29th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataValue Interface](ixclrdatavalue-interface.md)
- [IXCLRDataValue::Request Method](ixclrdatavalue-request-method.md)
