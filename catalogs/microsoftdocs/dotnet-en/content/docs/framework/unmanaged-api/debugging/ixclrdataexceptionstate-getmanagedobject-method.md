---
description: "Learn more about: IXCLRDataExceptionState::GetManagedObject Method"
title: "IXCLRDataExceptionState::GetManagedObject Method"
ms.date: "07/03/2024"
api.name:
  - "IXCLRDataExceptionState::GetManagedObject Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataExceptionState::GetManagedObject Method"
helpviewer.keywords:
  - "IXCLRDataExceptionState::GetManagedObject Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataExceptionState::GetManagedObject Method

Gets the managed object representing the exception.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetManagedObject(
    [out] IXCLRDataValue **value
);
```

## Parameters

`value`\
[out] The managed object representing the exception.

## Remarks

The provided method is part of the `IXCLRDataExceptionState` interface and corresponds to the 6th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataTypeDefinition Interface](ixclrdataexceptionstate-interface.md)
- [IXCLRDataValue Interface](ixclrdatavalue-interface.md)
