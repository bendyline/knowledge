---
description: "Learn more about: IXCLRDataMethodDefinition::EndEnumExtents Method"
title: "IXCLRDataMethodDefinition::EndEnumExtents Method"
ms.date: "07/02/2024"
api.name:
  - "IXCLRDataMethodDefinition::EndEnumExtents Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataMethodDefinition::EndEnumExtnets Method"
helpviewer.keywords:
  - "IXCLRDataMethodDefinition::EndEnumExtents Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataMethodDefinition::EndEnumExtents Method

Releases the resources used by internal iterators used during IL code range enumeration.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT EndEnumExtents(
    [in] CLRDATA_ENUM handle
);
```

## Parameters

`handle`\
[in] A handle for enumerating the IL code regions.

## Remarks

The provided method is part of the `IXCLRDataMethodDefinition` interface and corresponds to the 15th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataMethodDefinition Interface](ixclrdatamethoddefinition-interface.md)
- [IXCLRDataMethodDefinition::StartEnumExtents Method](ixclrdatamethoddefinition-startenumextents.md)
- [IXCLRDataMethodDefinition::EnumExtent Method](ixclrdatamethoddefinition-enumextent-method.md)
- [CLRDATA_METHDEF_EXTENT Structure](clrdata-methdef-extent-structure.md)
