---
description: "Learn more about: IXCLRDataValue::GetType Method"
title: "IXCLRDataValue::GetType Method"
ms.date: "07/02/2024"
api.name:
  - "IXCLRDataValue::GetType Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataValue::GetType Method"
helpviewer.keywords:
  - "IXCLRDataValue::GetType Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataValue::GetType Method

Gets the type of the value.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetType(
    [out] IXCLRDataTypeInstance **typeInstance
);
```

## Parameters

`typeInstance`\
[out] The type of the value.

## Remarks

The provided method is part of the `IXCLRDataValue` interface and corresponds to the 9th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataValue Interface](ixclrdatavalue-interface.md)
- [IXCLRDataTypeInstance Interface](ixclrdatatypeinstance-interface.md)
