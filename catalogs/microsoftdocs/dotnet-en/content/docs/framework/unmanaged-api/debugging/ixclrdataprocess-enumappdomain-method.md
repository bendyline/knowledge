---
description: "Learn more about: IXCLRDataProcess::EnumAppDomain Method"
title: "IXCLRDataProcess::EnumAppDomain Method"
ms.date: "07/02/2024"
api.name:
  - "IXCLRDataProcess::EnumAppDomain Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataProcess::EnumAppDomain Method"
helpviewer.keywords:
  - "IXCLRDataProcess::EnumAppDomain Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataProcess::EnumAppDomain Method

Enumerates the AppDomains of this process.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT EnumAppDomain(
    [in] CLRDATA_ENUM *handle,
    [out] IXCLRAppDomain **appDomain
);
```

## Parameters

`handle`\
[in] A handle for enumerating the AppDomains.

`appDomain`\
[out] The enumerated AppDomain.

## Remarks

The provided method is part of the `IXCLRDataProcess` interface and corresponds to the 18th slot of the virtual method table.

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
- [IXCLRDataProcess::EndEnumAppDomains Method](ixclrdataprocess-endenumappdomains-method.md)
