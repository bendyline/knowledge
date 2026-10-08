---
title: "Breaking change: GnuTarEntry and PaxTarEntry exclude atime and ctime by default"
description: "Learn about the breaking change in .NET 10 where GnuTarEntry and PaxTarEntry no longer automatically set access time and change time fields."
ms.date: 06/05/2025
ai-usage: ai-assisted
ms.custom: https://github.com/dotnet/docs/issues/46465
---
# GnuTarEntry and PaxTarEntry exclude atime and ctime by default

Starting in .NET 10, [System.Formats.Tar.GnuTarEntry](https://learn.microsoft.com/search/?terms=System.Formats.Tar.GnuTarEntry) and [System.Formats.Tar.PaxTarEntry](https://learn.microsoft.com/search/?terms=System.Formats.Tar.PaxTarEntry) no longer automatically set access time (`atime`) and change time (`ctime`) fields when creating new entries. These fields are problematic in tar entries because not all tar readers support them. The fields will still be preserved when reading, and you set them directly. But they won't be set on existing entries that didn't have them to start, or when converting from other entry types.

The behavior of [System.Formats.Tar.TarEntry.ModificationTime](https://learn.microsoft.com/search/?terms=System.Formats.Tar.TarEntry.ModificationTime) is unchanged. It's initialized to [System.DateTime.UtcNow](https://learn.microsoft.com/search/?terms=System.DateTime.UtcNow) for tar entries created with a constructor, and uses the file modification time for entries created from files.

Other minor fixes have been made to [System.Formats.Tar](https://learn.microsoft.com/search/?terms=System.Formats.Tar) to prioritize round-tripping of `TarEntry` entries from read to write without change.

## Version introduced

.NET 10

## Previous behavior

Previously, `GnuTarEntry` and `PaxTarEntry` always added `atime` and `ctime` values when creating new entries.

## New behavior

Starting in .NET 10, `GnuTarEntry` and `PaxTarEntry` only set `atime` and `ctime` if:

- The entry is read from a tar archive that already contains these fields.
- The user explicitly set them using the appropriate properties.

The behavior of [System.Formats.Tar.TarEntry.ModificationTime](https://learn.microsoft.com/search/?terms=System.Formats.Tar.TarEntry.ModificationTime) remains unchanged. It's initialized to [System.DateTime.UtcNow](https://learn.microsoft.com/search/?terms=System.DateTime.UtcNow) for tar entries created with a constructor, and uses the file modification time for entries created from files.

## Type of breaking change

This is a [behavioral change](../../categories.md#behavioral-change).

## Reason for change

This change was made for better compatibility with other tar readers and to improve round-tripping of tar files without modification.

## Recommended action

No action required for most users&mdash;most archives have no use for these timestamps.

If you require these fields to be set, you can use the following APIs:

- For `GnuTarEntry`: Use the [System.Formats.Tar.GnuTarEntry.AccessTime](https://learn.microsoft.com/search/?terms=System.Formats.Tar.GnuTarEntry.AccessTime) and [System.Formats.Tar.GnuTarEntry.ChangeTime](https://learn.microsoft.com/search/?terms=System.Formats.Tar.GnuTarEntry.ChangeTime) properties.
- For `PaxTarEntry`: Use the constructor that accepts extended attributes: [System.Formats.Tar.PaxTarEntry.%23ctor(System.Formats.Tar.TarEntryType,System.String,System.Collections.Generic.IEnumerable{System.Collections.Generic.KeyValuePair{System.String,System.String}})](https://learn.microsoft.com/search/?terms=System.Formats.Tar.PaxTarEntry.%2523ctor(System.Formats.Tar.TarEntryType%2CSystem.String%2CSystem.Collections.Generic.IEnumerable%7BSystem.Collections.Generic.KeyValuePair%7BSystem.String%2CSystem.String%7D%7D)).

However, be aware that setting these fields creates a tar file that isn't readable by many tar clients.

## Affected APIs

- [System.Formats.Tar.GnuTarEntry](https://learn.microsoft.com/search/?terms=System.Formats.Tar.GnuTarEntry)
- [System.Formats.Tar.PaxTarEntry](https://learn.microsoft.com/search/?terms=System.Formats.Tar.PaxTarEntry)
- [System.Formats.Tar.TarReader](https://learn.microsoft.com/search/?terms=System.Formats.Tar.TarReader)
- [System.Formats.Tar.TarWriter](https://learn.microsoft.com/search/?terms=System.Formats.Tar.TarWriter)
