---
title: ".NET 6 breaking change: FileStream doesn't synchronize file offset with OS"
description: Learn about the .NET 6 breaking change in core .NET libraries where FileStream doesn't synchronize the file offset with the operating system.
ms.date: 10/04/2022
---
# FileStream no longer synchronizes file offset with OS

To improve performance, [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream) no longer synchronizes the file offset with the operating system.

## Change description

In previous .NET versions, [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream) synchronizes the file offset with the Windows operating system (OS) when it reads or writes to a file. It synchronizes the offset by calling [SetFilePointer](https://learn.microsoft.com/windows/win32/api/fileapi/nf-fileapi-setfilepointer), which is an expensive system call. Starting in .NET 6, [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream) no longer synchronizes the file offset, and instead just keeps the offset in memory. [System.IO.FileStream.Position](https://learn.microsoft.com/search/?terms=System.IO.FileStream.Position) always returns the current offset, but if you obtain the file handle from [System.IO.FileStream.SafeFileHandle](https://learn.microsoft.com/search/?terms=System.IO.FileStream.SafeFileHandle) and query the OS for the current file offset using a system call, the offset value will be 0.

The following code shows how the file offset differs between previous .NET versions and .NET 6.

```csharp
[DllImport("kernel32.dll")]
private static extern bool SetFilePointerEx(SafeFileHandle hFile, long liDistanceToMove, out long lpNewFilePointer, uint dwMoveMethod);

byte[] bytes = new byte[10_000];
string path = Path.Combine(Path.GetTempPath(), Path.GetTempFileName());

using (FileStream fs = new FileStream(path, FileMode.Create, FileAccess.ReadWrite, FileShare.None, bufferSize: 4096, useAsync: true))
{
    SafeFileHandle handle = fs.SafeFileHandle;

    await fs.WriteAsync(bytes, 0, bytes.Length);
    Console.WriteLine(fs.Position); // 10000 in all versions

    if (SetFilePointerEx(handle, 0, out long currentOffset, 1 /* get current offset */))
    {
        Console.WriteLine(currentOffset);  // 10000 in .NET 5, 0 in .NET 6
    }
}
```

## Version introduced

.NET 6

## Reason for change

This change was introduced to improve the performance of asynchronous reads and writes and to address the following issues:

- [Win32 FileStream will issue a seek on every ReadAsync call](https://github.com/dotnet/runtime/issues/16354)
- [FileStream.Windows useAsync WriteAsync calls blocking APIs](https://github.com/dotnet/runtime/issues/25905)

With this change, [System.IO.FileStream.ReadAsync*](https://learn.microsoft.com/search/?terms=System.IO.FileStream.ReadAsync*) operations are up to two times faster, and [System.IO.FileStream.WriteAsync*](https://learn.microsoft.com/search/?terms=System.IO.FileStream.WriteAsync*) operations are up to five times faster.

## Recommended action

- Modify any code that relied on the offset being synchronized.

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

  > **Note:**
  > This switch is only available in .NET 6. It was [removed in .NET 7](../7.0/filestream-compat-switch.md).

## Affected APIs

None.

## See also

- [SetFilePointer function](https://learn.microsoft.com/windows/win32/api/fileapi/nf-fileapi-setfilepointer)
- [SetFilePointerEx function](https://learn.microsoft.com/windows/win32/api/fileapi/nf-fileapi-setfilepointerex)
