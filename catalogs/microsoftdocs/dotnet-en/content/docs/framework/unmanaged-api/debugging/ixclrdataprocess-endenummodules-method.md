---
description: "Learn more about: IXCLRDataProcess::EndEnumModules Method"
title: "IXCLRDataProcess::EndEnumModules Method"
ms.date: "01/16/2019"
api.name:
  - "IXCLRDataProcess::EndEnumModules Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataProcess::EndEnumModules Method"
helpviewer.keywords:
  - "IXCLRDataProcess::EndEnumModules Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "cshung"
---
# IXCLRDataProcess::EndEnumModules Method

Releases the resources used by internal iterators used during module enumeration.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT EndEnumModules(
    [in] CLRDATA_ENUM handle
);
```

## Parameters

`handle`\
[out] A handle for enumerating the modules.

## Remarks

The provided method is part of the `IXCLRDataProcess` interface and corresponds to the 26th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataProcess Interface](ixclrdataprocess-interface.md)
