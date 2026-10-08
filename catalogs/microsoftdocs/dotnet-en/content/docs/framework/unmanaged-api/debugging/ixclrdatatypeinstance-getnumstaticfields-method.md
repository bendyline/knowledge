---
description: "Learn more about: IXCLRDataTypeInstance::GetNumStaticFields Method"
title: "IXCLRDataTypeInstance::GetNumStaticFields Method"
ms.date: "07/03/2024"
api.name:
  - "IXCLRDataTypeInstance::GetNumStaticFields Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataTypeInstance::GetNumStaticFields Method"
helpviewer.keywords:
  - "IXCLRDataTypeInstance::GetNumStaticFields Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataTypeInstance::GetNumStaticFields Method

Gets the number of static fields in the type.

NOTE: This method is obsolete.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetNumStaticFields(
    [out] ULONG32 *numFields
);
```

## Parameters

`numFields`\
[out] The number of static fields in the type.

## Remarks

The provided method is part of the `IXCLRDataTypeInstance` interface and corresponds to the 10th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [IXCLRDataTypeInstance Interface](ixclrdatatypeinstance-interface.md)
- [IXCLRDataTypeInstance::GetStaticFieldByIndex Method](ixclrdatatypeinstance-getstaticfieldbyindex-method.md)
