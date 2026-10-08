---
description: "Learn more about: Classes Used in .NET Framework File I/O and the File System (Visual Basic)"
title: "Classes Used in .NET Framework File I/O and the File System"
ms.date: 07/20/2015
helpviewer_keywords:
  - "file I/O classes"
ms.assetid: 4a5ca924-eea8-4a95-a5f0-6ac10de276a3
---
# Classes Used in .NET Framework File I/O and the File System (Visual Basic)

The following tables list the classes commonly used for .NET Framework file I/O, categorized into file I/O classes, classes used for creating streams, and classes used to read and write to streams.

## Basic I/O Classes for Files, Drives, and Directories

 The following table lists and describes the main classes used for file I/O.

| Class | Description |
| --- | --- |
| [System.IO.Directory](https://learn.microsoft.com/search/?terms=System.IO.Directory) | Provides static methods for creating, moving, and enumerating through directories and subdirectories. |
| [System.IO.DirectoryInfo](https://learn.microsoft.com/search/?terms=System.IO.DirectoryInfo) | Provides instance methods for creating, moving, and enumerating through directories and subdirectories. |
| [System.IO.DriveInfo](https://learn.microsoft.com/search/?terms=System.IO.DriveInfo) | Provides instance methods for creating, moving, and enumerating through drives. |
| [System.IO.File](https://learn.microsoft.com/search/?terms=System.IO.File) | Provides static methods for creating, copying, deleting, moving, and opening files, and aids in the creation of a `FileStream`. |
| [System.IO.FileAccess](https://learn.microsoft.com/search/?terms=System.IO.FileAccess) | Defines constants for read, write, or read/write access to a file. |
| [System.IO.FileAttributes](https://learn.microsoft.com/search/?terms=System.IO.FileAttributes) | Provides attributes for files and directories such as `Archive`, `Hidden`, and `ReadOnly`. |
| [System.IO.FileInfo](https://learn.microsoft.com/search/?terms=System.IO.FileInfo) | Provides static methods for creating, copying, deleting, moving, and opening files, and aids in the creation of a `FileStream`. |
| [System.IO.FileMode](https://learn.microsoft.com/search/?terms=System.IO.FileMode) | Controls how a file is opened. This parameter is specified in many of the constructors for `FileStream` and `IsolatedStorageFileStream`, and for the `Open` methods of [System.IO.File](https://learn.microsoft.com/search/?terms=System.IO.File) and [System.IO.FileInfo](https://learn.microsoft.com/search/?terms=System.IO.FileInfo). |
| [System.IO.FileShare](https://learn.microsoft.com/search/?terms=System.IO.FileShare) | Defines constants for controlling the type of access other file streams can have to the same file. |
| [System.IO.Path](https://learn.microsoft.com/search/?terms=System.IO.Path) | Provides methods and properties for processing directory strings. |
| [System.Security.Permissions.FileIOPermission](https://learn.microsoft.com/search/?terms=System.Security.Permissions.FileIOPermission) | Controls the access of files and folders by defining [System.Security.Permissions.FileIOPermissionAttribute.Read*](https://learn.microsoft.com/search/?terms=System.Security.Permissions.FileIOPermissionAttribute.Read*), [System.Security.Permissions.FileIOPermissionAttribute.Write*](https://learn.microsoft.com/search/?terms=System.Security.Permissions.FileIOPermissionAttribute.Write*), [System.Security.Permissions.FileIOPermissionAttribute.Append*](https://learn.microsoft.com/search/?terms=System.Security.Permissions.FileIOPermissionAttribute.Append*) and [System.Security.Permissions.FileIOPermissionAttribute.PathDiscovery*](https://learn.microsoft.com/search/?terms=System.Security.Permissions.FileIOPermissionAttribute.PathDiscovery*) permissions. |

## Classes Used to Create Streams

 The following table lists and describes the main classes used to create streams.

| Class | Description |
| --- | --- |
| [System.IO.BufferedStream](https://learn.microsoft.com/search/?terms=System.IO.BufferedStream) | Adds a buffering layer to read and write operations on another stream. |
| [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream) | Supports random access to files through its [System.IO.FileStream.Seek*](https://learn.microsoft.com/search/?terms=System.IO.FileStream.Seek*) method. [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream) opens files synchronously by default but also supports asynchronous operation. |
| [System.IO.MemoryStream](https://learn.microsoft.com/search/?terms=System.IO.MemoryStream) | Creates a stream whose backing store is memory, rather than a file. |
| [System.Net.Sockets.NetworkStream](https://learn.microsoft.com/search/?terms=System.Net.Sockets.NetworkStream) | Provides the underlying stream of data for network access. |
| [System.Security.Cryptography.CryptoStream](https://learn.microsoft.com/search/?terms=System.Security.Cryptography.CryptoStream) | Defines a stream that links data streams to cryptographic transformations. |

## Classes Used to Read from and Write to Streams

 The following table shows the specific classes used for reading from and writing to files with streams.

| **Class** | **Description** |
| --- | --- |
| [System.IO.BinaryReader](https://learn.microsoft.com/search/?terms=System.IO.BinaryReader) | Reads encoded strings and primitive data types from a [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream). |
| [System.IO.BinaryWriter](https://learn.microsoft.com/search/?terms=System.IO.BinaryWriter) | Writes encoded strings and primitive data types to a [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream). |
| [System.IO.StreamReader](https://learn.microsoft.com/search/?terms=System.IO.StreamReader) | Reads characters from a [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream), using [System.IO.StreamReader.CurrentEncoding*](https://learn.microsoft.com/search/?terms=System.IO.StreamReader.CurrentEncoding*) to convert characters to and from bytes. [System.IO.StreamReader](https://learn.microsoft.com/search/?terms=System.IO.StreamReader) has a constructor that attempts to ascertain the correct [System.IO.StreamReader.CurrentEncoding*](https://learn.microsoft.com/search/?terms=System.IO.StreamReader.CurrentEncoding*) for a given stream, based on the presence of a [System.IO.StreamReader.CurrentEncoding*](https://learn.microsoft.com/search/?terms=System.IO.StreamReader.CurrentEncoding*)-specific preamble, such as a byte order mark. |
| [System.IO.StreamWriter](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter) | Writes characters to a `FileStream`, using [System.IO.StreamWriter.Encoding*](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter.Encoding*) to convert characters to bytes. |
| [System.IO.StringReader](https://learn.microsoft.com/search/?terms=System.IO.StringReader) | Reads characters from a `String`. Output can be either a stream in any encoding or a `String`. |
| [System.IO.StringWriter](https://learn.microsoft.com/search/?terms=System.IO.StringWriter) | Writes characters to a `String`. Output can be either a stream in any encoding or a `String`. |

## See also

- [Composing Streams](../../../../standard/io/composing-streams.md)
- [File and Stream I/O](../../../../standard/io/index.md)
- [Asynchronous File I/O](../../../../standard/io/asynchronous-file-i-o.md)
- [Basics of .NET Framework File I/O and the File System (Visual Basic)](basics-of-net-framework-file-io-and-the-file-system.md)
- [Core .NET libraries overview](../../../../standard/class-library-overview.md)
