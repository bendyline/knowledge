---
description: "Learn more about: IXCLRDataModule::EnumEnumMethodInstancesByName Method"
title: "IXCLRDataModule::EndEnumMethodInstancesByName Method"
ms.date: "07/01/2024"
api.name:
  - "IXCLRDataModule::EndEnumMethodInstancesByName Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataModule::EndEnumMethodInstancesByName Method"
helpviewer.keywords:
  - "IXCLRDataModule::EndEnumMethodInstancesByName Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataModule::EndEnumMethodInstancesByName Method

Releases the resources used by internal iterators used during method instance enumeration.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT EndEnumMethodInstancesByName(
    [in] CLRDATA_ENUM handle
);
```

## Parameters

`handle`\
[in] A handle for enumerating the method instances of a given name and AppDomain associated with the module.

## Remarks

The provided method is part of the `IXCLRDataModule` interface and corresponds to the 25th slot of the virtual method table.

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
- [IXCLRDataModule::EnumMethodInstanceByName Method](ixclrdatamodule-enummethodinstancebyname-method.md)
