---
description: "Learn more about: IXCLRDataValue::GetArrayElement Method"
title: "IXCLRDataValue::GetArrayElement Method"
ms.date: "07/02/2024"
api.name:
  - "IXCLRDataValue::GetArrayElement Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataValue::GetArrayElement Method"
helpviewer.keywords:
  - "IXCLRDataValue::GetArrayElement Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataValue::GetArrayElement Method

Gets a value corresponding to a given element in an array.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetArrayElement(
    [in] ULONG32 numInd,
    [in, size_is(numInd)] LONG32 indicies[],
    [out] IXCLRDataValue **value
);
```

## Parameters

`numInd`\
[in] The number of indicies required to access the array element and contained in the `indicies` array.

`indicies`\
[in] The indicies required to access the array element.

`value`\
[out] The value of the given element in the array.

## Remarks

The provided method is part of the `IXCLRDataValue` interface and corresponds to the 25th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataValue Interface](ixclrdatavalue-interface.md)
- [IXCLRDataValue::GetArrayProperties Method](ixclrdatavalue-getarrayproperties-method.md)
