---
description: "Learn more about: IXCLRDataValue::GetArrayProperties Method"
title: "IXCLRDataValue::GetArrayProperties Method"
ms.date: "07/03/2024"
api.name:
  - "IXCLRDataValue::GetArrayProperties Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataValue::GetArrayProperties Method"
helpviewer.keywords:
  - "IXCLRDataValue::GetArrayProperties Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataValue::GetArrayProperties Method

Gets the definition of an array value.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetArrayProperties(
    [out] ULONG32 *rank,
    [out] ULONG32 *totalElements,
    [in] ULONG32 numDim,
    [out, size_is(numDim)] ULONG32 dims[],
    [in] ULONG32 numBases,
    [out, size_is(numBases)] LONG32 bases[]
);
```

## Parameters

`rank`\
[out] The rank (number of dimensions) of the array.

`totalElements`\
[out] The total number of elements in the array.

`numDim`\
[in] The size of the `dims` buffer.

`dims`\
[out] An array containing the size of each dimension of the array.

`numBases`\
[in] The size of the `bases` buffer.

`bases`\
[out] An array containing the base of each dimension of the array.

## Remarks

The provided method is part of the `IXCLRDataValue` interface and corresponds to the 24th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataValue Interface](ixclrdatavalue-interface.md)
- [IXCLRDataValue::GetArrayElement Method](ixclrdatavalue-getarrayelement-method.md)
