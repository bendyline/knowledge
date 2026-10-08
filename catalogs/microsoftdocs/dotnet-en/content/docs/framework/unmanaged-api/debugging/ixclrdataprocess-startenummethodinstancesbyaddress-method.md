---
description: "Learn more about: IXCLRDataProcess::StartEnumMethodInstancesByAddress Method"
title: "IXCLRDataProcess::StartEnumMethodInstancesByAddress Method"
ms.date: "01/16/2019"
api.name:
  - "IXCLRDataProcess::StartEnumMethodInstancesByAddress Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataProcess::StartEnumMethodInstancesByAddress Method"
helpviewer.keywords:
  - "IXCLRDataProcess::StartEnumMethodInstancesByAddress Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "cshung"
---
# IXCLRDataProcess::StartEnumMethodInstancesByAddress Method

Provides a handle to enumerate the method instances of `AppDomain` starting at a given address.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT StartEnumMethodInstancesByAddress(
    [in] CLRDATA_ADDRESS     address,
    [in] IXCLRDataAppDomain *appDomain,
    [out] CLRDATA_ENUM      *handle
);
```

## Parameters

`address`\
[in] The address of the first method instance.

`appDomain`\
[in] The AppDomain of the method instances.

`handle`\
[out] A handle for enumerating the method instances.

## Remarks

The provided method is part of the `IXCLRDataProcess` interface and corresponds to the 28th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [CLRDataSourceType Enumeration](clrdatasourcetype-enumeration.md)
- [Debugging](index.md)
- [IXCLRDataProcess Interface](ixclrdataprocess-interface.md)
