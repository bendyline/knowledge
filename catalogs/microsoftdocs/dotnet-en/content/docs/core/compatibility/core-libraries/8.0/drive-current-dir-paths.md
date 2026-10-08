---
title: "Breaking change: Drive's current directory path enumeration"
description: Learn about the .NET 8 breaking change in core .NET libraries where files are enumerated without a separator after the path when the path is the drive's current directory.
ms.date: 02/09/2024
---
# Drive's current directory path enumeration

File system entries obtained using a path argument in the shape of a "drive's current directory", for example, `C:`, were incorrectly formed by combining `directory path + separator + entry name`. To return the correct path for the entries, the separator is no longer added with such paths.

## Previous behavior

Previously, a separator character was added such that the enumerated file system entries appeared to be in the drive's root.

```csharp
string pathToEnumerate = "C:";

Console.WriteLine($"Full path of \"{pathToEnumerate}\" is {Path.GetFullPath(pathToEnumerate)}.");
Path.GetFullPath(pathToEnumerate);

Console.WriteLine($"Enumerating files and folders in \"{pathToEnumerate}\".");
foreach (string entry in Directory.GetFileSystemEntries(pathToEnumerate))
{
    Console.WriteLine(entry);
}
```

The output from running this code snippet was as follows.

```output
Full path of "C:" is C:\Users\myalias\consoleapps\Program

Enumerating files and folders in "C:".
C:\Program.csproj
C:\Program.sln
C:\bin
C:\obj
C:\Program.cs
```

## New behavior

Running the same code snippet in .NET 8 and later versions produces output without a separator character in each path.

```output
Full path of "C:" is C:\Users\myalias\consoleapps\Program.

Enumerating files and folders in "C:".
C:Program.csproj
C:Program.sln
C:bin
C:obj
C:Program.cs
```

## Version introduced

.NET 8

## Type of breaking change

This change is a [behavioral change](../../categories.md#behavioral-change).

## Reason for change

Users reported that the previous behavior was incorrect. It was also a regression from .NET Framework.

## Recommended action

If you're a Windows user who relies on enumeration of paths like `C:`, you should re-evaluate your application's I/O operations. This is an unusual scenario that's unlikely to be used in production. Most users who want to enumerate the current directory use [System.Environment.CurrentDirectory](https://learn.microsoft.com/search/?terms=System.Environment.CurrentDirectory) instead.

## Affected APIs

- [System.IO.Directory.EnumerateFiles*](https://learn.microsoft.com/search/?terms=System.IO.Directory.EnumerateFiles*)
- [System.IO.Directory.EnumerateDirectories*](https://learn.microsoft.com/search/?terms=System.IO.Directory.EnumerateDirectories*)
- [System.IO.Directory.EnumerateFileSystemEntries*](https://learn.microsoft.com/search/?terms=System.IO.Directory.EnumerateFileSystemEntries*)
- [System.IO.Directory.GetFiles*](https://learn.microsoft.com/search/?terms=System.IO.Directory.GetFiles*)
- [System.IO.Directory.GetDirectories*](https://learn.microsoft.com/search/?terms=System.IO.Directory.GetDirectories*)
- [System.IO.Directory.GetFileSystemEntries*](https://learn.microsoft.com/search/?terms=System.IO.Directory.GetFileSystemEntries*)
- [System.IO.DirectoryInfo.EnumerateFiles*](https://learn.microsoft.com/search/?terms=System.IO.DirectoryInfo.EnumerateFiles*)
- [System.IO.DirectoryInfo.EnumerateDirectories*](https://learn.microsoft.com/search/?terms=System.IO.DirectoryInfo.EnumerateDirectories*)
- [System.IO.DirectoryInfo.EnumerateFileSystemInfos*](https://learn.microsoft.com/search/?terms=System.IO.DirectoryInfo.EnumerateFileSystemInfos*)
- [System.IO.DirectoryInfo.GetFiles*](https://learn.microsoft.com/search/?terms=System.IO.DirectoryInfo.GetFiles*)
- [System.IO.DirectoryInfo.GetDirectories*](https://learn.microsoft.com/search/?terms=System.IO.DirectoryInfo.GetDirectories*)
- [System.IO.DirectoryInfo.GetFileSystemInfos*](https://learn.microsoft.com/search/?terms=System.IO.DirectoryInfo.GetFileSystemInfos*)
- [System.IO.Enumeration.FileSystemEnumerable`1.%23ctor(System.String,System.IO.Enumeration.FileSystemEnumerable{`0}.FindTransform,System.IO.EnumerationOptions)](https://learn.microsoft.com/search/?terms=System.IO.Enumeration.FileSystemEnumerable%601.%2523ctor(System.String%2CSystem.IO.Enumeration.FileSystemEnumerable%7B%600%7D.FindTransform%2CSystem.IO.EnumerationOptions))
