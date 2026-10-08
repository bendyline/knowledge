---
description: "Learn more about: IXCLRDataValue::EnumFieldByName Method"
title: "IXCLRDataValue::EnumFieldByName Method"
ms.date: "07/02/2024"
api.name:
  - "IXCLRDataValue::EnumFieldByName Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataValue::EnumFieldByName Method"
helpviewer.keywords:
  - "IXCLRDataValue::EnumFieldByName Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataValue::EnumFieldByName Method

Enumerates the fields of a value by name.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT EnumFieldByName(
    [in] CLRDATA_ENUM *handle,
    [out] IXCLRDataValue **field,
    [out] mdFieldDef *token
);
```

## Parameters

`handle`\
[in] A handle for enumerating the fields of the value by name.

`field`\
[out] The enumerated field.

`token`\
[out] The metadata token defining the field.

## Remarks

The provided method is part of the `IXCLRDataValue` interface and corresponds to the 18th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataValue Interface](ixclrdatavalue-interface.md)
- [CLRDataByNameFlag Enumeration](clrdatabynameflag-enumeration.md)
- [CLRDataFieldFlag Enumeration](clrdatafieldflag-enumeration.md)
- [IXCLRDataValue::StartEnumFieldsByName Method](ixclrdatavalue-startenumfieldsbyname-method.md)
- [IXCLRDataValue::EndEnumFieldsByName Method](ixclrdatavalue-endenumfieldsbyname-method.md)
