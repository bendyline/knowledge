---
description: "Learn more about: IXCLRDataTypeDefinition::GetCorElementType Method"
title: "IXCLRDataTypeDefinition::GetCorElementType Method"
ms.date: "07/03/2024"
api.name:
  - "IXCLRDataTypeDefinition::GetCorElementType Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataTypeDefinition::GetCorElementType Method"
helpviewer.keywords:
  - "IXCLRDataTypeDefinition::GetCorElementType Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataTypeDefinition::GetCorElementType Method

Gets the standard element type of this type definition.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetCorElementType(
    [out] CorElementType *type
);
```

## Parameters

`type`\
[out] The standard element type of this type definition.

## Remarks

The provided method is part of the `IXCLRDataTypeDefinition` interface and corresponds to the 17th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataTypeDefinition Interface](ixclrdatatypedefinition-interface.md)
