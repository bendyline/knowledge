---
description: "Learn more about: ISOSDacInterface::GetMethodTableForEEClass Method"
title: "ISOSDacInterface::GetMethodTableForEEClass Method"
ms.date: "07/30/2026"
api.name:
  - "ISOSDacInterface::GetMethodTableForEEClass Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "ISOSDacInterface::GetMethodTableForEEClass Method"
helpviewer.keywords:
  - "ISOSDacInterface::GetMethodTableForEEClass Method [.NET Framework debugging]"
topic_type:
  - "apiref"
ai-usage: ai-assisted
author: "leculver"
ms.author: "leculver"
---
# ISOSDacInterface::GetMethodTableForEEClass Method

Gets the method table address that corresponds to an EEClass address.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetMethodTableForEEClass(CLRDATA_ADDRESS eeClass, CLRDATA_ADDRESS *value);
```

## Parameters

`eeClass`\
[in] The address of the EEClass.

`value`\
[out] The method table address that corresponds to the EEClass.

## Remarks

The provided method is part of the `ISOSDacInterface` interface and corresponds to the 42nd slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [ISOSDacInterface Interface](isosdacinterface-interface.md)
- [ISOSDacInterface::GetMethodTableData Method](isosdacinterface-getmethodtabledata-method.md)
- [ISOSDacInterface::GetMethodTableSlot Method](isosdacinterface-getmethodtableslot-method.md)
- [ISOSDacInterface::GetMethodTableFieldData Method](isosdacinterface-getmethodtablefielddata-method.md)
- [ISOSDacInterface::GetFieldDescData Method](isosdacinterface-getfielddescdata-method.md)
