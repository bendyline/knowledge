---
description: "Learn more about: ISOSDacInterface::GetObjectData Method"
title: "ISOSDacInterface::GetObjectData Method"
ms.date: "07/30/2026"
api.name:
  - "ISOSDacInterface::GetObjectData Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "ISOSDacInterface::GetObjectData Method"
helpviewer.keywords:
  - "ISOSDacInterface::GetObjectData Method [.NET Framework debugging]"
topic_type:
  - "apiref"
ai-usage: ai-assisted
author: "leculver"
ms.author: "leculver"
---
# ISOSDacInterface::GetObjectData Method

Retrieves data for the object at the specified address.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetObjectData(CLRDATA_ADDRESS objAddr, struct DacpObjectData *data);
```

## Parameters

`objAddr`\
[in] The address of the object to retrieve information for.

`data`\
[out] A pointer to a [DacpObjectData structure](dacpobjectdata-structure.md) that receives the object data.

## Remarks

The provided method is part of the `ISOSDacInterface` interface and corresponds to the 34th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [ISOSDacInterface Interface](isosdacinterface-interface.md)
- [DacpObjectData Structure](dacpobjectdata-structure.md)
- [DacpObjectType Enumeration](dacpobjecttype-enumeration.md)
