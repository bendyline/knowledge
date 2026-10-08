---
description: "Learn more about: IXCLRDataProcess::GetRuntimeNameByAddress Method"
title: "IXCLRDataProcess::GetRuntimeNameByAddress Method"
ms.date: "4/27/2020"
api.name:
  - "IXCLRDataProcess::GetRuntimeNameByAddress Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataProcess::GetRuntimeNameByAddress Method"
helpviewer.keywords:
  - "IXCLRDataProcess::GetRuntimeNameByAddress Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "tommcdon"
ms.author: "tommcdon"
---
# IXCLRDataProcess::GetRuntimeNameByAddress Method

Gets a name for the given address.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetRuntimeNameByAddress(
    [in] CLRDATA_ADDRESS address,
    [in] ULONG32 flags,
    [in] ULONG32 bufLen,
    [out] ULONG32 *nameLen,
    [out, size_is(bufLen)] WCHAR nameBuf[],
    [out] CLRDATA_ADDRESS* displacement
);
```

## Parameters

`address`\
[in] A `CLRDATA_ADDRESS` value that represents a code address.

`flags`\
[in] Set to '0'.

`bufLen`\
[in] The length of the buffer.

`namLen`\
[out] A pointer to the number of characters returned.

`namBuf`\
[out, size_is(`bufLen`)] The input buffer of length `bufLen` that stores the runtime name.

`displacement`\
[out] A `CLRDATA_ADDRESS` pointer to the code offset of the returned symbol.

## Remarks

The provided method is part of the `IXCLRDataProcess` interface and corresponds to the 16th slot of the virtual-method table.

> **Note:**
> If the buffer is not large enough for the name, this method returns `S_FALSE` and sets `nameLen` to the required buffer length.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md)\
**Header:** None\
**Library:** None\
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataProcess Interface](ixclrdataprocess-interface.md)
