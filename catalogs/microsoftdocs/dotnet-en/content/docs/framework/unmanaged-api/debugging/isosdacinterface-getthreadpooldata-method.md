---
description: "Learn more about: ISOSDacInterface::GetThreadpoolData Method"
title: "ISOSDacInterface::GetThreadpoolData Method"
ms.date: "07/30/2026"
api.name:
  - "ISOSDacInterface::GetThreadpoolData Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "ISOSDacInterface::GetThreadpoolData Method"
helpviewer.keywords:
  - "ISOSDacInterface::GetThreadpoolData Method [.NET Framework debugging]"
topic_type:
  - "apiref"
ai-usage: ai-assisted
author: "leculver"
ms.author: "leculver"
---
# ISOSDacInterface::GetThreadpoolData Method

Retrieves data for the runtime thread pool.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetThreadpoolData(struct DacpThreadpoolData *data);
```

## Parameters

`data`\
[out] A pointer to a [DacpThreadpoolData structure](dacpthreadpooldata-structure.md) that receives the thread pool data.

## Remarks

The provided method is part of the `ISOSDacInterface` interface and corresponds to the 31st slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [ISOSDacInterface Interface](isosdacinterface-interface.md)
- [DacpThreadpoolData Structure](dacpthreadpooldata-structure.md)
- [ISOSDacInterface::GetWorkRequestData Method](isosdacinterface-getworkrequestdata-method.md)
