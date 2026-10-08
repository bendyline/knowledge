---
description: "Learn more about: IXCLRDataProcess::StartEnumMethodDefinitionsByAddress Method"
title: "IXCLRDataProcess::StartEnumMethodDefinitionsByAddress Method"
ms.date: "07/01/2024"
api.name:
  - "IXCLRDataProcess::StartEnumMethodDefinitionsByAddress Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataProcess::StartEnumMethodDefinitionsByAddress Method"
helpviewer.keywords:
  - "IXCLRDataProcess::StartEnumMethodDefinitionsByAddress Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataProcess::StartEnumMethodDefinitionsByAddress Method

Provides a handle to enumerate method definitions given an IL code address.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT StartEnumMethodDefinitionsByAddress(
    [in] CLRDATA_ADDRESS address,
    [out] CLRDATA_ENUM *handle
);
```

## Parameters

`address`\
[in] The IL code address for which to enumerate method definitions.

`handle`\
[out] A handle for enumerating the method definitions.

## Remarks

The provided method is part of the `IXCLRDataProcess` interface and corresponds to the 44th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [IXCLRDataProcess Interface](ixclrdataprocess-interface.md)
- [IXCLRDataProcess::EnumMethodDefinitionByAddress Method](ixclrdataprocess-enummethoddefinitionbyaddress-method.md)
- [IXCLRDataProcess::EndEnumMethodDefinitionsByAddress Method](ixclrdataprocess-endenummethoddefinitionsbyaddress-method.md)
