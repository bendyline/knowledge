---
description: "Learn more about: ISOSDacInterface::GetCodeHeaderData Method"
title: "ISOSDacInterface::GetCodeHeaderData Method"
ms.date: "07/30/2026"
api.name:
  - "ISOSDacInterface::GetCodeHeaderData Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "ISOSDacInterface::GetCodeHeaderData Method"
helpviewer.keywords:
  - "ISOSDacInterface::GetCodeHeaderData Method [.NET Framework debugging]"
topic_type:
  - "apiref"
ai-usage: ai-assisted
author: "leculver"
ms.author: "leculver"
---
# ISOSDacInterface::GetCodeHeaderData Method

Retrieves code header data for the JIT-compiled method that contains the specified instruction pointer.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetCodeHeaderData(CLRDATA_ADDRESS ip, struct DacpCodeHeaderData *data);
```

## Parameters

`ip`\
[in] The instruction pointer for the code header to retrieve.

`data`\
[out] A pointer to a [DacpCodeHeaderData structure](dacpcodeheaderdata-structure.md) that receives the code header data.

## Remarks

The provided method is part of the `ISOSDacInterface` interface and corresponds to the 27th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [ISOSDacInterface Interface](isosdacinterface-interface.md)
- [DacpCodeHeaderData Structure](dacpcodeheaderdata-structure.md)
- [ISOSDacInterface::GetJitManagerList Method](isosdacinterface-getjitmanagerlist-method.md)
- [ISOSDacInterface::GetCodeHeapList Method](isosdacinterface-getcodeheaplist-method.md)
