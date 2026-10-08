---
description: "Learn more about: IXCLRDataValue::GetAssociatedType Method"
title: "IXCLRDataValue::GetAssociatedType Method"
ms.date: "07/03/2024"
api.name:
  - "IXCLRDataValue::GetAssociatedType Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataValue::GetAssociatedType Method"
helpviewer.keywords:
  - "IXCLRDataValue::GetAssociatedType Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataValue::GetAssociatedType Method

Gets the type implicitly associated with this value (and its associated value).  For pointers or reference values, this is the type pointed or referred to.  For boxed values, this is the type of the contained value.  For arrays, this is the element type.  For other values, there is no associated type.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetAssociatedType(
    [out] IXCLRDataTypeInstance **assocType
);
```

## Parameters

`assocType`\
[out] The type of the associated value.

## Remarks

The provided method is part of the `IXCLRDataValue` interface and corresponds to the 22nd slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataValue Interface](ixclrdatavalue-interface.md)
- [IXCLRDataTypeInstance Interface](ixclrdatatypeinstance-interface.md)
- [IXCLRDataValue::GetAssociatedValue Method](ixclrdatavalue-getassociatedvalue-method.md)
