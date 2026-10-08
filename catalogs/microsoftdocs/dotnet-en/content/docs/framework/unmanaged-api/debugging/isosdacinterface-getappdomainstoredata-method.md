---
description: "Learn more about: ISOSDacInterface::GetAppDomainStoreData Method"
title: "ISOSDacInterface::GetAppDomainStoreData Method"
ms.date: "07/30/2026"
api.name:
  - "ISOSDacInterface::GetAppDomainStoreData Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "ISOSDacInterface::GetAppDomainStoreData Method"
helpviewer.keywords:
  - "ISOSDacInterface::GetAppDomainStoreData Method [.NET Framework debugging]"
topic_type:
  - "apiref"
ai-usage: ai-assisted
author: "leculver"
ms.author: "leculver"
---
# ISOSDacInterface::GetAppDomainStoreData Method

Retrieves data about the runtime application domain store.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetAppDomainStoreData(struct DacpAppDomainStoreData *data);
```

## Parameters

`data`\
[out] A pointer to a [DacpAppDomainStoreData structure](dacpappdomainstoredata-structure.md) that receives the application domain store data.

## Remarks

The provided method is part of the `ISOSDacInterface` interface and corresponds to the 5th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [ISOSDacInterface Interface](isosdacinterface-interface.md)
- [DacpAppDomainStoreData Structure](dacpappdomainstoredata-structure.md)
- [ISOSDacInterface::GetAppDomainList Method](isosdacinterface-getappdomainlist-method.md)
- [ISOSDacInterface::GetAppDomainData Method](isosdacinterface-getappdomaindata-method.md)
- [ISOSDacInterface::GetAssemblyData Method](isosdacinterface-getassemblydata-method.md)
