---
description: "Learn more about: IXCLRDataProcess::GetModuleByAddress Method"
title: "IXCLRDataProcess::GetModuleByAddress Method"
ms.date: "07/01/2024"
api.name:
  - "IXCLRDataProcess::GetModuleByAddress Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataProcess::GetModuleByAddress Method"
helpviewer.keywords:
  - "IXCLRDataProcess::GetModuleByAddress Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataProcess::GetModuleByAddress Method

Looks up a managed module by address.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetModuleByAddress(
    [in] CLRDATA_ADDRESS address,
    [out] IXCLRDataModule **module
);
```

## Parameters

`address`\
[in] The address for which to look up the associated module

`module`\
[out] The managed module at the given address

## Remarks

The provided method is part of the `IXCLRDataProcess` interface and corresponds to the 27th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [IXCLRDataProcess Interface](ixclrdataprocess-interface.md)
- [IXCLRDataModule Interface](ixclrdatamodule-interface.md)
