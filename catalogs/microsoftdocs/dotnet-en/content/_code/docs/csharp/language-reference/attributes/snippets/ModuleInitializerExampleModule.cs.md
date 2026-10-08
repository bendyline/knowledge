# Source code: docs/csharp/language-reference/attributes/snippets/ModuleInitializerExampleModule.cs

Complete source file; linked examples may select a region or line range.

```
using System.Runtime.CompilerServices;

internal class ModuleInitializerExampleModule
{
    public static string? Text { get; set; }

    [ModuleInitializer]
    public static void Init1()
    {
        Text += "Hello from Init1! ";
    }

    [ModuleInitializer]
    public static void Init2()
    {
        Text += "Hello from Init2! ";
    }
}

```
