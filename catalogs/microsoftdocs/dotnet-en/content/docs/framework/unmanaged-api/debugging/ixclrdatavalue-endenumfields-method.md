---
description: "Learn more about: IXCLRDataValue::EndEnumFields Method"
title: "IXCLRDataValue::EndEnumFields Method"
ms.date: "07/02/2024"
api.name:
  - "IXCLRDataValue::EndEnumFields Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataValue::EndEnumFields Method"
helpviewer.keywords:
  - "IXCLRDataValue::EndEnumFields Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataValue::EndEnumFields Method

Releases the resources used by internal iterators used during instance enumeration.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT EndEnumFields(
    [in] CLRDATA_ENUM handle
);
```

## Parameters

`handle`\
[out] A handle for enumerating the fields of the value.

## Remarks

The provided method is part of the `IXCLRDataValue` interface and corresponds to the 16th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataValue Interface](ixclrdatavalue-interface.md)
- [IXCLRDataValue::StartEnumFields Method](ixclrdatavalue-startenumfields-method.md)
- [IXCLRDataValue::EnumField Method](ixclrdatavalue-enumfield-method.md)
