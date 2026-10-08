---
description: "Learn more about: IXCLRDataProcess::SetOtherNotificationFlags Method"
title: "IXCLRDataProcess::SetOtherNotificationFlags Method"
ms.date: "07/01/2024"
api.name:
  - "IXCLRDataProcess::SetOtherNotificationFlags Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataProcess::SetOtherNotificationFlags Method"
helpviewer.keywords:
  - "IXCLRDataProcess::SetOtherNotificationFlags Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataProcess::SetOtherNotificationFlags Method

Requests notifications when specific events are raised by the CLR.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT SetOtherNotificationFlags(
    [in] ULONG32 flags
);
```

## Parameters

`flags`\
[in] A set of flags defining which notifications should be delivered.  The `flags` argument is one or more of the flags defined by the `CLRDataOtherNotifyFlag` enumeration.

## Remarks

The provided method is part of the `IXCLRDataProcess` interface and corresponds to the 43rd slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataProcess Interface](ixclrdataprocess-interface.md)
- [CLRDataOtherNotifyFlag Enumeration](clrdataothernotifyflag-enumeration.md)
