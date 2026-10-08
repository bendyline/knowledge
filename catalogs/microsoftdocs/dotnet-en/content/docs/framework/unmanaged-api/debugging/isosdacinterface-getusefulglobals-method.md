---
description: "Learn more about: ISOSDacInterface::GetUsefulGlobals Method"
title: "ISOSDacInterface::GetUsefulGlobals Method"
ms.date: "07/30/2026"
api.name:
  - "ISOSDacInterface::GetUsefulGlobals Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "ISOSDacInterface::GetUsefulGlobals Method"
helpviewer.keywords:
  - "ISOSDacInterface::GetUsefulGlobals Method [.NET Framework debugging]"
topic_type:
  - "apiref"
ai-usage: ai-assisted
author: "leculver"
ms.author: "leculver"
---
# ISOSDacInterface::GetUsefulGlobals Method

Retrieves global runtime addresses that are commonly useful to diagnostic tools.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetUsefulGlobals(struct DacpUsefulGlobalsData *data);
```

## Parameters

`data`\
[out] A pointer to a [DacpUsefulGlobalsData structure](dacpusefulglobalsdata-structure.md) that receives the global runtime addresses.

## Remarks

The provided method is part of the `ISOSDacInterface` interface and corresponds to the 71st slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [ISOSDacInterface Interface](isosdacinterface-interface.md)
- [DacpUsefulGlobalsData Structure](dacpusefulglobalsdata-structure.md)
