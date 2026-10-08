---
description: "Learn more about: ISOSDacInterface::GetThreadFromThinlockID Method"
title: "ISOSDacInterface::GetThreadFromThinlockID Method"
ms.date: "07/30/2026"
api.name:
  - "ISOSDacInterface::GetThreadFromThinlockID Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "ISOSDacInterface::GetThreadFromThinlockID Method"
helpviewer.keywords:
  - "ISOSDacInterface::GetThreadFromThinlockID Method [.NET Framework debugging]"
topic_type:
  - "apiref"
ai-usage: ai-assisted
author: "leculver"
ms.author: "leculver"
---
# ISOSDacInterface::GetThreadFromThinlockID Method

Retrieves the managed thread address that corresponds to a thin-lock identifier.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetThreadFromThinlockID(UINT thinLockId, CLRDATA_ADDRESS *pThread);
```

## Parameters

`thinLockId`\
[in] The thin-lock identifier to resolve.

`pThread`\
[out] A pointer to a `CLRDATA_ADDRESS` value that receives the address of the thread.

## Remarks

The provided method is part of the `ISOSDacInterface` interface and corresponds to the 19th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [ISOSDacInterface Interface](isosdacinterface-interface.md)
- [ISOSDacInterface::GetThreadStoreData Method](isosdacinterface-getthreadstoredata-method.md)
- [ISOSDacInterface::GetThreadData Method](isosdacinterface-getthreaddata-method.md)
