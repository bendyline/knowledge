---
title: "Handling I/O errors in .NET"
description: Learn how to handle I/O errors in .NET. Map error codes to exceptions, handle exceptions in I/O operations, and handle IOException.
ms.date: "08/27/2018"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "I/O, exception handling"
  - "I/O, errors"
ms.workload:
  - "dotnet"
  - "dotnetcore"
---
# Handling I/O errors in .NET

In addition to the exceptions that can be thrown in any method call (such as an [System.OutOfMemoryException](https://learn.microsoft.com/search/?terms=System.OutOfMemoryException) when a system is stressed or an [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException) due to programmer error), .NET file system methods can throw the following exceptions:

- [System.IO.IOException](https://learn.microsoft.com/search/?terms=System.IO.IOException), the base class of all [System.IO](https://learn.microsoft.com/search/?terms=System.IO) exception types. It is thrown for errors whose return codes from the operating system don't directly map to any other exception type.
- [System.IO.FileNotFoundException](https://learn.microsoft.com/search/?terms=System.IO.FileNotFoundException).
- [System.IO.DirectoryNotFoundException](https://learn.microsoft.com/search/?terms=System.IO.DirectoryNotFoundException).
- [System.IO.DriveNotFoundException](https://learn.microsoft.com/search/?terms=System.IO.DriveNotFoundException).
- [System.IO.PathTooLongException](https://learn.microsoft.com/search/?terms=System.IO.PathTooLongException).
- [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException).
- [System.UnauthorizedAccessException](https://learn.microsoft.com/search/?terms=System.UnauthorizedAccessException).
- [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException), which is thrown for invalid path characters on .NET Framework and on .NET Core 2.0 and previous versions.
- [System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException), which is thrown for invalid colons in .NET Framework.
- [System.Security.SecurityException](https://learn.microsoft.com/search/?terms=System.Security.SecurityException), which is thrown for applications running in limited trust that lack the necessary permissions on .NET Framework only. (Full trust is the default on .NET Framework.)

## Mapping error codes to exceptions

Because the file system is an operating system resource, I/O methods in both .NET Core and .NET Framework wrap calls to the underlying operating system. When an I/O error occurs in code executed by the operating system, the operating system returns error information to the .NET I/O method. The method then translates the error information, typically in the form of an error code, into a .NET exception type. In most cases, it does this by directly translating the error code into its corresponding exception type; it does not perform any special mapping of the error based on the context of the method call.

For example, on the Windows operating system, a method call that returns an error code of `ERROR_FILE_NOT_FOUND` (or 0x02) maps to a [System.IO.FileNotFoundException](https://learn.microsoft.com/search/?terms=System.IO.FileNotFoundException), and an error code of `ERROR_PATH_NOT_FOUND` (or 0x03) maps to a [System.IO.DirectoryNotFoundException](https://learn.microsoft.com/search/?terms=System.IO.DirectoryNotFoundException).

However, the precise conditions under which the operating system returns particular error codes is often undocumented or poorly documented. As a result, unexpected exceptions can occur. For example, because you are working with a directory rather than a file, you would expect that providing an invalid directory path to the [System.IO.DirectoryInfo.%23ctor*](https://learn.microsoft.com/search/?terms=System.IO.DirectoryInfo.%2523ctor*) constructor throws a [System.IO.DirectoryNotFoundException](https://learn.microsoft.com/search/?terms=System.IO.DirectoryNotFoundException). However, it may also throw a [System.IO.FileNotFoundException](https://learn.microsoft.com/search/?terms=System.IO.FileNotFoundException).

## Exception handling in I/O operations

Because of this reliance on the operating system, identical exception conditions (such as the directory not found error in our example) can result in an I/O method throwing any one of the entire class of I/O exceptions. This means that, when calling I/O APIs, your code should be prepared to handle most or all of these exceptions, as shown in the following table:

| Exception type | .NET Core/.NET 5+ | .NET Framework |
| --- | --- | --- |
| [System.IO.IOException](https://learn.microsoft.com/search/?terms=System.IO.IOException) | Yes | Yes |
| [System.IO.FileNotFoundException](https://learn.microsoft.com/search/?terms=System.IO.FileNotFoundException) | Yes | Yes |
| [System.IO.DirectoryNotFoundException](https://learn.microsoft.com/search/?terms=System.IO.DirectoryNotFoundException) | Yes | Yes |
| [System.IO.DriveNotFoundException](https://learn.microsoft.com/search/?terms=System.IO.DriveNotFoundException) | Yes | Yes |
| [System.IO.PathTooLongException](https://learn.microsoft.com/search/?terms=System.IO.PathTooLongException) | Yes | Yes |
| [System.OperationCanceledException](https://learn.microsoft.com/search/?terms=System.OperationCanceledException) | Yes | Yes |
| [System.UnauthorizedAccessException](https://learn.microsoft.com/search/?terms=System.UnauthorizedAccessException) | Yes | Yes |
| [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) | .NET Core 2.0 and earlier | Yes |
| [System.NotSupportedException](https://learn.microsoft.com/search/?terms=System.NotSupportedException) | No | Yes |
| [System.Security.SecurityException](https://learn.microsoft.com/search/?terms=System.Security.SecurityException) | No | Limited trust only |

## Handling IOException

As the base class for exceptions in the [System.IO](https://learn.microsoft.com/search/?terms=System.IO) namespace, [System.IO.IOException](https://learn.microsoft.com/search/?terms=System.IO.IOException) is also thrown for any error code that does not map to a predefined exception type. This means that it can be thrown by any I/O operation.

> **Important:**
> Because [System.IO.IOException](https://learn.microsoft.com/search/?terms=System.IO.IOException) is the base class of the other exception types in the [System.IO](https://learn.microsoft.com/search/?terms=System.IO) namespace, you should handle in a `catch` block after you've handled the other I/O-related exceptions.

In addition, starting with .NET Core 2.1, validation checks for path correctness (for example, to ensure that invalid characters are not present in a path) have been removed, and the runtime throws an exception mapped from an operating system error code rather than from its own validation code. The most likely exception to be thrown in this case is an [System.IO.IOException](https://learn.microsoft.com/search/?terms=System.IO.IOException), although any other exception type could also be thrown.

Note that, in your exception handling code, you should always handle the [System.IO.IOException](https://learn.microsoft.com/search/?terms=System.IO.IOException) last. Otherwise, because it is the base class of all other IO exceptions, the catch blocks of derived classes will not be evaluated.

In the case of an [System.IO.IOException](https://learn.microsoft.com/search/?terms=System.IO.IOException), you can get additional error information from the [IOException.HResult](https://learn.microsoft.com/search/?terms=System.Exception.HResult) property. To convert the HResult value to a Win32 error code, you strip out the upper 16 bits of the 32-bit value. The following table lists error codes that may be wrapped in an [System.IO.IOException](https://learn.microsoft.com/search/?terms=System.IO.IOException).

| HResult | Constant | Description |
| --- | --- | --- |
| ERROR_SHARING_VIOLATION | 32 | The file name is missing, or the file or directory is in use. |
| ERROR_FILE_EXISTS | 80 | The file already exists. |
| ERROR_INVALID_PARAMETER | 87 | An argument supplied to the method is invalid. |
| ERROR_ALREADY_EXISTS | 183 | The file or directory already exists. |

You can handle these using a `When` clause in a catch statement, as the following example shows.

[io-exception-handling (complete source file; reference: \~/samples/snippets/standard/io/io-exceptions/cs/io-exceptions.cs)](../../../_code/samples/snippets/standard/io/io-exceptions/cs/io-exceptions.cs.md)
[io-exception-handling (complete source file; reference: \~/samples/snippets/standard/io/io-exceptions/vb/io-exceptions.vb)](../../../_code/samples/snippets/standard/io/io-exceptions/vb/io-exceptions.vb.md)

## See also

- [Handling and throwing exceptions in .NET](../exceptions/index.md)
- [Exception handling (Task Parallel Library)](../parallel-programming/exception-handling-task-parallel-library.md)
- [Best practices for exceptions](../exceptions/best-practices-for-exceptions.md)
- [How to use specific exceptions in a catch block](../exceptions/how-to-use-specific-exceptions-in-a-catch-block.md)
