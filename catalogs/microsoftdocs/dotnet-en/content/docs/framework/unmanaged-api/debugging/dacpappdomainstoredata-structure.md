---
description: "Learn more about: DacpAppDomainStoreData Structure"
title: "DacpAppDomainStoreData Structure"
ms.date: "07/30/2026"
api.name:
  - "DacpAppDomainStoreData Structure"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "DacpAppDomainStoreData Structure"
helpviewer.keywords:
  - "DacpAppDomainStoreData Structure [.NET Framework debugging]"
topic_type:
  - "apiref"
ai-usage: ai-assisted
author: "leculver"
ms.author: "leculver"
---
# DacpAppDomainStoreData Structure

Defines a transport buffer for runtime application domain store information.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
struct DacpAppDomainStoreData : ZeroInit<DacpAppDomainStoreData>
{
    CLRDATA_ADDRESS sharedDomain;
    CLRDATA_ADDRESS systemDomain;
    LONG DomainCount;

    HRESULT Request(ISOSDacInterface *sos)
    {
        return sos->GetAppDomainStoreData(this);
    }
};
```

## Members

| Member | Description |
| --- | --- |
| `sharedDomain` | The address of the shared domain. |
| `systemDomain` | The address of the system domain. |
| `DomainCount` | The number of application domains in the runtime. |
| `Request` | Populates the structure by calling `ISOSDacInterface::GetAppDomainStoreData`. |

## Remarks

This structure lives inside the runtime and is not exposed through any headers or library files. To use it, define the structure as specified above.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [Debugging Structures](debugging-structures.md)
