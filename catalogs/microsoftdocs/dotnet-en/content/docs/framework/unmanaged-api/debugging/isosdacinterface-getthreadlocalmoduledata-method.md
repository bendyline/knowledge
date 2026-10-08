---
description: "Learn more about: ISOSDacInterface::GetThreadLocalModuleData Method"
title: "ISOSDacInterface::GetThreadLocalModuleData Method"
ms.date: "07/30/2026"
api.name:
  - "ISOSDacInterface::GetThreadLocalModuleData Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "ISOSDacInterface::GetThreadLocalModuleData Method"
helpviewer.keywords:
  - "ISOSDacInterface::GetThreadLocalModuleData Method [.NET Framework debugging]"
topic_type:
  - "apiref"
ai-usage: ai-assisted
author: "leculver"
ms.author: "leculver"
---
# ISOSDacInterface::GetThreadLocalModuleData Method

Retrieves thread-local module data for the specified thread and module index.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetThreadLocalModuleData(CLRDATA_ADDRESS thread, unsigned int index, struct DacpThreadLocalModuleData *data);
```

## Parameters

`thread`\
[in] The address of the thread.

`index`\
[in] The module index.

`data`\
[out] A pointer to a [DacpThreadLocalModuleData structure](dacpthreadlocalmoduledata-structure.md) that receives the thread-local module data.

## Remarks

The provided method is part of the `ISOSDacInterface` interface and corresponds to the 59th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [ISOSDacInterface Interface](isosdacinterface-interface.md)
- [DacpThreadLocalModuleData Structure](dacpthreadlocalmoduledata-structure.md)
- [ISOSDacInterface::GetDomainLocalModuleData Method](isosdacinterface-getdomainlocalmoduledata-method.md)
- [ISOSDacInterface::GetDomainLocalModuleDataFromAppDomain Method](isosdacinterface-getdomainlocalmoduledatafromappdomain-method.md)
- [ISOSDacInterface::GetDomainLocalModuleDataFromModule Method](isosdacinterface-getdomainlocalmoduledatafrommodule-method.md)
