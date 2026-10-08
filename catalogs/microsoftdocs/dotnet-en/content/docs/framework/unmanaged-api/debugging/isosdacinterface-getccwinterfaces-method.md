---
description: "Learn more about: ISOSDacInterface::GetCCWInterfaces Method"
title: "ISOSDacInterface::GetCCWInterfaces Method"
ms.date: "07/30/2026"
api.name:
  - "ISOSDacInterface::GetCCWInterfaces Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "ISOSDacInterface::GetCCWInterfaces Method"
helpviewer.keywords:
  - "ISOSDacInterface::GetCCWInterfaces Method [.NET Framework debugging]"
topic_type:
  - "apiref"
ai-usage: ai-assisted
author: "leculver"
ms.author: "leculver"
---
# ISOSDacInterface::GetCCWInterfaces Method

Retrieves COM interface pointer data for a COM callable wrapper (CCW).

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetCCWInterfaces(CLRDATA_ADDRESS ccw, unsigned int count, struct DacpCOMInterfacePointerData *interfaces, unsigned int *pNeeded);
```

## Parameters

`ccw`\
[in] The address of the CCW to retrieve interface information for.

`count`\
[in] The number of elements that the `interfaces` array can hold.

`interfaces`\
[out] An array of [DacpCOMInterfacePointerData structures](dacpcominterfacepointerdata-structure.md) that receives interface pointer data.

`pNeeded`\
[out] A pointer to the number of interface pointer entries available.

## Remarks

The provided method is part of the `ISOSDacInterface` interface and corresponds to the 78th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [ISOSDacInterface Interface](isosdacinterface-interface.md)
- [DacpCOMInterfacePointerData Structure](dacpcominterfacepointerdata-structure.md)
- [ISOSDacInterface::GetCCWData Method](isosdacinterface-getccwdata-method.md)
