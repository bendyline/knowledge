---
description: "Learn more about: IXCLRDataMethodInstance::GetILAddressMap Method"
title: "IXCLRDataMethodInstance::GetILAddressMap Method"
ms.date: "01/16/2019"
api.name:
  - "IXCLRDataMethodInstance::GetILAddressMap Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataMethodInstance::GetILAddressMap Method"
helpviewer.keywords:
  - "IXCLRDataMethodInstance::GetILAddressMap Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "cshung"
---
# IXCLRDataMethodInstance::GetILAddressMap Method

Gets the IL to address mapping information.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetILAddressMap(
    [in] ULONG32                                   mapLen,
    [out] ULONG32                                 *mapNeeded,
    [out, size_is(mapLen)] CLRDATA_IL_ADDRESS_MAP  maps[]
);
```

## Parameters

`mapLen`\
[in] The length of the provided maps array.

`mapNeeded`\
[out] The number of map entries that the method needs.

`maps`\
[out, size_is(mapLen)] The array for storing the map entries.

## Remarks

The provided method is part of the `IXCLRDataMethodInstance` interface and corresponds to the 15th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataMethodInstance Interface](ixclrdatamethodinstance-interface.md)
