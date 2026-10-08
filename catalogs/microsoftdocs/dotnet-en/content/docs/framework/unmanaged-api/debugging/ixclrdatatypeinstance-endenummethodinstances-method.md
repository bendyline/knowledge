---
description: "Learn more about: IXCLRDataTypeInstance::EndEnumMethodInstances Method"
title: "IXCLRDataTypeInstance::EndEnumMethodInstances Method"
ms.date: "07/01/2024"
api.name:
  - "IXCLRDataTypeInstance::EndEnumMethodInstances Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataTypeInstance::EndEnumMethodInstances Method"
helpviewer.keywords:
  - "IXCLRDataTypeInstance::EndEnumMethodInstances Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataTypeInstance::EndEnumMethodInstances Method

Releases the resources used by internal iterators used during method instance enumeration.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT EndEnumMethodInstances(
    [in] CLRDATA_ENUM handle
);
```

## Parameters

`handle`\
[in] A handle for enumerating the method instances within the type.

## Remarks

The provided method is part of the `IXCLRDataTypeInstance` interface and corresponds to the 6th slot of the virtual method table.

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
- [IXCLRDataTypeInstance::EnumMethodInstance Method](ixclrdatatypeinstance-enummethodinstance-method.md)
