---
description: "Learn more about: ISOSDacInterface::GetWorkRequestData Method"
title: "ISOSDacInterface::GetWorkRequestData Method"
ms.date: "07/30/2026"
api.name:
  - "ISOSDacInterface::GetWorkRequestData Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "ISOSDacInterface::GetWorkRequestData Method"
helpviewer.keywords:
  - "ISOSDacInterface::GetWorkRequestData Method [.NET Framework debugging]"
topic_type:
  - "apiref"
ai-usage: ai-assisted
author: "leculver"
ms.author: "leculver"
---
# ISOSDacInterface::GetWorkRequestData Method

Retrieves data for the work request at the specified address.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetWorkRequestData(CLRDATA_ADDRESS addrWorkRequest, struct DacpWorkRequestData *data);
```

## Parameters

`addrWorkRequest`\
[in] The address of the work request to retrieve information for.

`data`\
[out] A pointer to a [DacpWorkRequestData structure](dacpworkrequestdata-structure.md) that receives the work request data.

## Remarks

The provided method is part of the `ISOSDacInterface` interface and corresponds to the 32nd slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [ISOSDacInterface Interface](isosdacinterface-interface.md)
- [DacpWorkRequestData Structure](dacpworkrequestdata-structure.md)
- [ISOSDacInterface::GetThreadpoolData Method](isosdacinterface-getthreadpooldata-method.md)
