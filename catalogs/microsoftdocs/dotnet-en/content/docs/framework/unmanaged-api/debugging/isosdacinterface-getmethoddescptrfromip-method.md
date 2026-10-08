---
description: "Learn more about: ISOSDacInterface::GetMethodDescPtrFromIP Method"
title: "ISOSDacInterface::GetMethodDescPtrFromIP Method"
ms.date: "02/01/2019"
api.name:
  - "ISOSDacInterface::GetMethodDescPtrFromIP Method"
api.location:
  - "mscordacwks.dll"
api.type:
  - "COM"
f1.keywords:
  - "ISOSDacInterface::GetMethodDescPtrFromIP Method"
helpviewer.keywords:
  - "ISOSDacInterface::GetMethodDescPtrFromIP Method [.NET Framework debugging]"
topic_type:
  - "apiref"
author: "hoyosjs"
ms.author: "juhoyosa"
---
# ISOSDacInterface::GetMethodDescPtrFromIP Method

Retrieves the pointer of the MethodDesc corresponding the method containing the given native instruction address.

> **Note:**
> This API was originally designed for internal use in the runtime. Although it is now supported for 3rd party use, we recommend working with [`ICorDebug`](debugging-interfaces.md) and [`ICorProfiler`](../profiling/profiling-interfaces.md) APIs when possible.


## Syntax

```cpp
HRESULT GetMethodDescPtrFromIP(
    CLRDATA_ADDRESS ip,
    CLRDATA_ADDRESS * ppMD
);
```

## Parameters

`ip`\
[in] An address within the method at runtime.

`ppMD`\
[out] The address of the `MethodDesc` for the particular method.

## Remarks

The provided method is part of the [`ISOSDacInterface` interface](isosdacinterface-interface.md) and corresponds to the 22nd slot of the virtual method table.

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).
**Header:** None
**Library:** None
**.NET Framework Versions:** Available since 4.7


## See also

- [Debugging](index.md)
- [ISOSDacInterface Interface](isosdacinterface-interface.md)
