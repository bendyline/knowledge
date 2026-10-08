---
description: "Learn more about: IXCLRDataProcess::EndEnumMethodDefinitionsByAddress Method"
title: "IXCLRDataProcess::EndEnumMethodDefinitionsByAddress Method"
ms.date: "01/16/2019"
api.name:
  - "IXCLRDataProcess::EndEnumMethodDefinitionsByAddress Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataProcess::EndEnumMethodDefinitionsByAddress Method"
helpviewer.keywords:
  - "IXCLRDataProcess::EndEnumMethodDefinitionsByAddress Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "cshung"
---
# IXCLRDataProcess::EndEnumMethodDefinitionsByAddress Method

Releases the resources used by internal iterators used during definition enumeration.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT EndEnumMethodDefinitionsByAddress(
    [in] CLRDATA_ENUM handle
);
```

## Parameters

`handle`\
[out] A handle for enumerating the method definitions.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [CLRDataSourceType Enumeration](clrdatasourcetype-enumeration.md)
- [Debugging](index.md)
- [IXCLRDataProcess Interface](ixclrdataprocess-interface.md)
