---
description: "Learn more about: MemoryStream.InternalGetOriginAndLength method"
title: MemoryStream.InternalGetOriginAndLength Method (System.IO)
ms.date: 11/19/2019
topic_type:
  - "apiref"
api_name:
  - "System.IO.MemoryStream.InternalGetOriginAndLength"
api_location:
  - "mscorlib.dll"
api_type:
  - "Assembly"
---
# MemoryStream.InternalGetOriginAndLength method

Gets the internal values of origin and length of the memory stream.

```csharp
internal void InternalGetOriginAndLength(out int origin, out int length)
```

## Parameters

- `origin` [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32)\
  When this method returns, the offset of the byte array specified when creating a new [System.IO.MemoryStream](https://learn.microsoft.com/search/?terms=System.IO.MemoryStream) object. Contains 0 if the byte array was created by [System.IO.MemoryStream](https://learn.microsoft.com/search/?terms=System.IO.MemoryStream).

- `length` [System.Int32](https://learn.microsoft.com/search/?terms=System.Int32)\
  When this method returns, the number of bytes within the memory stream.

## Remarks

> **Warning:**
> The `MemoryStream.InternalGetOriginAndLength` method is internal and is not meant to be used directly in your code.
>
> Microsoft does not support the use of this method in a production application under any circumstance.

## Requirements

**Namespace:** [System.IO](https://learn.microsoft.com/search/?terms=System.IO)

**Assembly:** mscorlib.dll (in mscorlib.dll)

**.NET Framework versions:** Available since 2.0.
