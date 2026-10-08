---
title: "Breaking change: Assembly-related API behavior changes for single-file publishing format"
description: Learn about the .NET 5 breaking change in core .NET libraries where multiple APIs related to an assembly's file location have behavior changes when they're invoked in a single-file publishing format.
ms.date: 11/01/2020
---
# Assembly-related API behavior changes for single-file publishing format

Multiple APIs related to an assembly's file location have behavior changes when they're invoked in a single-file publishing format.

## Change description

In single-file publishing for .NET 5 and later versions, bundled assemblies are loaded from memory instead of extracted to disk. For single-file published apps, this means that certain location-related APIs return different values on .NET 5 and later than on previous versions of .NET. The changes are as follows:

| API | Previous versions | .NET 5 and later |
| --- | --- | --- |
| [System.Reflection.Assembly.Location](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.Location) | Returns extracted DLL file path | Returns empty string for bundled assemblies |
| [System.Reflection.Assembly.CodeBase](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.CodeBase) | Returns extracted DLL file path | Throws exception for bundled assemblies |
| [System.Reflection.Assembly.GetFile(System.String)](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.GetFile(System.String)) | Returns `null` for bundled assemblies | Throws exception for bundled assemblies |
| `Environment.GetCommandLineArgs()[0]` | Value is the name of the entry point DLL | Value is the name of the host executable |
| [System.AppContext.BaseDirectory](https://learn.microsoft.com/search/?terms=System.AppContext.BaseDirectory) | Value is the temporary extraction directory | Value is the containing directory of the host executable |

## Version introduced

5.0

## Recommended action

Avoid dependencies on the file location of assemblies when publishing as a single file.

## Affected APIs

- [System.Reflection.Assembly.Location](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.Location)
- [System.Reflection.Assembly.CodeBase](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.CodeBase)
- [System.Reflection.Assembly.GetFile(System.String)](https://learn.microsoft.com/search/?terms=System.Reflection.Assembly.GetFile(System.String))
- [System.Environment.GetCommandLineArgs](https://learn.microsoft.com/search/?terms=System.Environment.GetCommandLineArgs)
- [System.AppContext.BaseDirectory](https://learn.microsoft.com/search/?terms=System.AppContext.BaseDirectory)

<!--

### Category

Core .NET libraries

### Affected APIs

- `P:System.Reflection.Assembly.Location`
- `P:System.Reflection.Assembly.CodeBase`
- `M:System.Reflection.Assembly.GetFile(System.String)`
- `M:System.Environment.GetCommandLineArgs`
- `P:System.AppContext.BaseDirectory`

-->
