---
description: "Learn more about: IXCLRDataProcess::GetTaskByOSThreadID Method"
title: "IXCLRDataProcess::GetTaskByOSThreadID Method"
ms.date: "07/01/2024"
api.name:
  - "IXCLRDataProcess::GetTaskByOSThreadID Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataProcess::GetTaskByOSThreadID Method"
helpviewer.keywords:
  - "IXCLRDataProcess::GetTaskByOSThreadID Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer-msft"
ms.author: "wmessmer"
---
# IXCLRDataProcess::GetTaskByOSThreadID Method

Gets the managed task running on the given OS thread by its thread ID.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetTaskByOSThreadID(
    [in] ULONG32 osThreadID,
    [out] IXCLRDataTask **task
);
```

## Parameters

`osThreadID`\
[in] The operating system thread ID for which to find the associated managed task

`task`\
[out] The managed task

## Remarks

The provided method is part of the `IXCLRDataProcess` interface and corresponds to the 8th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataProcess Interface](ixclrdataprocess-interface.md)
- [IXCLRDataProcess::GetTaskByUniqueID Method](ixclrdataprocess-gettaskbyuniqueid-method.md)
- [IXCLRDataTask Interface](ixclrdatatask-interface.md)
