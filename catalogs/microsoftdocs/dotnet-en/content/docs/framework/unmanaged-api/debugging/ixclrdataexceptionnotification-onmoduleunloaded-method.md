---
description: "Learn more about: IXCLRDataExceptionNotification::OnModuleUnloaded Method"
title: "IXCLRDataExceptionNotification::OnModuleUnloaded Method"
ms.date: "07/01/2024"
api.name:
  - "IXCLRDataExceptionNotification::OnModuleUnloaded Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataExceptionNotification::OnModuleUnloaded Method"
helpviewer.keywords:
  - "IXCLRDataExceptionNotification::OnModuleUnloaded Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataExceptionNotification::OnModuleUnloaded Method

Client implemented callback which is made during a call to `IXCLRDataProcess::TranslateExceptionRecordToNotification` when a given exception represents the unloading of a CLR module.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT OnModuleUnloaded(
    [in] IXCLRDataModule *mod
);
```

## Parameters

`mod`\
[in] The module which was unloaded.

## Remarks

The provided method is part of the `IXCLRDataExceptionNotification` interface and corresponds to the 9th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataProcess::TranslateExceptionRecordToNotification Method](ixclrdataprocess-translateexceptionrecordtonotification-method.md)
- [IXCLRDataModule Interface](ixclrdatamodule-interface.md)
