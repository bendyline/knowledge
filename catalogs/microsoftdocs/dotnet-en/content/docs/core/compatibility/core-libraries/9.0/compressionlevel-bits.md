---
title: "Breaking change: Adding a ZipArchiveEntry with CompressionLevel sets ZIP central directory header general-purpose bit flags"
description: Learn about the .NET 9 breaking change in core .NET libraries where adding a ZipArchiveEntry with a specified CompressionLevel sets the ZIP central directory header general-purpose bit flags.
ms.date: 06/03/2024
---
# Adding a ZipArchiveEntry with CompressionLevel sets ZIP central directory header general-purpose bit flags

The [ZIP file specification](https://pkware.cachefly.net/webdocs/APPNOTE/APPNOTE_6.2.0.txt) defines that bits 1 & 2 of the general-purpose bit flag in a nested file record's central directory header should be used to indicate the compression level of the nested file.

.NET Framework sets these bits when generating the ZIP files underpinning the [System.IO.Packaging.ZipPackage](https://learn.microsoft.com/search/?terms=System.IO.Packaging.ZipPackage) API. During the migration of .NET Framework code to .NET, this functionality was lost and in .NET, bits 1 & 2 were always set to `0` when new file records were created within the ZIP file. This breaking change restores that capability. However, existing .NET clients that specify a [System.IO.Packaging.CompressionOption](https://learn.microsoft.com/search/?terms=System.IO.Packaging.CompressionOption) when calling [System.IO.Compression.ZipArchive.CreateEntry*](https://learn.microsoft.com/search/?terms=System.IO.Compression.ZipArchive.CreateEntry*) will see the general-purpose bit flag values change.

## Previous behavior

Previously, .NET preserved the general-purpose bits for every [System.IO.Compression.ZipArchiveEntry](https://learn.microsoft.com/search/?terms=System.IO.Compression.ZipArchiveEntry) already in a [System.IO.Compression.ZipArchive](https://learn.microsoft.com/search/?terms=System.IO.Compression.ZipArchive) when it was loaded and new entries were added. However, calling [System.IO.Compression.ZipArchive.CreateEntry(System.String,System.IO.Compression.CompressionLevel)](https://learn.microsoft.com/search/?terms=System.IO.Compression.ZipArchive.CreateEntry(System.String%2CSystem.IO.Compression.CompressionLevel)) always resulted in bits 1 & 2 being left at a default value of `0`, even if a [System.IO.Compression.CompressionLevel](https://learn.microsoft.com/search/?terms=System.IO.Compression.CompressionLevel) other than [System.IO.Compression.CompressionLevel.Optimal](https://learn.microsoft.com/search/?terms=System.IO.Compression.CompressionLevel.Optimal) was used.

This behavior had a downstream effect: calling [System.IO.Packaging.Package.CreatePart(System.Uri,System.String,System.IO.Packaging.CompressionOption)](https://learn.microsoft.com/search/?terms=System.IO.Packaging.Package.CreatePart(System.Uri%2CSystem.String%2CSystem.IO.Packaging.CompressionOption)) with any [System.IO.Packaging.CompressionOption](https://learn.microsoft.com/search/?terms=System.IO.Packaging.CompressionOption) resulted in bits 1 & 2 being left unset (and thus the [System.IO.Packaging.CompressionOption](https://learn.microsoft.com/search/?terms=System.IO.Packaging.CompressionOption) was always persisted to the ZIP file as [System.IO.Packaging.CompressionOption.Normal](https://learn.microsoft.com/search/?terms=System.IO.Packaging.CompressionOption.Normal)).

## New behavior

Starting in .NET 9, the [System.IO.Compression.CompressionLevel](https://learn.microsoft.com/search/?terms=System.IO.Compression.CompressionLevel) parameter is mapped to the general-purpose bit flags as indicated in the following table.

| `CompressionLevel` | Bit 1 | Bit 2 |
| --- | --- | --- |
| `NoCompression` | 0 | 0 |
| `Optimal` | 0 | 0 |
| `SmallestSize` | 1 | 0 |
| `Fastest` | 1 | 1 |

If you call [System.IO.Compression.ZipArchive.CreateEntry(System.String,System.IO.Compression.CompressionLevel)](https://learn.microsoft.com/search/?terms=System.IO.Compression.ZipArchive.CreateEntry(System.String%2CSystem.IO.Compression.CompressionLevel)) and specify [System.IO.Compression.CompressionLevel.NoCompression](https://learn.microsoft.com/search/?terms=System.IO.Compression.CompressionLevel.NoCompression), the nested file record's compression method is set to `Stored` (rather than the default value of `Deflate`.)

The general-purpose bits for `ZipArchiveEntry` records that already exist in a `ZipArchive` are still preserved if a new `ZipArchiveEntry` is added.

The `CompressionOption` enumeration values in [System.IO.Packaging.Package.CreatePart(System.Uri,System.String,System.IO.Packaging.CompressionOption)](https://learn.microsoft.com/search/?terms=System.IO.Packaging.Package.CreatePart(System.Uri%2CSystem.String%2CSystem.IO.Packaging.CompressionOption)) are mapped to `CompressionLevel` (and result in the corresponding bits being set) as shown in the following table.

| `CompressionOption` | `CompressionLevel` |
| --- | --- |
| `NotCompressed` | `NoCompression` |
| `Normal` | `Optimal` |
| `Maximum` | `SmallestSize` (.NET Framework)<br/>`Optimal` (.NET) |
| `Fast` | `Fastest` |
| `SuperFast` | `Fastest` |

## Version introduced

.NET 9 Preview 5

## Type of breaking change

This change is a [behavioral change](../../categories.md#behavioral-change).

## Reason for change

This breaking change was introduced to restore the existing .NET Framework behavior, which was omitted from .NET at the point of porting. This change also gives downstream clients (such as [System.IO.Packaging](https://learn.microsoft.com/search/?terms=System.IO.Packaging)) control over the value of these bits.

## Recommended action

If you want to ensure that new `ZipArchiveEntry` records added to the `ZipArchive` have general-purpose bit flags of `0`, specify a `CompressionLevel` of `CompressionLevel.Optimal` or `CompressionLevel.NoCompression` when you call [System.IO.Compression.ZipArchive.CreateEntry(System.String,System.IO.Compression.CompressionLevel)](https://learn.microsoft.com/search/?terms=System.IO.Compression.ZipArchive.CreateEntry(System.String%2CSystem.IO.Compression.CompressionLevel)).

If you use [System.IO.Packaging.Package.CreatePart(System.Uri,System.String,System.IO.Packaging.CompressionOption)](https://learn.microsoft.com/search/?terms=System.IO.Packaging.Package.CreatePart(System.Uri%2CSystem.String%2CSystem.IO.Packaging.CompressionOption)) to add parts to an OPC package, specify a `CompressionOption` of `CompressionOption.NotCompressed` or `CompressionOption.Normal`.

## Affected APIs

- [System.IO.Compression.ZipArchive.CreateEntry(System.String,System.IO.Compression.CompressionLevel)](https://learn.microsoft.com/search/?terms=System.IO.Compression.ZipArchive.CreateEntry(System.String%2CSystem.IO.Compression.CompressionLevel))
- [System.IO.Packaging.Package.CreatePart(System.Uri,System.String,System.IO.Packaging.CompressionOption)](https://learn.microsoft.com/search/?terms=System.IO.Packaging.Package.CreatePart(System.Uri%2CSystem.String%2CSystem.IO.Packaging.CompressionOption))
