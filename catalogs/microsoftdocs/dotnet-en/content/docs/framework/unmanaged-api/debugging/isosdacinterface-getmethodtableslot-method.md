---
description: "Learn more about: ISOSDacInterface::GetMethodTableSlot Method"
title: "ISOSDacInterface::GetMethodTableSlot Method"
ms.date: "07/30/2026"
api.name:
  - "ISOSDacInterface::GetMethodTableSlot Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "ISOSDacInterface::GetMethodTableSlot Method"
helpviewer.keywords:
  - "ISOSDacInterface::GetMethodTableSlot Method [.NET Framework debugging]"
topic_type:
  - "apiref"
ai-usage: ai-assisted
author: "leculver"
ms.author: "leculver"
---
# ISOSDacInterface::GetMethodTableSlot Method

Gets the value of a slot in a method table.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetMethodTableSlot(CLRDATA_ADDRESS mt, unsigned int slot, CLRDATA_ADDRESS *value);
```

## Parameters

`mt`\
[in] The address of the method table.

`slot`\
[in] The method table slot index.

`value`\
[out] The value stored in the specified method table slot.

## Remarks

The provided method is part of the `ISOSDacInterface` interface and corresponds to the 39th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [ISOSDacInterface Interface](isosdacinterface-interface.md)
- [ISOSDacInterface::GetMethodTableData Method](isosdacinterface-getmethodtabledata-method.md)
- [ISOSDacInterface::GetMethodTableFieldData Method](isosdacinterface-getmethodtablefielddata-method.md)
- [ISOSDacInterface::GetMethodTableForEEClass Method](isosdacinterface-getmethodtableforeeclass-method.md)
- [ISOSDacInterface::GetFieldDescData Method](isosdacinterface-getfielddescdata-method.md)
