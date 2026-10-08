---
description: "Learn more about: IXCLRDataAppDomain Interface"
title: "IXCLRDataAppDomain Interface"
ms.date: "07/03/2024"
api.name:
  - "IXCLRDataAppDomain Interface"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "IXCLRDataAppDomain Interface"
helpviewer.keywords:
  - "IXCLRDataAppDomain Interface [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "wmessmer"
ms.author: "wmessmer"
---
# IXCLRDataAppDomain Interface

A placeholder used to pass AppDomain information to various other IXCLRData* methods.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Methods

None

## Remarks

This interface lives inside the runtime and is not exposed through any headers or library files. However, it's a COM interface that derives from `IUnknown` with GUID `7CA04601-C702-4670-A63C-FA44F7DA7BD5` that can be obtained through the usual COM mechanisms.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [Debugging Interfaces](debugging-interfaces.md)
