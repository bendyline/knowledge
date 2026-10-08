---
description: "Learn more about: ISOSDacInterface::GetMethodDescPtrFromFrame Method"
title: "ISOSDacInterface::GetMethodDescPtrFromFrame Method"
ms.date: "07/30/2026"
api.name:
  - "ISOSDacInterface::GetMethodDescPtrFromFrame Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "ISOSDacInterface::GetMethodDescPtrFromFrame Method"
helpviewer.keywords:
  - "ISOSDacInterface::GetMethodDescPtrFromFrame Method [.NET Framework debugging]"
topic_type:
  - "apiref"
ai-usage: ai-assisted
author: "leculver"
ms.author: "leculver"
---
# ISOSDacInterface::GetMethodDescPtrFromFrame Method

Gets the MethodDesc pointer that corresponds to a frame address.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetMethodDescPtrFromFrame(CLRDATA_ADDRESS frameAddr, CLRDATA_ADDRESS * ppMD);
```

## Parameters

`frameAddr`\
[in] The address of the frame.

`ppMD`\
[out] The MethodDesc pointer that corresponds to the frame.

## Remarks

The provided method is part of the `ISOSDacInterface` interface and corresponds to the 24th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [ISOSDacInterface Interface](isosdacinterface-interface.md)
- [ISOSDacInterface::GetMethodDescData Method](isosdacinterface-getmethoddescdata-method.md)
- [ISOSDacInterface::GetMethodDescName Method](isosdacinterface-getmethoddescname-method.md)
- [ISOSDacInterface::GetMethodDescPtrFromIP Method](isosdacinterface-getmethoddescptrfromip-method.md)
- [ISOSDacInterface::GetMethodDescFromToken Method](isosdacinterface-getmethoddescfromtoken-method.md)
