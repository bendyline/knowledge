---
description: "Learn more about: ISOSDacInterface::GetGCHeapStaticData Method"
title: "ISOSDacInterface::GetGCHeapStaticData Method"
ms.date: "07/30/2026"
api.name:
  - "ISOSDacInterface::GetGCHeapStaticData Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "ISOSDacInterface::GetGCHeapStaticData Method"
helpviewer.keywords:
  - "ISOSDacInterface::GetGCHeapStaticData Method [.NET Framework debugging]"
topic_type:
  - "apiref"
ai-usage: ai-assisted
author: "leculver"
ms.author: "leculver"
---
# ISOSDacInterface::GetGCHeapStaticData Method

Retrieves static garbage collection heap details.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetGCHeapStaticData(struct DacpGcHeapDetails *data);
```

## Parameters

`data`\
[out] A pointer to a [DacpGcHeapDetails structure](dacpgcheapdetails-structure.md) that receives the heap details.

## Remarks

The provided method is part of the `ISOSDacInterface` interface and corresponds to the 50th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [ISOSDacInterface Interface](isosdacinterface-interface.md)
- [DacpGcHeapDetails Structure](dacpgcheapdetails-structure.md)
- [ISOSDacInterface::GetGCHeapData Method](isosdacinterface-getgcheapdata-method.md)
- [ISOSDacInterface::GetGCHeapList Method](isosdacinterface-getgcheaplist-method.md)
- [ISOSDacInterface::GetGCHeapDetails Method](isosdacinterface-getgcheapdetails-method.md)
- [ISOSDacInterface::GetHeapSegmentData Method](isosdacinterface-getheapsegmentdata-method.md)
