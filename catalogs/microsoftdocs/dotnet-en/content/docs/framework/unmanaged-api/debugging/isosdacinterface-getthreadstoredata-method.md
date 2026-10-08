---
description: "Learn more about: ISOSDacInterface::GetThreadStoreData Method"
title: "ISOSDacInterface::GetThreadStoreData Method"
ms.date: "07/30/2026"
api.name:
  - "ISOSDacInterface::GetThreadStoreData Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "ISOSDacInterface::GetThreadStoreData Method"
helpviewer.keywords:
  - "ISOSDacInterface::GetThreadStoreData Method [.NET Framework debugging]"
topic_type:
  - "apiref"
ai-usage: ai-assisted
author: "leculver"
ms.author: "leculver"
---
# ISOSDacInterface::GetThreadStoreData Method

Retrieves data about the runtime thread store.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetThreadStoreData(struct DacpThreadStoreData *data);
```

## Parameters

`data`\
[out] A pointer to a [DacpThreadStoreData structure](dacpthreadstoredata-structure.md) that receives the thread store data.

## Remarks

The provided method is part of the `ISOSDacInterface` interface and corresponds to the 4th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [ISOSDacInterface Interface](isosdacinterface-interface.md)
- [DacpThreadStoreData Structure](dacpthreadstoredata-structure.md)
- [ISOSDacInterface::GetThreadData Method](isosdacinterface-getthreaddata-method.md)
- [ISOSDacInterface::GetThreadFromThinlockID Method](isosdacinterface-getthreadfromthinlockid-method.md)
