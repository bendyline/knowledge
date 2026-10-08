---
description: "Learn more about: IXCLRDataProcess::EnumMethodInstanceByAddress Method"
title: "IXCLRDataProcess::EnumMethodInstanceByAddress Method"
ms.date: "01/16/2019"
api.name:
  - "IXCLRDataProcess::EnumMethodInstanceByAddress Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataProcess::EnumMethodInstanceByAddress Method"
helpviewer.keywords:
  - "IXCLRDataProcess::EnumMethodInstanceByAddress Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "cshung"
---
# IXCLRDataProcess::EnumMethodInstanceByAddress Method

Enumerates the method instances of this process starting at an address offset.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT EnumMethodInstanceByAddress(
    [in] CLRDATA_ENUM              *handle,
    [out] IXCLRDataMethodInstance **method
);
```

## Parameters

`handle`\
[in] A handle for enumerating the method instances.

`mod`\
[out] The enumerated method instance.

## Remarks

The provided method is part of the `IXCLRDataProcess` interface and corresponds to the 29th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [CLRDataSourceType Enumeration](clrdatasourcetype-enumeration.md)
- [Debugging](index.md)
- [IXCLRDataProcess Interface](ixclrdataprocess-interface.md)
