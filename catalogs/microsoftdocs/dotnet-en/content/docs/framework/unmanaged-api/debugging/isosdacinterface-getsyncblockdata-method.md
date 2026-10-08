---
description: "Learn more about: ISOSDacInterface::GetSyncBlockData Method"
title: "ISOSDacInterface::GetSyncBlockData Method"
ms.date: "07/30/2026"
api.name:
  - "ISOSDacInterface::GetSyncBlockData Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "ISOSDacInterface::GetSyncBlockData Method"
helpviewer.keywords:
  - "ISOSDacInterface::GetSyncBlockData Method [.NET Framework debugging]"
topic_type:
  - "apiref"
ai-usage: ai-assisted
author: "leculver"
ms.author: "leculver"
---
# ISOSDacInterface::GetSyncBlockData Method

Retrieves data for the sync block with the specified number.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetSyncBlockData(unsigned int number, struct DacpSyncBlockData *data);
```

## Parameters

`number`\
[in] The sync block number to retrieve information for.

`data`\
[out] A pointer to a [DacpSyncBlockData structure](dacpsyncblockdata-structure.md) that receives the sync block data.

## Remarks

The provided method is part of the `ISOSDacInterface` interface and corresponds to the 60th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [ISOSDacInterface Interface](isosdacinterface-interface.md)
- [DacpSyncBlockData Structure](dacpsyncblockdata-structure.md)
- [ISOSDacInterface::GetSyncBlockCleanupData Method](isosdacinterface-getsyncblockcleanupdata-method.md)
