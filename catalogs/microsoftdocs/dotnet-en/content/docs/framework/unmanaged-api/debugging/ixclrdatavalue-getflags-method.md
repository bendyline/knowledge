---
description: "Learn more about: IXCLRDataValue::GetFlags Method"
title: "IXCLRDataValue::GetFlags Method"
ms.date: "07/03/2024"
api.name:
  - "IXCLRDataValue::GetFlags Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataValue::GetFlags Method"
helpviewer.keywords:
  - "IXCLRDataValue::GetFlags Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataValue::GetFlags Method

Gets state flags describing the value.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetFlags(
    [out] ULONG32 *flags
);
```

## Parameters

`flags`\
[out] The state flags describing the value.  These consist of one or more values defined in the `CLRDataValueFlag` enumeration.

## Remarks

The provided method is part of the `IXCLRDataValue` interface and corresponds to the 4th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataValue Interface](ixclrdatavalue-interface.md)
- [CLRDataValueFlag Enumeration](clrdatavalueflag-enumeration.md)
