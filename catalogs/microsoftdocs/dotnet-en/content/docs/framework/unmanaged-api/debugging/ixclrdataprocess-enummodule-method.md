---
description: "Learn more about: IXCLRDataProcess::EnumModule Method"
title: "IXCLRDataProcess::EnumModule Method"
ms.date: "01/16/2019"
api.name:
  - "IXCLRDataProcess::EnumModule Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataProcess::EnumModule Method"
helpviewer.keywords:
  - "IXCLRDataProcess::EnumModule Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "cshung"
---
# IXCLRDataProcess::EnumModule Method

Enumerates the modules of this process.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT EnumModule(
    [in, out] CLRDATA_ENUM  *handle,
    [out] IXCLRDataModule  **mod
);
```

## Parameters

`handle`\
[in, out] A handle for enumerating the modules.

`mod`\
[out] The enumerated module.

## Remarks

The provided method is part of the `IXCLRDataProcess` interface and corresponds to the 25th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [CLRDataSourceType Enumeration](clrdatasourcetype-enumeration.md)
- [Debugging](index.md)
- [IXCLRDataModule Interface](ixclrdatamodule-interface.md)
- [IXCLRDataProcess Interface](ixclrdataprocess-interface.md)
