---
description: "Learn more about: IXCLRDataMethodInstance::GetAddressRangesByILOffset Method"
title: "IXCLRDataMethodInstance::GetAddressRangesByILOffset Method"
ms.date: "07/02/2024"
api.name:
  - "IXCLRDataMethodInstance::GetAddressRangesByILOffset Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataMethodInstance::GetAddressRangesByILOffset Method"
helpviewer.keywords:
  - "IXCLRDataMethodInstance::GetAddressRangesByILOffset Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataMethodInstance::GetAddressRangesByILOffset Method

Returns the native code address(es) which correspond to a given IL offset within the method.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetAddressRangesByILOffset(
    [in] ULONG32 ilOffset,
    [in] ULONG32 rangesLen,
    [out] ULONG32 *rangesNeeded,
    [out, size_is(rangesLen)] CLRDATA_ADDRESS_RANGE addressRanges[]
);
```

## Parameters

`ilOffset`\
[in] The IL offset within the method for which to retrieve native code address ranges.

`rangesLen`\
[in] The length of the `addressRanges` buffer.

`rangesNeeded`\
[out] Indicates how many address ranges corresponding to the given IL offset are returned.

`addressRanges`\
[out] The address ranges which correspond to the given IL offset within the method.

## Remarks

The provided method is part of the `IXCLRDataMethodInstance` interface and corresponds to the 14th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataMethodInstance Interface](ixclrdatamethodinstance-interface.md)
- [CLRDATA_ADDRESS_RANGE Structure](clrdata-address-range-structure.md)
