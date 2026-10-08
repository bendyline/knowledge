---
description: "Learn more about: IXCLRDataModule::EnumExtent Method"
title: "IXCLRDataModule::EnumExtent Method"
ms.date: "07/01/2024"
api.name:
  - "IXCLRDataModule::EnumExtent Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataModule::EnumExtent Method"
helpviewer.keywords:
  - "IXCLRDataModule::EnumExtent Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataModule::EnumExtent Method

Enumerates the memory regions associated with the module.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT EnumExtent(
    [in, out] CLRDATA_ENUM *handle,
    [out] CLRDATA_MODULE_EXTENT *extent
);
```

## Parameters

`handle`\
[in, out] A handle for enumerating the memory regions associated with the module.

`extent`\
[out] The enumerated memory region associated with the module.

## Remarks

The provided method is part of the `IXCLRDataModule` interface and corresponds to the 35th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [IXCLRDataModule Interface](ixclrdatamodule-interface.md)
- [IXCLRDataModule::StartEnumExtents Method](ixclrdatamodule-startenumextents-method.md)
- [IXCLRDataModule::EndEnumExtents Method](ixclrdatamodule-endenumextents-method.md)
- [CLRDATA_MODULE_EXTENT Structure](clrdata-module-extent-structure.md)
