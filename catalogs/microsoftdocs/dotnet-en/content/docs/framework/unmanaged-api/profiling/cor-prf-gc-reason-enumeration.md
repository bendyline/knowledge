---
description: "Learn more about: COR_PRF_GC_REASON Enumeration"
title: "COR_PRF_GC_REASON Enumeration"
ms.date: "03/30/2017"
api_name:
  - "COR_PRF_GC_REASON"
api_location:
  - "mscorwks.dll"
api_type:
  - "COM"
f1_keywords:
  - "COR_PRF_GC_REASON"
helpviewer_keywords:
  - "COR_PRF_GC_REASON enumeration [.NET Framework profiling]"
ms.assetid: 72822b95-a7fb-485e-9d55-1cb016d9a458
topic_type:
  - "apiref"
---
# COR_PRF_GC_REASON Enumeration

Indicates the reason that garbage collection is occurring.

## Syntax

```cpp
typedef enum {
    COR_PRF_GC_INDUCED = 1,
    COR_PRF_GC_OTHER = 0
} COR_PRF_GC_REASON;
```

## Members

| Member | Description |
| --- | --- |
| `COR_PRF_GC_INDUCED` | The garbage collection was induced by a [System.GC.Collect*](https://learn.microsoft.com/search/?terms=System.GC.Collect*) method. |
| `COR_PRF_GC_OTHER` | The reason is unspecified. |

## Requirements

 **Platforms:** See [System Requirements](../../get-started/system-requirements.md).

 **Header:** CorProf.idl, CorProf.h

 **Library:** CorGuids.lib

 **.NET Framework Versions:** Available since 2.0


## See also

- [Profiling Enumerations](profiling-enumerations.md)
