---
description: "Learn more about: ISOSDacInterface::GetILForModule Method"
title: "ISOSDacInterface::GetILForModule Method"
ms.date: "07/30/2026"
api.name:
  - "ISOSDacInterface::GetILForModule Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "ISOSDacInterface::GetILForModule Method"
helpviewer.keywords:
  - "ISOSDacInterface::GetILForModule Method [.NET Framework debugging]"
topic_type:
  - "apiref"
ai-usage: ai-assisted
author: "leculver"
ms.author: "leculver"
---
# ISOSDacInterface::GetILForModule Method

Gets the intermediate language (IL) address that corresponds to a relative virtual address in a module.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetILForModule(CLRDATA_ADDRESS moduleAddr, DWORD rva, CLRDATA_ADDRESS *il);
```

## Parameters

`moduleAddr`\
[in] The address of the module.

`rva`\
[in] The relative virtual address in the module.

`il`\
[out] The address of the IL for the specified module address and relative virtual address.

## Remarks

The provided method is part of the `ISOSDacInterface` interface and corresponds to the 17th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [ISOSDacInterface Interface](isosdacinterface-interface.md)
- [ISOSDacInterface::GetModule Method](isosdacinterface-getmodule-method.md)
- [ISOSDacInterface::GetModuleData Method](isosdacinterface-getmoduledata-method.md)
- [ISOSDacInterface::TraverseModuleMap Method](isosdacinterface-traversemodulemap-method.md)
