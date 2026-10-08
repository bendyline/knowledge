---
description: "Learn more about: IXCLRDataStackWalk::GetFrameType Method"
title: "IXCLRDataStackWalk::GetFrameType Method"
ms.date: "07/03/2024"
api.name:
  - "IXCLRDataStackWalk::GetFrameType Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataStackWalk::GetFrameType Method"
helpviewer.keywords:
  - "IXCLRDataStackWalk::GetFrameType Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataSTackWalk::GetFrameType Method

Returns information about the type of the current frame.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetFrameType(
    [out] CLRDataSimpleFrameType *simpleType,
    [out] CLRDataDetailedFrameType *detailedType
);
```

## Parameters

`simpleType`\
The simple type of the current frame.

`detailedType`\
The detailed type of the current frame.

## Remarks

The provided method is part of the `IXCLRDataStackWalk` interface and corresponds to the 8th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [IXCLRDataStackWalk Interface](ixclrdatastackwalk-interface.md)
- [CLRDataSimpleFrameType Enumeration](clrdatasimpleframetype-enumeration.md)
- [CLRDataDetailedFrameType Enumeration](clrdatadetailedframetype-enumeration.md)
