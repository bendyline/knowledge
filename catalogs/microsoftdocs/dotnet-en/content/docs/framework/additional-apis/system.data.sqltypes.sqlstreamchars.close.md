---
description: "Learn more about: SqlStreamChars.Close Method"
title: SqlStreamChars.Close Method (System.Data.SqlTypes)
author: stevestein
ms.date: 12/20/2018
ms.subservice: "data-access"
topic_type:
  - "apiref"
api_name:
  - "System.Data.SqlTypes.SqlStreamChars.Close"
api_location:
  - "System.Data.dll"
api_type:
  - "Assembly"
---
# SqlStreamChars.Close Method

Closes the current stream and releases any system resources associated with the stream. The assembly that contains this method has a friend relationship with SQLAccess.dll. It's intended for use by SQL Server. For other databases, use the hosting mechanism provided by that database.

```csharp
public virtual void Close ();
```

## Remarks

> **Warning:**
> The `SqlStreamChars.Close` method is private and is not meant to be used directly in your code.
>
> Microsoft does not support the use of this method in a production application under any circumstance.

## Requirements

**Namespace:** [System.Data.SqlTypes](https://learn.microsoft.com/search/?terms=System.Data.SqlTypes)

**Assembly:** System.Data (in System.Data.dll)

**.NET Framework versions:** Available since 2.0.
