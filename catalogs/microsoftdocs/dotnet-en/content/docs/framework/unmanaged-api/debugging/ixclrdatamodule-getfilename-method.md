---
description: "Learn more about: IXCLRDataModule::GetFileName Method"
title: "IXCLRDataModule::GetFileName Method"
ms.date: "07/01/2024"
api.name:
  - "IXCLRDataModule::GetFileName Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataModule::GetFileName Method"
helpviewer.keywords:
  - "IXCLRDataModule::GetFileName Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataModule::GetFileName Method

Gets the full path and filename of the module, if there is one.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetFileName(
    [in] ULONG32 bufLen,
    [out] ULONG32 *nameLen,
    [out, size_is(bufLen)] WCHAR name[]
);
```

## Parameters

`bufLen`\
[in] The number of characters in the `name` buffer.

`nameLen`\
[out] A pointer to the number of characters actually written into the `name` buffer

`name`\
A pointer to a character array

## Remarks

The provided method is part of the `IXCLRDataModule` interface and corresponds to the 31st slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [IXCLRDataModule Interface](ixclrdatamodule-interface.md)
