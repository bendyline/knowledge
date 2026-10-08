---
description: "Learn more about: Console apps in .NET"
title: "Create Console Applications in .NET"
ms.date: "03/30/2017"
helpviewer_keywords:
  - ".NET, creating console applications"
  - "application development [.NET], console"
  - "console applications"
ms.assetid: c21fb997-9f0e-40a5-8741-f73bba376bd8
---
# Console apps in .NET

.NET applications can use the [System.Console](https://learn.microsoft.com/search/?terms=System.Console) class to read characters from and write characters to the console. Data from the console is read from the standard input stream, data to the console is written to the standard output stream, and error data to the console is written to the standard error output stream. These streams are automatically associated with the console when the application starts and are presented as the [System.Console.In*](https://learn.microsoft.com/search/?terms=System.Console.In*), [System.Console.Out*](https://learn.microsoft.com/search/?terms=System.Console.Out*), and [System.Console.Error](https://learn.microsoft.com/search/?terms=System.Console.Error) properties, respectively.

The value of the [System.Console.In](https://learn.microsoft.com/search/?terms=System.Console.In) property is a [System.IO.TextReader](https://learn.microsoft.com/search/?terms=System.IO.TextReader) object, whereas the values of the [System.Console.Out*](https://learn.microsoft.com/search/?terms=System.Console.Out*) and [System.Console.Error](https://learn.microsoft.com/search/?terms=System.Console.Error) properties are [System.IO.TextWriter](https://learn.microsoft.com/search/?terms=System.IO.TextWriter) objects. You can associate these properties with streams that do not represent the console, making it possible for you to point the stream to a different location for input or output. For example, you can redirect the output to a file by setting the [System.Console.Out](https://learn.microsoft.com/search/?terms=System.Console.Out) property to a [System.IO.StreamWriter](https://learn.microsoft.com/search/?terms=System.IO.StreamWriter), which encapsulates a [System.IO.FileStream](https://learn.microsoft.com/search/?terms=System.IO.FileStream) by means of the [System.Console.SetOut*](https://learn.microsoft.com/search/?terms=System.Console.SetOut*) method. The [System.Console.In*](https://learn.microsoft.com/search/?terms=System.Console.In*) and [System.Console.Out](https://learn.microsoft.com/search/?terms=System.Console.Out) properties do not need to refer to the same stream.

> **Note:**
> For more information about building console applications, including examples in C#, Visual Basic, and C++, see the documentation for the [System.Console](https://learn.microsoft.com/search/?terms=System.Console) class.

If the console does not exist, for example, in a Windows Forms application, output written to the standard output stream will not be visible, because there is no console to write the information to. Writing information to an inaccessible console does not cause an exception to be raised. (You can always change the application type to **Console Application**, for example, in the project property pages in Visual Studio).

The **System.Console** class has methods that can read individual characters or entire lines from the console. Other methods convert data and format strings, and then write the formatted strings to the console. For more information on formatting strings, see [Formatting types](base-types/formatting-types.md).

> **Tip:**
> Console applications lack a message pump that starts by default. Therefore, console calls to Microsoft Win32 timers might fail.

## See also

- [System.Console](https://learn.microsoft.com/search/?terms=System.Console)
- [Formatting Types](base-types/formatting-types.md)
