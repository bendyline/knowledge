---
description: "Learn more about: IXCLRDataExceptionNotification2::OnAppDomainLoaded Method"
title: "IXCLRDataExceptionNotification2::OnAppDomainLoaded Method"
ms.date: "07/01/2024"
api.name:
  - "IXCLRDataExceptionNotification2::OnAppDomainLoaded Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataExceptionNotification2::OnAppDomainLoaded Method"
helpviewer.keywords:
  - "IXCLRDataExceptionNotification2::OnAppDomainLoaded Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataExceptionNotification2::OnAppDomainLoaded Method

Client implemented callback which is made during a call to `IXCLRDataProcess::TranslateExceptionRecordToNotification` when a given exception represents the loading of an AppDomain.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT OnAppDomainLoaded(
    [in] IXCLRDataAppDomain *domain
);
```

## Parameters

`domain`\
[in] The AppDomain which was loaded.

## Remarks

The provided method is part of the `IXCLRDataExceptionNotification2` interface and corresponds to the 12th slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [IXCLRDataProcess::TranslateExceptionRecordToNotification Method](ixclrdataprocess-translateexceptionrecordtonotification-method.md)
- [IXCLRDataExceptionNotification Interface](ixclrdataexceptionnotification-interface.md)
- [IXCLRDataAppDomain Interface](ixclrdataappdomain-interface.md)
