---
description: "Learn more about: ISOSDacInterface::GetCodeHeapList Method"
title: "ISOSDacInterface::GetCodeHeapList Method"
ms.date: "07/30/2026"
api.name:
  - "ISOSDacInterface::GetCodeHeapList Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "ISOSDacInterface::GetCodeHeapList Method"
helpviewer.keywords:
  - "ISOSDacInterface::GetCodeHeapList Method [.NET Framework debugging]"
topic_type:
  - "apiref"
ai-usage: ai-assisted
author: "leculver"
ms.author: "leculver"
---
# ISOSDacInterface::GetCodeHeapList Method

Retrieves the list of code heaps for the specified JIT manager.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetCodeHeapList(CLRDATA_ADDRESS jitManager, unsigned int count, struct DacpJitCodeHeapInfo *codeHeaps, unsigned int *pNeeded);
```

## Parameters

`jitManager`\
[in] The address of the JIT manager whose code heaps to retrieve.

`count`\
[in] The number of elements available in the `codeHeaps` array.

`codeHeaps`\
[out] A pointer to an array of [DacpJitCodeHeapInfo structures](dacpjitcodeheapinfo-structure.md) that receives the code heap data.

`pNeeded`\
[out] A pointer to the number of code heap entries required.

## Remarks

The provided method is part of the `ISOSDacInterface` interface and corresponds to the 69th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [ISOSDacInterface Interface](isosdacinterface-interface.md)
- [DacpJitCodeHeapInfo Structure](dacpjitcodeheapinfo-structure.md)
- [ISOSDacInterface::GetCodeHeaderData Method](isosdacinterface-getcodeheaderdata-method.md)
- [ISOSDacInterface::GetJitManagerList Method](isosdacinterface-getjitmanagerlist-method.md)
