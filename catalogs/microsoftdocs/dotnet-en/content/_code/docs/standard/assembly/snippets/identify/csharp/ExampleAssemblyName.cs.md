# Source code: docs/standard/assembly/snippets/identify/csharp/ExampleAssemblyName.cs

Complete source file; linked examples may select a region or line range.

```
//<SnippetAssemblyName>
using System;
using System.IO;
using System.Reflection;
using System.Runtime.InteropServices;

static class ExampleAssemblyName
{
    public static void CheckAssembly()
    {
        try
        {
            string path = Path.Combine(
                RuntimeEnvironment.GetRuntimeDirectory(),
                "System.Net.dll");

            AssemblyName testAssembly = AssemblyName.GetAssemblyName(path);
            Console.WriteLine("Yes, the file is an assembly.");
        }
        catch (FileNotFoundException)
        {
            Console.WriteLine("The file cannot be found.");
        }
        catch (BadImageFormatException)
        {
            Console.WriteLine("The file is not an assembly.");
        }
        catch (FileLoadException)
        {
            Console.WriteLine("The assembly has already been loaded.");
        }
    }

    /* Output: 
    Yes, the file is an assembly.  
    */
}
//</SnippetAssemblyName>

```
