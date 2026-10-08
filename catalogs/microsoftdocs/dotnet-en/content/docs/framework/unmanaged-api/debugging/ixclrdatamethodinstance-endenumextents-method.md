---
description: "Learn more about: IXCLRDataMethodInstance::EndEnumExtents Method"
title: "IXCLRDataMethodInstance::EndEnumExtents Method"
ms.date: "07/02/2024"
api.name:
  - "IXCLRDataMethodInstance::EndEnumExtents Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataMethodInstance::EndEnumExtnets Method"
helpviewer.keywords:
  - "IXCLRDataMethodInstance::EndEnumExtents Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataMethodInstance::EndEnumExtents Method

Releases the resources used by internal iterators used during native code range enumeration.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT EndEnumExtents(
    [in] CLRDATA_ENUM handle
);
```

## Parameters

`handle`\
[in] A handle for enumerating the native code regions.

## Remarks

The provided method is part of the `IXCLRDataMethodInstance` interface and corresponds to the 18th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [IXCLRDataMethodInstance Interface](ixclrdatamethodinstance-interface.md)
- [IXCLRDataMethodInstance::StartEnumExtents Method](ixclrdatamethodinstance-startenumextents-method.md)
- [IXCLRDataMethodInstance::EnumExtent Method](ixclrdatamethodinstance-enumextent-method.md)
- [CLRDATA_ADDRESS_RANGE Structure](clrdata-address-range-structure.md)
