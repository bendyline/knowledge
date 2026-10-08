---
description: "Learn more about: IXCLRDataValue::GetAssociatedValue Method"
title: "IXCLRDataValue::GetAssociatedValue Method"
ms.date: "07/02/2024"
api.name:
  - "IXCLRDataValue::GetAssociatedValue Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataValue::GetAssociatedValue Method"
helpviewer.keywords:
  - "IXCLRDataValue::GetAssociatedValue Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataValue::GetAssociatedValue Method

Gets the value implicitly associated with this value.  For pointers or reference values, this is the value pointed or referred to.  For boxed values, this is the contained value.  For other values, there is no associated value.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetAssociatedValue(
    [out] IXCLRDataValue **assocValue
);
```

## Parameters

`assocValue`\
[out] The value implicitly associated with this value.

## Remarks

The provided method is part of the `IXCLRDataValue` interface and corresponds to the 21st slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataValue Interface](ixclrdatavalue-interface.md)
- [IXCLRDataValue::GetAssociatedType Method](ixclrdatavalue-getassociatedtype-method.md)
