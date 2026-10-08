---
description: "Learn more about: IXCLRDataTask::GetLastExceptionState Method"
title: "IXCLRDataTask::GetLastExceptionState Method"
ms.date: "07/02/2024"
api.name:
  - "IXCLRDataTask::GetLastExceptionState Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataTask::GetLastExceptionState Method"
helpviewer.keywords:
  - "IXCLRDataTask::GetLastExceptionState Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataTask::GetLastExceptionState Method

Gets the last exception state for the task, if any.  If an exception is currently being processed the last exception state may be the same as the current exception state.  This requires revision 2 of a CLR task.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetLastExceptionState(
    [out] IXCLRDataExceptionState **exception
);
```

## Parameters

`exception`\
[out] The last exception state of the task

## Remarks

The provided method is part of the `IXCLRDataTask` interface and corresponds to the 19th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataTask Interface](ixclrdatatask-interface.md)
- [IXCLRDataExceptionState Interface](ixclrdataexceptionstate-interface.md)
