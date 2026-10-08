---
description: "Learn more about: SqlStreamChars.Seek(Int64, SeekOrigin) Method"
title: SqlStreamChars.Seek(Int64, SeekOrigin) Method (System.Data.SqlTypes)
author: stevestein
ms.date: 12/20/2018
ms.subservice: "data-access"
topic_type:
  - "apiref"
api_name:
  - "System.Data.SqlTypes.SqlStreamChars.Seek"
api_location:
  - "System.Data.dll"
api_type:
  - "Assembly"
---
# SqlStreamChars.Seek(Int64, SeekOrigin) Method

When overridden in a derived class, sets the position within the current stream. The assembly that contains this method has a friend relationship with SQLAccess.dll. It's intended for use by SQL Server. For other databases, use the hosting mechanism provided by that database.

```csharp
public abstract long Seek (long offset, System.IO.SeekOrigin origin);
```

## Parameters

`offset`\
A byte offset relative to `origin`.

`origin`\
One of the enumeration values that indicates the reference point from which to obtain the new position.

## Returns

[System.Int32](https://learn.microsoft.com/search/?terms=System.Int32)\
The new position within the current stream.

## Remarks

> **Warning:**
> The `SqlStreamChars.Seek` method is private and is not meant to be used directly in your code.
>
> Microsoft does not support the use of this method in a production application under any circumstance.

## Requirements

**Namespace:** [System.Data.SqlTypes](https://learn.microsoft.com/search/?terms=System.Data.SqlTypes)

**Assembly:** System.Data (in System.Data.dll)

**.NET Framework versions:** Available since 2.0.
