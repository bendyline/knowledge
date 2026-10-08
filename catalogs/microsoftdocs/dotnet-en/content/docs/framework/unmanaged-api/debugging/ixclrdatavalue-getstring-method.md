---
description: "Learn more about: IXCLRDataValue::GetString Method"
title: "IXCLRDataValue::GetString Method"
ms.date: "07/03/2024"
api.name:
  - "IXCLRDataValue::GetString Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataValue::GetString Method"
helpviewer.keywords:
  - "IXCLRDataValue::GetString Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataValue::GetString Method

Gets the length and contents of a string value.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetString(
    [in] ULONG32 bufLen,
    [out] ULONG32 *strLen,
    [out, size_if(bufLen)] WCHAR str[]
);
```

## Parameters

`bufLen`\
[in] The length in characters of the `str` buffer.

`strLen`\
[out] The number of characters in the string content written to `str`.

`str`\
[out] The content of the string.

## Remarks

The provided method is part of the `IXCLRDataValue` interface and corresponds to the 23rd slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataValue Interface](ixclrdatavalue-interface.md)
