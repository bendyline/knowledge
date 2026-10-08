---
description: "Learn more about: IXCLRDataTypeInstance::GetName Method"
title: "IXCLRDataTypeInstance::GetName Method"
ms.date: "07/03/2024"
api.name:
  - "IXCLRDataTypeInstance::GetName Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataTypeInstance::GetName Method"
helpviewer.keywords:
  - "IXCLRDataTypeInstance::GetName Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataTypeInstance::GetName Method

Gets the fully qualified name of the type.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetName(
    [in] ULONG32 flags,
    [in] ULONG32 bufLen,
    [out] ULONG32 *nameLen,
    [out, size_is(bufLen)] WCHAR nameBuf[]
);
```

## Parameters

`flags`\
[in] Reserved.  Must be 0.

`bufLen`\
[in] The length in characters of the `nameBuf` buffer.

`nameLen`\
[out] The number of characters in the fully qualified name of the type written to the `nameBuf` buffer.

`nameBuf`\
[out] The fully qualified name of the type.

## Remarks

The provided method is part of the `IXCLRDataTypeInstance` interface and corresponds to the 17th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [IXCLRDataTypeInstance Interface](ixclrdatatypeinstance-interface.md)
