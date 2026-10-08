---
description: "Learn more about: ISOSDacInterface::GetDomainLocalModuleDataFromAppDomain Method"
title: "ISOSDacInterface::GetDomainLocalModuleDataFromAppDomain Method"
ms.date: "07/30/2026"
api.name:
  - "ISOSDacInterface::GetDomainLocalModuleDataFromAppDomain Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "ISOSDacInterface::GetDomainLocalModuleDataFromAppDomain Method"
helpviewer.keywords:
  - "ISOSDacInterface::GetDomainLocalModuleDataFromAppDomain Method [.NET Framework debugging]"
topic_type:
  - "apiref"
ai-usage: ai-assisted
author: "leculver"
ms.author: "leculver"
---
# ISOSDacInterface::GetDomainLocalModuleDataFromAppDomain Method

Retrieves domain-local module data for the specified application domain and module identifier.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetDomainLocalModuleDataFromAppDomain(CLRDATA_ADDRESS appDomainAddr, int moduleID, struct DacpDomainLocalModuleData *data);
```

## Parameters

`appDomainAddr`\
[in] The address of the application domain.

`moduleID`\
[in] The module identifier.

`data`\
[out] A pointer to a [DacpDomainLocalModuleData structure](dacpdomainlocalmoduledata-structure.md) that receives the domain-local module data.

## Remarks

The provided method is part of the `ISOSDacInterface` interface and corresponds to the 57th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [ISOSDacInterface Interface](isosdacinterface-interface.md)
- [DacpDomainLocalModuleData Structure](dacpdomainlocalmoduledata-structure.md)
- [ISOSDacInterface::GetDomainLocalModuleData Method](isosdacinterface-getdomainlocalmoduledata-method.md)
- [ISOSDacInterface::GetDomainLocalModuleDataFromModule Method](isosdacinterface-getdomainlocalmoduledatafrommodule-method.md)
- [ISOSDacInterface::GetThreadLocalModuleData Method](isosdacinterface-getthreadlocalmoduledata-method.md)
