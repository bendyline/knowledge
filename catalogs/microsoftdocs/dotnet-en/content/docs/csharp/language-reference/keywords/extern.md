---
description: "extern modifier - C# Reference"
title: "extern modifier"
ms.date: 01/21/2026
f1_keywords:
  - "extern_CSharpKeyword"
  - "extern"
helpviewer_keywords:
  - "DllImport attribute"
  - "extern keyword [C#]"
---
# extern (C# Reference)

Use the `extern` modifier to declare a method that's implemented externally. A common use of the `extern` modifier is with the `DllImport` attribute when you use Interop services to call into unmanaged code. In this case, you must also declare the method as `static`, as shown in the following example:

```csharp
[DllImport("avifil32.dll")]
private static extern void AVIFileInit();
```

You can also use the `extern` keyword to define an external assembly alias. By using this alias, you can reference different versions of the same component from within a single assembly. For more information, see [extern alias](extern-alias.md).


The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the [C# language version history](../../whats-new/csharp-version-history.md).


It's an error to use the [abstract](abstract.md) and `extern` modifiers together to modify the same member. Using the `extern` modifier means that the method is implemented outside the C# code, whereas using the `abstract` modifier means that the method implementation isn't provided in the class.

The `extern` keyword has more limited uses in C# than in C++. To compare the C# keyword with the C++ keyword, see [Using extern to Specify Linkage](https://learn.microsoft.com/cpp/cpp/extern-cpp#extern-c-and-extern-c-function-declarations) in the C++ Language Reference.

In this example, the program receives a string from the user and displays it inside a message box. The program uses the `MessageBox` method imported from the User32.dll library.

[language="csharp" source="./snippets/csrefKeywordsModifiers.cs" id="8"::: (complete source file; reference: ./snippets/csrefKeywordsModifiers.cs)](../../../../_code/docs/csharp/language-reference/keywords/snippets/csrefKeywordsModifiers.cs.md)

This example illustrates a C# program that calls into a C library (a native DLL).

1. Create the following C file and name it `cmdll.c`:

    ```c
    // cmdll.c
    // Compile with: -LD
    int __declspec(dllexport) SampleMethod(int i)
    {
      return i*10;
    }
    ```

1. Open a Visual Studio x64 (or x86) Native Tools Command Prompt window from the Visual Studio installation directory and compile the `cmdll.c` file by typing **cl -LD cmdll.c** at the command prompt.

1. In the same directory, create the following C# file and name it `cm.cs`:

    ```csharp
    // cm.cs
    using System;
    using System.Runtime.InteropServices;
    public class MainClass
    {
        [DllImport("Cmdll.dll")]
          public static extern int SampleMethod(int x);

        static void Main()
        {
            Console.WriteLine("SampleMethod() returns {0}.", SampleMethod(5));
        }
    }
    ```

1. Open a Visual Studio x64 (or x86) Native Tools Command Prompt window from the Visual Studio installation directory and compile the `cm.cs` file by typing:

    > **csc cm.cs** (for the x64 command prompt)
    > —or—
    > **csc -platform:x86 cm.cs** (for the x86 command prompt)

    This command creates the executable file `cm.exe`.

1. Run `cm.exe`. The `SampleMethod` method passes the value 5 to the DLL file, which returns the value multiplied by 10. The program produces the following output:

    ```output
    SampleMethod() returns 50.
    ```

## C# language specification

For more information, see the [C# Language Specification](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/includes/~/_csharpstandard/standard/README.md). The language specification is the definitive source for C# syntax and usage.


## See also

- [System.Runtime.InteropServices.DllImportAttribute](https://learn.microsoft.com/search/?terms=System.Runtime.InteropServices.DllImportAttribute)
- [C# Keywords](index.md)
- [Modifiers](index.md)
