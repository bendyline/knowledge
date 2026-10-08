---
description: "Learn more about: IXCLRDataExceptionState::GetPrevious Method"
title: "IXCLRDataExceptionState::GetPrevious Method"
ms.date: "07/03/2024"
api.name:
  - "IXCLRDataExceptionState::GetPrevious Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataExceptionState::GetPrevious Method"
helpviewer.keywords:
  - "IXCLRDataExceptionState::GetPrevious Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataExceptionState::GetPrevious Method

For nested exceptions, this gets the exception that was being handled when this exception occurred.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetPrevious(
    [out] IXCLRDataExceptionState **exState
);
```

## Parameters

`exState`\
[out] The exception that was being handled when this exception occurred.

## Remarks

The provided method is part of the `IXCLRDataExceptionState` interface and corresponds to the 5th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataExceptionState Interface](ixclrdataexceptionstate-interface.md)
