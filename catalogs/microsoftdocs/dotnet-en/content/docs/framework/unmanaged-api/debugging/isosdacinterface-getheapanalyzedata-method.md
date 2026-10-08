---
description: "Learn more about: ISOSDacInterface::GetHeapAnalyzeData Method"
title: "ISOSDacInterface::GetHeapAnalyzeData Method"
ms.date: "07/30/2026"
api.name:
  - "ISOSDacInterface::GetHeapAnalyzeData Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "ISOSDacInterface::GetHeapAnalyzeData Method"
helpviewer.keywords:
  - "ISOSDacInterface::GetHeapAnalyzeData Method [.NET Framework debugging]"
topic_type:
  - "apiref"
ai-usage: ai-assisted
author: "leculver"
ms.author: "leculver"
---
# ISOSDacInterface::GetHeapAnalyzeData Method

Retrieves heap analysis data for the specified garbage collection heap.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetHeapAnalyzeData(CLRDATA_ADDRESS addr, struct  DacpGcHeapAnalyzeData *data);
```

## Parameters

`addr`\
[in] The address of the GC heap to retrieve analysis data for.

`data`\
[out] A pointer to a [DacpGcHeapAnalyzeData structure](dacpgcheapanalyzedata-structure.md) that receives the heap analysis data.

## Remarks

The provided method is part of the `ISOSDacInterface` interface and corresponds to the 54th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [ISOSDacInterface Interface](isosdacinterface-interface.md)
- [DacpGcHeapAnalyzeData Structure](dacpgcheapanalyzedata-structure.md)
- [ISOSDacInterface::GetHeapAnalyzeStaticData Method](isosdacinterface-getheapanalyzestaticdata-method.md)
