---
description: "Learn more about: ISOSDacInterface::GetCCWData Method"
title: "ISOSDacInterface::GetCCWData Method"
ms.date: "07/30/2026"
api.name:
  - "ISOSDacInterface::GetCCWData Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "ISOSDacInterface::GetCCWData Method"
helpviewer.keywords:
  - "ISOSDacInterface::GetCCWData Method [.NET Framework debugging]"
topic_type:
  - "apiref"
ai-usage: ai-assisted
author: "leculver"
ms.author: "leculver"
---
# ISOSDacInterface::GetCCWData Method

Retrieves COM callable wrapper (CCW) data for a COM wrapper address.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetCCWData(CLRDATA_ADDRESS ccw, struct DacpCCWData *data);
```

## Parameters

`ccw`\
[in] The address of the CCW to retrieve information for.

`data`\
[out] A pointer to a [DacpCCWData structure](dacpccwdata-structure.md) that receives the CCW data.

## Remarks

The provided method is part of the `ISOSDacInterface` interface and corresponds to the 77th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [ISOSDacInterface Interface](isosdacinterface-interface.md)
- [DacpCCWData Structure](dacpccwdata-structure.md)
- [ISOSDacInterface::GetCCWInterfaces Method](isosdacinterface-getccwinterfaces-method.md)
