---
description: "Learn more about: IXCLRDataProcess::GetAppDomainByUniqueId Method"
title: "IXCLRDataProcess::GetAppDomainByUniqueId Method"
ms.date: "01/16/2019"
api.name:
  - "IXCLRDataProcess::GetAppDomainByUniqueId Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataProcess::GetAppDomainByUniqueId Method"
helpviewer.keywords:
  - "IXCLRDataProcess::GetAppDomainByUniqueId Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "cshung"
---
# IXCLRDataProcess::GetAppDomainByUniqueId Method

Gets an `AppDomain` in a process based on its unique identifier.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetAppDomainByUniqueID(
    [in] ULONG64               id,
    [out] IXCLRDataAppDomain **appDomain
);
```

## Parameters

`id`\
[in] The unique identifier of the AppDomain

`appDomain`\
[out] The AppDomain

## Remarks

The provided method is part of the `IXCLRDataProcess` interface and corresponds to the 20th slot of the virtual method table. The `IXCLRDataAppDomain*` returned is used for interaction with other APIs.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataProcess Interface](ixclrdataprocess-interface.md)
