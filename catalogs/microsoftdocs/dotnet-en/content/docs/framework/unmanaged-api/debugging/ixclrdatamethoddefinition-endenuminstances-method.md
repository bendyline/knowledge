---
description: "Learn more about: IXCLRDataMethodDefinition::EndEnumInstances Method"
title: "IXCLRDataMethodDefinition::EndEnumInstances Method"
ms.date: "01/16/2019"
api.name:
  - "IXCLRDataMethodDefinition::EndEnumInstances Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataMethodDefinition::EndEnumInstances Method"
helpviewer.keywords:
  - "IXCLRDataMethodDefinition::EndEnumInstances Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "cshung"
---
# IXCLRDataMethodDefinition::EndEnumInstances Method

Releases the resources used by internal iterators used during instance enumeration.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT EndEnumInstances(
    [in] CLRDATA_ENUM handle
);
```

## Parameters

`handle`\
[out] A handle for enumerating the instances.

## Remarks

The provided method is part of the `IXCLRDataMethodDefinition` interface and corresponds to the 7th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataMethodDefinition Interface](ixclrdatamethoddefinition-interface.md)
