---
title: Initialize function (Unmanaged API Reference)
description: The Initialize function performs WMI initialization.
ms.date: "11/06/2017"
api_name:
  - "Initialize"
api_location:
  - "WMINet_Utils.dll"
api_type:
  - "DLLExport"
f1_keywords:
  - "Initialize"
helpviewer_keywords:
  - "Initialize function [.NET WMI and performance counters]"
topic_type:
  - "Reference"
---
# Initialize function

Performs WMI initialization.

> **Note:**
> This API is for internal use only. It's not intended for use from developer code.


## Syntax

```cpp
HRESULT Initialize(
   [in] boolean bAllowIManagementObjectQI
);
```

## Parameters

`bAllowIManagementObjectQI`

[in] `true` to indicate that calls to QueryInterface on WMI objects are allowed; `false` otherwise.

## Return value

The function always returns `S_OK` (0).

## Requirements

**Platforms:** See [System Requirements](../../get-started/system-requirements.md).

**Header:** WMINet_Utils.def

**.NET Framework Versions:** Available since 4.7.2


## See also

- [WMI and Performance Counters (Unmanaged API Reference)](index.md)
