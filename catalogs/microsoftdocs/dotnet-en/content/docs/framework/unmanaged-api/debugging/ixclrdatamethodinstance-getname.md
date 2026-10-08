---
description: "Learn more about: IXCLRDataMethodInstance::GetName Method"
title: "IXCLRDataMethodInstance::GetName Method"
ms.date: "07/02/2024"
api.name:
  - "IXCLRDataMethodInstance::GetName Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataMethodInstance::GetName Method"
helpviewer.keywords:
  - "IXCLRDataMethodInstance::GetName Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataMethodInstance::GetName Method

Gets the fully qualified name for this method instance.

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
[in] The length of the character buffer `nameBuf`.

`nameLen`\
[out] The number of characters in the name written to `nameBuf`.

`nameBuf`\
[out] A character array containing the fully qualified name of the method instance.

## Remarks

The provided method is part of the `IXCLRDataMethodInstance` interface and corresponds to the 7th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataMethodInstance Interface](ixclrdatamethodinstance-interface.md)
