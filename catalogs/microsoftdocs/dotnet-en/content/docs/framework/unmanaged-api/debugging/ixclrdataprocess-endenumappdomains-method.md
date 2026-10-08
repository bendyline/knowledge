---
description: "Learn more about: IXCLRDataProcess::EndEnumAppDomains Method"
title: "IXCLRDataProcess::EndEnumAppDomains Method"
ms.date: "07/02/2024"
api.name:
  - "IXCLRDataProcess::EndEnumAppDomains Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataProcess::EndEnumAppDomains Method"
helpviewer.keywords:
  - "IXCLRDataProcess::EndEnumAppDomains Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataProcess::EndEnumAppDomains Method

Releases the resources used by internal iterators used during instance enumeration.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT EndEnumAppDomains(
    [in] CLRDATA_ENUM handle
);
```

## Parameters

`handle`\
[out] A handle for enumerating the AppDomains.

## Remarks

The provided method is part of the `IXCLRDataProcess` interface and corresponds to the 19th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataProcess Interface](ixclrdataprocess-interface.md)
- [IXCLRDataAppDomain Interface](ixclrdataappdomain-interface.md)
- [IXCLRDataProcess::StartEnumAppDomains Method](ixclrdataprocess-startenumappdomains-method.md)
- [IXCLRDataProcess::EnumAppDomain Method](ixclrdataprocess-enumappdomain-method.md)
