---
title: ".NET 7 breaking change: Legacy FileStream strategy removed"
description: Learn about the .NET 7 breaking change in core .NET libraries where the ability to use the legacy `FileStream` implementation has been removed.
ms.date: 10/04/2022
---
# Legacy FileStream strategy removed

The `AppContext` switch `System.IO.UseNet5CompatFileStream` and the ability to use the legacy [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream) implementation were removed.

## Previous behavior

The legacy `FileStream` implementation was available and you could opt in to it by using the `UseNet5CompatFileStream` switch or the `DOTNET_SYSTEM_IO_USENET5COMPATFILESTREAM` environment variable.

## New behavior

Starting in .NET 7, you can no longer opt in to use the legacy `FileStream` implementation.

## Version introduced

.NET 7 Preview 1

## Type of breaking change

This change can affect [binary compatibility](../../categories.md#binary-compatibility).

## Reason for change

The `UseNet5CompatFileStream` switch and `DOTNET_SYSTEM_IO_USENET5COMPATFILESTREAM` environment variable were included in .NET 6 in case the new implementation caused breaking changes. Any breaking changes have now been fixed. Since there are no more bugs introduced by the `FileStream` changes, the compatibility mode was removed and with it all the legacy code, which makes the codebase easier to maintain.

## Recommended action

If you're currently using the switch (or the `DOTNET_SYSTEM_IO_USENET5COMPATFILESTREAM` environment variable) to opt in to legacy code and are upgrading to .NET 7, the switch will no longer have any effect and you should remove it.

## Affected APIs

- [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream)
- [System.IO.File.Create(System.String)](https://learn.microsoft.com/search/?terms=System.IO.File.Create(System.String))
- [System.IO.File.Create(System.String,System.Int32)](https://learn.microsoft.com/search/?terms=System.IO.File.Create(System.String%2CSystem.Int32))
- [System.IO.File.Create(System.String,System.Int32,System.IO.FileOptions)](https://learn.microsoft.com/search/?terms=System.IO.File.Create(System.String%2CSystem.Int32%2CSystem.IO.FileOptions))
- [System.IO.File.Create(System.String,System.Int32,System.IO.FileOptions,System.Security.AccessControl.FileSecurity)](https://learn.microsoft.com/search/?terms=System.IO.File.Create(System.String%2CSystem.Int32%2CSystem.IO.FileOptions%2CSystem.Security.AccessControl.FileSecurity))
- [System.IO.File.Open(System.String,System.IO.FileMode)](https://learn.microsoft.com/search/?terms=System.IO.File.Open(System.String%2CSystem.IO.FileMode))
- [System.IO.File.Open(System.String,System.IO.FileStreamOptions)](https://learn.microsoft.com/search/?terms=System.IO.File.Open(System.String%2CSystem.IO.FileStreamOptions))
- [System.IO.File.Open(System.String,System.IO.FileMode,System.IO.FileAccess)](https://learn.microsoft.com/search/?terms=System.IO.File.Open(System.String%2CSystem.IO.FileMode%2CSystem.IO.FileAccess))
- [System.IO.File.Open(System.String,System.IO.FileMode,System.IO.FileAccess,System.IO.FileShare)](https://learn.microsoft.com/search/?terms=System.IO.File.Open(System.String%2CSystem.IO.FileMode%2CSystem.IO.FileAccess%2CSystem.IO.FileShare))
- [System.IO.File.OpenRead(System.String)](https://learn.microsoft.com/search/?terms=System.IO.File.OpenRead(System.String))
- [System.IO.File.OpenWrite(System.String)](https://learn.microsoft.com/search/?terms=System.IO.File.OpenWrite(System.String))
- [System.IO.FileSystemAclExtensions.Create(System.IO.FileInfo,System.IO.FileMode,System.Security.AccessControl.FileSystemRights,System.IO.FileShare,System.Int32,System.IO.FileOptions,System.Security.AccessControl.FileSecurity)](https://learn.microsoft.com/search/?terms=System.IO.FileSystemAclExtensions.Create(System.IO.FileInfo%2CSystem.IO.FileMode%2CSystem.Security.AccessControl.FileSystemRights%2CSystem.IO.FileShare%2CSystem.Int32%2CSystem.IO.FileOptions%2CSystem.Security.AccessControl.FileSecurity))
- [System.IO.FileInfo.Create](https://learn.microsoft.com/search/?terms=System.IO.FileInfo.Create)
- [System.IO.FileInfo.Open*](https://learn.microsoft.com/search/?terms=System.IO.FileInfo.Open*)
- [System.IO.FileInfo.OpenRead](https://learn.microsoft.com/search/?terms=System.IO.FileInfo.OpenRead)
- [System.IO.FileInfo.OpenWrite](https://learn.microsoft.com/search/?terms=System.IO.FileInfo.OpenWrite)

## See also

- [FileStream no longer synchronizes file offset with OS (.NET 6)](../6.0/filestream-doesnt-sync-offset-with-os.md)
- [FileStream.Position updates after ReadAsync or WriteAsync completes (.NET 6)](../6.0/filestream-position-updates-after-readasync-writeasync-completion.md)
