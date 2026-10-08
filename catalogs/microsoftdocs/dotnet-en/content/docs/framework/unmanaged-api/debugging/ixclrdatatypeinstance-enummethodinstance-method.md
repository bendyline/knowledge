---
description: "Learn more about: IXCLRDataTypeInstance::EnumMethodInstance Method"
title: "IXCLRDataTypeInstance::EnumMethodInstance Method"
ms.date: "07/03/2024"
api.name:
  - "IXCLRDataTypeInstance::EnumMethodInstance Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataTypeInstance::EnumMethodInstance Method"
helpviewer.keywords:
  - "IXCLRDataTypeInstance::EnumMethodInstance Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataTypeInstance::EnumMethodInstance Method

Enumerates method instances within the type.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT EnumMethodInstance(
    [in, out] CLRDATA_ENUM *handle,
    [out] IXCLRDataMethodInstance **method
);
```

## Parameters

`handle`\
[in, out] A handle for enumerating method instances within the type.

`method`\
[out] The enumerated method instance.

## Remarks

The provided method is part of the `IXCLRDataTypeInstance` interface and corresponds to the 5th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataTypeInstance Interface](ixclrdatatypeinstance-interface.md)
- [IXCLRDataMethodInstance Interface](ixclrdatamethodinstance-interface.md)
- [IXCLRDataTypeInstance::StartEnumMethodInstances Method](ixclrdatatypeinstance-startenummethodinstances-method.md)
- [IXCLRDataTypeInstance::EndEnumMethodInstances Method](ixclrdatatypeinstance-endenummethodinstances-method.md)
