---
description: "Learn more about: IXCLRDataModule::EnumMethodInstanceByName Method"
title: "IXCLRDataModule::EnumMethodInstanceByName Method"
ms.date: "07/01/2024"
api.name:
  - "IXCLRDataModule::EnumMethodInstanceByName Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataModule::EnumMethodInstanceByName Method"
helpviewer.keywords:
  - "IXCLRDataModule::EnumMethodInstanceByName Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataModule::EnumMethodInstanceByName Method

Enumerates method instances of a given name and AppDomain associated with the module.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT EnumMethodInstanceByName(
    [in, out] CLRDATA_ENUM *handle,
    [out] IXCLRDataMethodInstance **method
);
```

## Parameters

`handle`\
[in, out] A handle for enumerating method instances of a given name and AppDomain associated with the module.

`method`\
[out] The enumerated method instance.

## Remarks

The provided method is part of the `IXCLRDataModule` interface and corresponds to the 24th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataModule Interface](ixclrdatamodule-interface.md)
- [IXCLRDataMethodInstance Interface](ixclrdatamethodinstance-interface.md)
- [IXCLRDataModule::StartEnumMethodInstancesByName Method](ixclrdatamodule-startenummethodinstancesbyname-method.md)
- [IXCLRDataModule::EndEnumMethodInstancesByName Method](ixclrdatamodule-endenummethodinstancesbyname-method.md)
