---
description: "Learn more about: ISOSDacInterface::GetGCHeapData Method"
title: "ISOSDacInterface::GetGCHeapData Method"
ms.date: "07/30/2026"
api.name:
  - "ISOSDacInterface::GetGCHeapData Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "ISOSDacInterface::GetGCHeapData Method"
helpviewer.keywords:
  - "ISOSDacInterface::GetGCHeapData Method [.NET Framework debugging]"
topic_type:
  - "apiref"
ai-usage: ai-assisted
author: "leculver"
ms.author: "leculver"
---
# ISOSDacInterface::GetGCHeapData Method

Retrieves general information about the garbage-collected heap.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetGCHeapData(struct DacpGcHeapData *data);
```

## Parameters

`data`\
[out] A pointer to a [DacpGcHeapData structure](dacpgcheapdata-structure.md) that receives the GC heap data.

## Remarks

The provided method is part of the `ISOSDacInterface` interface and corresponds to the 47th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [ISOSDacInterface Interface](isosdacinterface-interface.md)
- [DacpGcHeapData Structure](dacpgcheapdata-structure.md)
- [ISOSDacInterface::GetGCHeapList Method](isosdacinterface-getgcheaplist-method.md)
- [ISOSDacInterface::GetGCHeapDetails Method](isosdacinterface-getgcheapdetails-method.md)
- [ISOSDacInterface::GetGCHeapStaticData Method](isosdacinterface-getgcheapstaticdata-method.md)
- [ISOSDacInterface::GetHeapSegmentData Method](isosdacinterface-getheapsegmentdata-method.md)
