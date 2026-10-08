---
title: ".NET 6 breaking change: FileStream.Position updated after ReadAsync or WriteAsync completion"
description: Learn about the .NET 6 breaking change in core .NET libraries where FileStream.Position is updated after ReadAsync or WriteAsync completion.
ms.date: 10/04/2022
---
# FileStream.Position updates after ReadAsync or WriteAsync completes

[System.IO.FileStream.Position](https://learn.microsoft.com/search/?terms=System.IO.FileStream.Position) is now updated after [System.IO.FileStream.ReadAsync*](https://learn.microsoft.com/search/?terms=System.IO.FileStream.ReadAsync*) or [System.IO.FileStream.WriteAsync*](https://learn.microsoft.com/search/?terms=System.IO.FileStream.WriteAsync*) completes.

## Change description

In previous .NET versions on Windows, [System.IO.FileStream.Position](https://learn.microsoft.com/search/?terms=System.IO.FileStream.Position) was updated after the asynchronous read or write operation started. Starting in .NET 6, [System.IO.FileStream.Position](https://learn.microsoft.com/search/?terms=System.IO.FileStream.Position) is updated optimistically:

- After [System.IO.FileStream.WriteAsync*](https://learn.microsoft.com/search/?terms=System.IO.FileStream.WriteAsync*) starts, but if the operation fails or is canceled, the position is corrected.
- When [System.IO.FileStream.ReadAsync*](https://learn.microsoft.com/search/?terms=System.IO.FileStream.ReadAsync*) starts, but if the entire buffer isn't read, the position is corrected after the operation completes.

## Version introduced

.NET 6

## Reason for change

[System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream) has never been thread-safe, but until .NET 6, .NET has tried to support multiple concurrent calls to its asynchronous methods ([System.IO.FileStream.ReadAsync*](https://learn.microsoft.com/search/?terms=System.IO.FileStream.ReadAsync*) and [System.IO.FileStream.WriteAsync*](https://learn.microsoft.com/search/?terms=System.IO.FileStream.WriteAsync*)) on Windows.

This change was introduced to allow for 100% asynchronous file I/O with [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream) and to fix the following issues:

- [FileStream.FlushAsync ends up doing synchronous writes](https://github.com/dotnet/runtime/issues/27643)
- [Win32 FileStream turns async reads into sync reads](https://github.com/dotnet/runtime/issues/16341)

## Recommended action

- If you rely on [System.IO.FileStream.Position](https://learn.microsoft.com/search/?terms=System.IO.FileStream.Position) being set before the read or write starts because your code performs *parallel* reads or writes, you should switch to use the [System.IO.RandomAccess](https://learn.microsoft.com/search/?terms=System.IO.RandomAccess) API instead. The [System.IO.RandomAccess](https://learn.microsoft.com/search/?terms=System.IO.RandomAccess) API is designed for parallel file operations.

- To enable the .NET 5 behavior in .NET 6, specify an `AppContext` switch or an environment variable. By setting the switch to `true`, you opt out of all performance improvements made to `FileStream` in .NET 6.

  ```json
  {
      "configProperties": {
          "System.IO.UseNet5CompatFileStream": true
      }
  }
  ```

  ```cmd
  set DOTNET_SYSTEM_IO_USENET5COMPATFILESTREAM=1
  ```

  > **Important:**
  > This switch is only available in .NET 6. It was [removed in .NET 7](../7.0/filestream-compat-switch.md).

## Affected APIs

- [System.IO.FileStream.Position](https://learn.microsoft.com/search/?terms=System.IO.FileStream.Position)
