---
description: "Learn more about: IXCLRDataMethodInstance::GetRepresentativeEntryAddress Method"
title: "IXCLRDataMethodInstance::GetRepresentativeEntryAddress Method"
ms.date: "02/01/2019"
api.name:
  - "IXCLRDataMethodInstance::GetRepresentativeEntryAddress"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataMethodInstance::GetRepresentativeEntryAddress"
helpviewer.keywords:
  - "IXCLRDataMethodInstance::GetRepresentativeEntryAddress Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "hoyosjs"
ms.author: "juhoyosa"
---
# IXCLRDataMethodInstance::GetRepresentativeEntryAddress Method

Gets the most representative entry point address for the native compilation of all the possible entry points for a method.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetRepresentativeEntryAddress(
    [out] CLRDATA_ADDRESS* addr
);
```

## Parameters

`addr`\
[out] The address of the most representative native entry point for the method.

## Remarks

The provided method is part of the [`IXCLRDataMethodInstance` interface](ixclrdatamethodinstance-interface.md) and corresponds to the 20th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [IXCLRDataMethodInstance Interface](ixclrdatamethodinstance-interface.md)
