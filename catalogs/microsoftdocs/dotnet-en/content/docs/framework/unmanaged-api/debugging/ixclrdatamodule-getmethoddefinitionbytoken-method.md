---
description: "Learn more about: IXCLRDataModule::GetMethodDefinitionByToken Method"
title: "IXCLRDataModule::GetMethodDefinitionByToken Method"
ms.date: "01/16/2019"
api.name:
  - "IXCLRDataModule::GetMethodDefinitionByToken Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataModule::GetMethodDefinitionByToken Method"
helpviewer.keywords:
  - "IXCLRDataModule::GetMethodDefinitionByToken Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "cshung"
---
# IXCLRDataModule::GetMethodDefinitionByToken Method

Gets the method definition corresponding to a given metadata token.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetMethodDefinitionByToken(
    [in] mdMethodDef token,
    [out] IXCLRDataMethodDefinition** methodDefinition
);
```

## Parameters

`token`\
[in] The method token.

`methodDefinition`\
[out] The method definition.

## Remarks

The provided method is part of the `IXCLRDataModule` interface and corresponds to the 26th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataModule Interface](ixclrdatamodule-interface.md)
