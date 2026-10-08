---
description: "Learn more about: IXCLRDataExceptionNotification::OnTypeUnloaded Method"
title: "IXCLRDataExceptionNotification::OnTypeUnloaded Method"
ms.date: "07/01/2024"
api.name:
  - "IXCLRDataExceptionNotification::OnTypeUnloaded Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataExceptionNotification::OnTypeUnloaded Method"
helpviewer.keywords:
  - "IXCLRDataExceptionNotification::OnTypeUnloaded Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataExceptionNotification::OnTypeUnloaded Method

Client implemented callback which is made during a call to `IXCLRDataProcess::TranslateExceptionRecordToNotification` when a given exception represents the unloading of a type instance.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT OnTypeUnloaded(
    [in] IXCLRDataTypeInstance *typeInst
);
```

## Parameters

`typeInst`\
[in] The type instance which is being unloaded.

## Remarks

The provided method is part of the `IXCLRDataExceptionNotification` interface and corresponds to the 11th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataProcess::TranslateExceptionRecordToNotification Method](ixclrdataprocess-translateexceptionrecordtonotification-method.md)
- [IXCLRDataTypeInstance Interface](ixclrdatatypeinstance-interface.md)
