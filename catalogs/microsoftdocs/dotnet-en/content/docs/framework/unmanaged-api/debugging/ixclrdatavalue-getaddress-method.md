---
description: "Learn more about: IXCLRDataValue::GetAddress Method"
title: "IXCLRDataValue::GetAddress Method"
ms.date: "07/02/2024"
api.name:
  - "IXCLRDataValue::GetAddress Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataValue::GetAddress Method"
helpviewer.keywords:
  - "IXCLRDataValue::GetAddress Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataValue::GetAddress Method

Gets the address of the value.  This method will fail unless the value is contained in a single contiguous piece of data in memory.

NOTE: This method is obsolete.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetAddress(
    [out] CLRDATA_ADDRESS *address
);
```

## Parameters

`address`\
[out] The address of the value.

## Remarks

The provided method is part of the `IXCLRDataValue` interface and corresponds to the 5th slot of the virtual method table.  Note that CLRDATA_ADDRESS is a 64-bit unsigned integer.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataValue Interface](ixclrdatavalue-interface.md)
