---
description: "Learn more about: ISOSDacInterface::GetThreadData Method"
title: "ISOSDacInterface::GetThreadData Method"
ms.date: "07/30/2026"
api.name:
  - "ISOSDacInterface::GetThreadData Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "ISOSDacInterface::GetThreadData Method"
helpviewer.keywords:
  - "ISOSDacInterface::GetThreadData Method [.NET Framework debugging]"
topic_type:
  - "apiref"
ai-usage: ai-assisted
author: "leculver"
ms.author: "leculver"
---
# ISOSDacInterface::GetThreadData Method

Retrieves data for the managed thread at the specified address.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetThreadData(CLRDATA_ADDRESS thread, struct DacpThreadData *data);
```

## Parameters

`thread`\
[in] The address of the thread to retrieve information for.

`data`\
[out] A pointer to a [DacpThreadData structure](dacpthreaddata-structure.md) that receives the thread data.

## Remarks

The provided method is part of the `ISOSDacInterface` interface and corresponds to the 18th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [ISOSDacInterface Interface](isosdacinterface-interface.md)
- [DacpThreadData Structure](dacpthreaddata-structure.md)
- [ISOSDacInterface::GetThreadStoreData Method](isosdacinterface-getthreadstoredata-method.md)
- [ISOSDacInterface::GetThreadFromThinlockID Method](isosdacinterface-getthreadfromthinlockid-method.md)
