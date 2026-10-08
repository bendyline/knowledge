---
description: "Learn more about: ISOSDacInterface::GetOOMData Method"
title: "ISOSDacInterface::GetOOMData Method"
ms.date: "07/30/2026"
api.name:
  - "ISOSDacInterface::GetOOMData Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "ISOSDacInterface::GetOOMData Method"
helpviewer.keywords:
  - "ISOSDacInterface::GetOOMData Method [.NET Framework debugging]"
topic_type:
  - "apiref"
ai-usage: ai-assisted
author: "leculver"
ms.author: "leculver"
---
# ISOSDacInterface::GetOOMData Method

Retrieves out-of-memory data for the specified garbage collection heap.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetOOMData(CLRDATA_ADDRESS oomAddr, struct DacpOomData *data);
```

## Parameters

`oomAddr`\
[in] The address of the out-of-memory data to retrieve.

`data`\
[out] A pointer to a [DacpOomData structure](dacpoomdata-structure.md) that receives the out-of-memory data.

## Remarks

The provided method is part of the `ISOSDacInterface` interface and corresponds to the 52nd slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [ISOSDacInterface Interface](isosdacinterface-interface.md)
- [DacpOomData Structure](dacpoomdata-structure.md)
- [ISOSDacInterface::GetOOMStaticData Method](isosdacinterface-getoomstaticdata-method.md)
