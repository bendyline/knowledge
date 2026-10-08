# Source code: docs/csharp/language-reference/attributes/snippets/ModuleInitializerExampleMain.cs

Complete source file; linked examples may select a region or line range.

```
using System;

internal class ModuleInitializerExampleMain
{
    public static void Main()
    {
        Console.WriteLine(ModuleInitializerExampleModule.Text);
        //output: Hello from Init1! Hello from Init2!
    }
}

```
