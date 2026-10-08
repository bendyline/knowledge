---
description: "Learn more about: IXCLRDataProcess::Flush Method"
title: "IXCLRDataProcess::Flush Method"
ms.date: "07/30/2026"
api.name:
  - "IXCLRDataProcess::Flush Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataProcess::Flush Method"
helpviewer.keywords:
  - "IXCLRDataProcess::Flush Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "leculver"
ms.author: "leculver"
ai-usage: ai-assisted
---
# IXCLRDataProcess::Flush Method

Flushes cached data for the process.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT Flush();
```

## Parameters

None.

## Remarks

The provided method is part of the `IXCLRDataProcess` interface and corresponds to the 4th slot of the virtual method table.

All `ICLR*` interfaces obtained for this process become invalid after this method is called.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [IXCLRDataProcess Interface](ixclrdataprocess-interface.md)
