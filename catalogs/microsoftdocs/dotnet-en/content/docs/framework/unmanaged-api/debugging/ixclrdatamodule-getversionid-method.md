---
description: "Learn more about: IXCLRDataModule::GetVersionId Method"
title: "IXCLRDataModule::GetVersionId Method"
ms.date: "01/16/2019"
api.name:
  - "IXCLRDataModule::GetVersionId Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataModule::GetVersionId Method"
helpviewer.keywords:
  - "IXCLRDataModule::GetVersionId Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "cshung"
---
# IXCLRDataModule::GetVersionId Method

Gets the module's version identifier.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetVersionId(
    [out] GUID* vid
);
```

## Parameters

`vid`\
[out] The module's version identifier.

## Remarks

The provided method is part of the `IXCLRDataModule` interface and corresponds to the 41st slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataModule Interface](ixclrdatamodule-interface.md)
