---
description: "Learn more about: ISOSDacInterface::GetTLSIndex Method"
title: "ISOSDacInterface::GetTLSIndex Method"
ms.date: "07/30/2026"
api.name:
  - "ISOSDacInterface::GetTLSIndex Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "ISOSDacInterface::GetTLSIndex Method"
helpviewer.keywords:
  - "ISOSDacInterface::GetTLSIndex Method [.NET Framework debugging]"
topic_type:
  - "apiref"
ai-usage: ai-assisted
author: "leculver"
ms.author: "leculver"
---
# ISOSDacInterface::GetTLSIndex Method

Retrieves the thread-local storage index used by the runtime.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetTLSIndex(unsigned long *pIndex);
```

## Parameters

`pIndex`\
[out] A pointer to the thread-local storage index used by the runtime.

## Remarks

The provided method is part of the `ISOSDacInterface` interface and corresponds to the 73rd slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [ISOSDacInterface Interface](isosdacinterface-interface.md)
