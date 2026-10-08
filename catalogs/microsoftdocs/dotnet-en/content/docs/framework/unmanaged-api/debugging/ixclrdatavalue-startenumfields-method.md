---
description: "Learn more about: IXCLRDataValue::StartEnumAppDomains Method"
title: "IXCLRDataValue::StartEnumAppDomains Method"
ms.date: "07/02/2024"
api.name:
  - "IXCLRDataValue::StartEnumAppDomains Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataValue::StartEnumAppDomains Method"
helpviewer.keywords:
  - "IXCLRDataValue::StartEnumAppDomains Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataValue::StartEnumFields Method

Provides a handle to enumerate the fields of the value.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT StartEnumFields(
    [in] ULONG32 flags,
    [in] IXCLRDataTypeInstance *fromType,
    [out] CLRDATA_ENUM *handle
);
```

## Parameters

`flags`\
[in] A set of flags definining which fields to enumerate.  This is one or more of the flags defined in the `CLRDataFieldFlag` enumeration.

`fromType`
[in] If provided, only fields defined in this type are enumerated.

`handle`\
[out] A handle for enumerating the fields as specified by the other arguments to this method.

## Remarks

The provided method is part of the `IXCLRDataValue` interface and corresponds to the 14th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataValue Interface](ixclrdatavalue-interface.md)
- [IXCLRDataValue::EnumField Method](ixclrdatavalue-enumfield-method.md)
- [IXCLRDataValue::EndEnumFields Method](ixclrdatavalue-endenumfields-method.md)
