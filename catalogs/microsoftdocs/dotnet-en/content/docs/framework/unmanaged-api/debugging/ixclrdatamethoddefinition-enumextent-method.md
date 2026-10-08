---
description: "Learn more about: IXCLRDataMethodDefinition::EnumExtent Method"
title: "IXCLRDataMethodDefinition::EnumExtent Method"
ms.date: "07/02/2024"
api.name:
  - "IXCLRDataMethodDefinition::EnumExtent Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataMethodDefinition::EnumExtent Method"
helpviewer.keywords:
  - "IXCLRDataMethodDefinition::EnumExtent Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataMethodDefinition::EnumExtent Method

Enumerates the IL code regions associated with the method.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT EnumExtent(
    [in, out] CLRDATA_ENUM *handle,
    [out] CLRDATA_METHDEF_EXTENT *extent
);
```

## Parameters

`handle`\
[in, out] A handle for enumerating the IL code regions associated with the method.

`extent`\
[out] The enumerated IL code region associated with the method.

## Remarks

The provided method is part of the `IXCLRDataMethodDefinition` interface and corresponds to the 14th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataMethodDefinition Interface](ixclrdatamethoddefinition-interface.md)
- [IXCLRDataMethodDefinition::StartEnumExtents Method](ixclrdatamethoddefinition-startenumextents.md)
- [IXCLRDataMethodDefinition::EndEnumExtents Method](ixclrdatamethoddefinition-endenumextents-method.md)
- [CLRDATA_METHDEF_EXTENT Structure](clrdata-methdef-extent-structure.md)
