---
description: "Learn more about: IXCLRDataExceptionNotification::OnCodeDiscarded Method"
title: "IXCLRDataExceptionNotification::OnCodeDiscarded Method"
ms.date: "07/01/2024"
api.name:
  - "IXCLRDataExceptionNotification::OnCodeDiscarded Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataExceptionNotification::OnCodeDiscarded Method"
helpviewer.keywords:
  - "IXCLRDataExceptionNotification::OnCodeDiscarded Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataExceptionNotification::OnCodeDiscarded Method

Client implemented callback which is made during a call to `IXCLRDataProcess::TranslateExceptionRecordToNotification` when a given exception represents discarding of code for a particular method instance.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT OnCodeDiscarded(
    [in] IXCLRDataMethodInstance *method
);
```

## Parameters

`method`\
[in] The method instance for which code was discarded

## Remarks

The provided method is part of the `IXCLRDataExceptionNotification` interface and corresponds to the 5th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataProcess::TranslateExceptionRecordToNotification Method](ixclrdataprocess-translateexceptionrecordtonotification-method.md)
- [IXCLRDataMethodInstance Interface](ixclrdatamethodinstance-interface.md)
