---
description: "Learn more about: ISOSDacInterface::GetMethodDescData Method"
title: "ISOSDacInterface::GetMethodDescData Method"
ms.date: "01/16/2019"
api.name:
  - "ISOSDacInterface::GetMethodDescData Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "ISOSDacInterface::GetMethodDescData Method"
helpviewer.keywords:
  - "ISOSDacInterface::GetMethodDescData Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "cshung"
---
# ISOSDacInterface::GetMethodDescData Method

Gets the data for the given MethodDesc pointer.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetMethodDescData(
    CLRDATA_ADDRESS            methodDesc,
    CLRDATA_ADDRESS            ip,
    DacpMethodDescData *data,
    ULONG                      cRevertedRejitVersions,
    DacpReJitData      *rgRevertedRejitData,
    void                      *pcNeededRevertedRejitData
);
```

## Parameters

`methodDesc`\
[in] The address of the MethodDesc.

`ip`\
[in] The IP address of the method.

`data`\
[out] The data associated with the MethodDesc as returned from the internal APIs.

`cRevertedRejitVersions`\
[out] The number of reverted rejit versions.

`rgRevertedRejitData`\
[out] The data associated with the reverted rejit versions as returned from the internal APIs.

`pcNeededRevertedRejitData`\
[out] The number of bytes required to store the data associated with the reverted ReJit versions.

## Remarks

The provided method is part of the `ISOSDacInterface` interface and corresponds to the 21st slot of the virtual method table. To be able to use them, [`CLRDATA_ADDRESS`](../common-data-types-unmanaged-api-reference.md) must be defined as a 64-bit unsigned integer.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [ISOSDacInterface Interface](isosdacinterface-interface.md)
