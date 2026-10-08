---
description: "Learn more about: ISOSDacInterface::GetGCHeapList Method"
title: "ISOSDacInterface::GetGCHeapList Method"
ms.date: "07/30/2026"
api.name:
  - "ISOSDacInterface::GetGCHeapList Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "ISOSDacInterface::GetGCHeapList Method"
helpviewer.keywords:
  - "ISOSDacInterface::GetGCHeapList Method [.NET Framework debugging]"
topic_type:
  - "apiref"
ai-usage: ai-assisted
author: "leculver"
ms.author: "leculver"
---
# ISOSDacInterface::GetGCHeapList Method

Retrieves the list of server garbage collection heap addresses.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetGCHeapList(unsigned int count, CLRDATA_ADDRESS heaps[], unsigned int *pNeeded);
```

## Parameters

`count`\
[in] The number of elements that the `heaps` array can hold.

`heaps`\
[out] An array of `CLRDATA_ADDRESS` values that receives the server GC heap addresses.

`pNeeded`\
[out] A pointer to the number of heap addresses required to contain the complete list.

## Remarks

This method applies to server GC, where the runtime can have multiple GC heaps.

The provided method is part of the `ISOSDacInterface` interface and corresponds to the 48th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [ISOSDacInterface Interface](isosdacinterface-interface.md)
- [ISOSDacInterface::GetGCHeapData Method](isosdacinterface-getgcheapdata-method.md)
- [ISOSDacInterface::GetGCHeapDetails Method](isosdacinterface-getgcheapdetails-method.md)
- [ISOSDacInterface::GetGCHeapStaticData Method](isosdacinterface-getgcheapstaticdata-method.md)
- [ISOSDacInterface::GetHeapSegmentData Method](isosdacinterface-getheapsegmentdata-method.md)
