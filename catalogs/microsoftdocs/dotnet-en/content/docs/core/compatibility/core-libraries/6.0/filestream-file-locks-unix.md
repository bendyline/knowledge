---
title: "Breaking change: FileStream locks files with shared lock on Unix"
description: Learn about the .NET 6 breaking change where FileStream.Lock now locks files with a read lock when they're opened with read permissions on Unix.
ms.date: 10/15/2021
---
# FileStream locks files with shared lock on Unix

On Unix, if you open a file using [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream) with [System.IO.FileAccess.Read](https://learn.microsoft.com/search/?terms=System.IO.FileAccess.Read) permissions only, and then call [System.IO.FileStream.Lock(System.Int64,System.Int64)](https://learn.microsoft.com/search/?terms=System.IO.FileStream.Lock(System.Int64%2CSystem.Int64)) to lock a region of the file, the operation will now succeed. It succeeds because the runtime locks the file with a shared or read lock instead of a write lock.

```csharp
using (FileStream fs = File.OpenRead("testfile")) // Opening with FileAccess.Read only
{
    fs.Lock((long) 3, (long) 1); // Attempting to lock a region of the read-only file
}
```

There's no change to the behavior on Windows, where the operation always succeeded.

## Previous behavior

On Unix, if you opened a file using a [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream) with read permissions only, and then called [System.IO.FileStream.Lock(System.Int64,System.Int64)](https://learn.microsoft.com/search/?terms=System.IO.FileStream.Lock(System.Int64%2CSystem.Int64)) to lock a region of the file, the runtime attempted to lock the file with a write lock. That resulted in an [System.UnauthorizedAccessException](https://learn.microsoft.com/search/?terms=System.UnauthorizedAccessException) and the message "Access to the path is denied".

## New behavior

Starting in .NET 6, if you open a file using a [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream) with read permissions only on Unix, and then call [System.IO.FileStream.Lock(System.Int64,System.Int64)](https://learn.microsoft.com/search/?terms=System.IO.FileStream.Lock(System.Int64%2CSystem.Int64)) to lock a region of the file, the runtime locks the file with a read lock (also known as a *shared lock*).

## Version introduced

.NET 6 RC 1

## Type of breaking change

This change can affect [binary compatibility](../../categories.md#binary-compatibility).

## Reason for change

[System.IO.FileStream.Lock(System.Int64,System.Int64)](https://learn.microsoft.com/search/?terms=System.IO.FileStream.Lock(System.Int64%2CSystem.Int64)) is the API that lets users lock a specific region of a file. There's no API that lets you choose the underlying locking method, so [System.IO.FileStream.Lock(System.Int64,System.Int64)](https://learn.microsoft.com/search/?terms=System.IO.FileStream.Lock(System.Int64%2CSystem.Int64)) should correctly determine the appropriate locking method for the file permissions.

## Recommended action

Prior to .NET 6, to be able to lock the file, you had to do one of the following:

- Check if the code was being executed in Windows or the [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream) was opened with [System.IO.FileAccess.Write](https://learn.microsoft.com/search/?terms=System.IO.FileAccess.Write) permission.
- Wrap the [System.IO.FileStream.Lock(System.Int64,System.Int64)](https://learn.microsoft.com/search/?terms=System.IO.FileStream.Lock(System.Int64%2CSystem.Int64)) call with a `try catch` to capture the [System.UnauthorizedAccessException](https://learn.microsoft.com/search/?terms=System.UnauthorizedAccessException).

If you used one of these workarounds, you can now remove them.

## Affected APIs

- [System.IO.FileStream.Lock(System.Int64,System.Int64)](https://learn.microsoft.com/search/?terms=System.IO.FileStream.Lock(System.Int64%2CSystem.Int64))
