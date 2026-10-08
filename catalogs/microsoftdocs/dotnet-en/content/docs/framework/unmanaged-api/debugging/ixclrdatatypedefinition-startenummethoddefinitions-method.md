---
description: "Learn more about: IXCLRDataTypeDefinition::StartEnumMethodDefinitions Method"
title: "IXCLRDataTypeDefinition::StartEnumMethodDefinitions Method"
ms.date: "07/03/2024"
api.name:
  - "IXCLRDataTypeDefinition::StartEnumMethodDefinitions Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataTypeDefinition::StartEnumMethodDefinitions Method"
helpviewer.keywords:
  - "IXCLRDataTypeDefinition::StartEnumMethodDefinitions Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataTypeDefinition::StartEnumMethodDefinitions Method

Provides a handle for the enumeration of method definitions within the type.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT StartEnumMethodDefinitions(
    [out] CLRDATA_ENUM *handle
);
```

## Parameters

`handle`\
[out] A handle for enumerating method definitions within the type.

## Remarks

The provided method is part of the `IXCLRDataTypeDefinition` interface and corresponds to the 5th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).  
**Header:** None  
**Library:** None  
**.NET Framework Versions:** Available since 4.7
  

## See also

- [Debugging](index.md)
- [IXCLRDataTypeDefinition Interface](ixclrdatatypedefinition-interface.md)
- [IXCLRDataMethodDefinition Interface](ixclrdatamethoddefinition-interface.md)
- [IXCLRDataTypeDefinition::EnumMethodDefinition Method](ixclrdatatypedefinition-enummethoddefinition-method.md)
- [IXCLRDataTypeDefinition::EndEnumMethodDefinitions Method](ixclrdatatypedefinition-endenummethoddefinitions-method.md)
