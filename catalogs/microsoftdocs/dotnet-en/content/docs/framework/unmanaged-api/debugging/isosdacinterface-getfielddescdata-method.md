---
description: "Learn more about: ISOSDacInterface::GetFieldDescData Method"
title: "ISOSDacInterface::GetFieldDescData Method"
ms.date: "07/30/2026"
api.name:
  - "ISOSDacInterface::GetFieldDescData Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "ISOSDacInterface::GetFieldDescData Method"
helpviewer.keywords:
  - "ISOSDacInterface::GetFieldDescData Method [.NET Framework debugging]"
topic_type:
  - "apiref"
ai-usage: ai-assisted
author: "leculver"
ms.author: "leculver"
---
# ISOSDacInterface::GetFieldDescData Method

Gets data for a FieldDesc address.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetFieldDescData(CLRDATA_ADDRESS fieldDesc, struct DacpFieldDescData *data);
```

## Parameters

`fieldDesc`\
[in] The address of the FieldDesc.

`data`\
[out] A pointer to a [DacpFieldDescData structure](dacpfielddescdata-structure.md) that receives the FieldDesc data.

## Remarks

The provided method is part of the `ISOSDacInterface` interface and corresponds to the 43rd slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [ISOSDacInterface Interface](isosdacinterface-interface.md)
- [DacpFieldDescData Structure](dacpfielddescdata-structure.md)
- [ISOSDacInterface::GetMethodTableData Method](isosdacinterface-getmethodtabledata-method.md)
- [ISOSDacInterface::GetMethodTableSlot Method](isosdacinterface-getmethodtableslot-method.md)
- [ISOSDacInterface::GetMethodTableFieldData Method](isosdacinterface-getmethodtablefielddata-method.md)
- [ISOSDacInterface::GetMethodTableForEEClass Method](isosdacinterface-getmethodtableforeeclass-method.md)
