---
title: "Common I/O Tasks"
description: Learn how to do common file tasks & common directory tasks using classes & methods in the System.IO namespace in .NET.
ms.date: "03/30/2017"
helpviewer_keywords:
  - "I/O, common tasks"
---
# Common I/O Tasks

The [System.IO](https://learn.microsoft.com/search/?terms=System.IO) namespace provides several classes that allow for various actions, such as reading and writing, to be performed on files, directories, and streams. For more information, see [File and Stream I/O](index.md).

## Common File Tasks

| To do this... | See the example in this topic... |
| --- | --- |
| Create a text file | [System.IO.File.CreateText*](https://learn.microsoft.com/search/?terms=System.IO.File.CreateText*) method<br /><br /> [System.IO.FileInfo.CreateText*](https://learn.microsoft.com/search/?terms=System.IO.FileInfo.CreateText*) method<br /><br /> [System.IO.File.Create*](https://learn.microsoft.com/search/?terms=System.IO.File.Create*) method<br /><br /> [System.IO.FileInfo.Create*](https://learn.microsoft.com/search/?terms=System.IO.FileInfo.Create*) method |
| Write to a text file | [How to: Write Text to a File](how-to-write-text-to-a-file.md)<br /><br /> [How to: Write a Text File (C++/CLI)](https://learn.microsoft.com/cpp/dotnet/how-to-write-a-text-file-cpp-cli) |
| Read from a text file | [How to: Read Text from a File](how-to-read-text-from-a-file.md) |
| Append text to a file | [How to: Open and Append to a Log File](how-to-open-and-append-to-a-log-file.md)<br /><br /> [System.IO.File.AppendText*](https://learn.microsoft.com/search/?terms=System.IO.File.AppendText*) method<br /><br /> [System.IO.FileInfo.AppendText*](https://learn.microsoft.com/search/?terms=System.IO.FileInfo.AppendText*) method |
| Rename or move a file | [System.IO.File.Move*](https://learn.microsoft.com/search/?terms=System.IO.File.Move*) method<br /><br /> [System.IO.FileInfo.MoveTo*](https://learn.microsoft.com/search/?terms=System.IO.FileInfo.MoveTo*) method |
| Delete a file | [System.IO.File.Delete*](https://learn.microsoft.com/search/?terms=System.IO.File.Delete*) method<br /><br /> [System.IO.FileInfo.Delete*](https://learn.microsoft.com/search/?terms=System.IO.FileInfo.Delete*) method |
| Copy a file | [System.IO.File.Copy*](https://learn.microsoft.com/search/?terms=System.IO.File.Copy*) method<br /><br /> [System.IO.FileInfo.CopyTo*](https://learn.microsoft.com/search/?terms=System.IO.FileInfo.CopyTo*) method |
| Get the size of a file | [System.IO.FileInfo.Length](https://learn.microsoft.com/search/?terms=System.IO.FileInfo.Length) property |
| Get the attributes of a file | [System.IO.File.GetAttributes*](https://learn.microsoft.com/search/?terms=System.IO.File.GetAttributes*) method |
| Set the attributes of a file | [System.IO.File.SetAttributes*](https://learn.microsoft.com/search/?terms=System.IO.File.SetAttributes*) method |
| Determine whether a file exists | [System.IO.File.Exists*](https://learn.microsoft.com/search/?terms=System.IO.File.Exists*) method |
| Read from a binary file | [How to: Read and Write to a Newly Created Data File](how-to-read-and-write-to-a-newly-created-data-file.md) |
| Write to a binary file | [How to: Read and Write to a Newly Created Data File](how-to-read-and-write-to-a-newly-created-data-file.md) |
| Retrieve a file name extension | [System.IO.Path.GetExtension*](https://learn.microsoft.com/search/?terms=System.IO.Path.GetExtension*) method |
| Retrieve the fully qualified path of a file | [System.IO.Path.GetFullPath*](https://learn.microsoft.com/search/?terms=System.IO.Path.GetFullPath*) method |
| Retrieve the file name and extension from a path | [System.IO.Path.GetFileName*](https://learn.microsoft.com/search/?terms=System.IO.Path.GetFileName*) method |
| Change the extension of a file | [System.IO.Path.ChangeExtension*](https://learn.microsoft.com/search/?terms=System.IO.Path.ChangeExtension*) method |

## Common Directory Tasks

| To do this... | See the example in this topic... |
| --- | --- |
| Access a file in a special folder such as My Documents | [How to: Write Text to a File](how-to-write-text-to-a-file.md) |
| Create a directory | [System.IO.Directory.CreateDirectory*](https://learn.microsoft.com/search/?terms=System.IO.Directory.CreateDirectory*) method<br /><br /> [System.IO.FileInfo.Directory](https://learn.microsoft.com/search/?terms=System.IO.FileInfo.Directory) property |
| Create a subdirectory | [System.IO.DirectoryInfo.CreateSubdirectory*](https://learn.microsoft.com/search/?terms=System.IO.DirectoryInfo.CreateSubdirectory*) method |
| Rename or move a directory | [System.IO.Directory.Move*](https://learn.microsoft.com/search/?terms=System.IO.Directory.Move*) method<br /><br /> [System.IO.DirectoryInfo.MoveTo*](https://learn.microsoft.com/search/?terms=System.IO.DirectoryInfo.MoveTo*) method |
| Copy a directory | [How to: Copy Directories](how-to-copy-directories.md) |
| Delete a directory | [System.IO.Directory.Delete*](https://learn.microsoft.com/search/?terms=System.IO.Directory.Delete*) method<br /><br /> [System.IO.DirectoryInfo.Delete*](https://learn.microsoft.com/search/?terms=System.IO.DirectoryInfo.Delete*) method |
| See the files and subdirectories in a directory | [How to: Enumerate Directories and Files](how-to-enumerate-directories-and-files.md) |
| Find the size of a directory | [System.IO.Directory](https://learn.microsoft.com/search/?terms=System.IO.Directory) class |
| Determine whether a directory exists | [System.IO.Directory.Exists*](https://learn.microsoft.com/search/?terms=System.IO.Directory.Exists*) method |

## See also

- [File and Stream I/O](index.md)
- [Composing Streams](composing-streams.md)
- [Asynchronous File I/O](asynchronous-file-i-o.md)
