---
title: "Breaking change: FileConfigurationProvider.Load throws InvalidDataException"
description: Learn about the .NET 6 breaking change in .NET extensions where Load can throw an InvalidDataException with the file path that failed to load.
ms.date: 11/05/2021
---
# FileConfigurationProvider.Load throws InvalidDataException

When [Microsoft.Extensions.Configuration.FileConfigurationProvider.Load](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.FileConfigurationProvider.Load) fails to load a file, it throws an [System.IO.InvalidDataException](https://learn.microsoft.com/search/?terms=System.IO.InvalidDataException). If the file or directory doesn't exist, it throws a [System.IO.DirectoryNotFoundException](https://learn.microsoft.com/search/?terms=System.IO.DirectoryNotFoundException) or [System.IO.FileNotFoundException](https://learn.microsoft.com/search/?terms=System.IO.FileNotFoundException).

## Version introduced

6.0 RC 1

## Previous behavior

When loading failed, [Microsoft.Extensions.Configuration.FileConfigurationProvider.Load](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.FileConfigurationProvider.Load) did not throw an [System.IO.InvalidDataException](https://learn.microsoft.com/search/?terms=System.IO.InvalidDataException).

## New behavior

Starting in .NET 6, [Microsoft.Extensions.Configuration.FileConfigurationProvider.Load](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.FileConfigurationProvider.Load) throws an [System.IO.InvalidDataException](https://learn.microsoft.com/search/?terms=System.IO.InvalidDataException) if a file fails to load. In addition, the exception message includes the file path that failed to load.

## Type of breaking change

This change can affect [source compatibility](../../categories.md#source-compatibility).

## Reason for change

This change improves the debugging experience. When a file fails to load, it's helpful to know which file failed to load.

## Recommended action

If you are catching specific exceptions when calling [Microsoft.Extensions.Configuration.FileConfigurationProvider.Load](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.FileConfigurationProvider.Load), make sure to also catch [System.IO.InvalidDataException](https://learn.microsoft.com/search/?terms=System.IO.InvalidDataException).

## Affected APIs

- [Microsoft.Extensions.Configuration.FileConfigurationProvider.Load](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.Configuration.FileConfigurationProvider.Load)
