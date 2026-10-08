# Source code: docs/csharp/tutorials/snippets/top-level-statements/Utilities.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Threading.Tasks;

namespace MyNamespace;

public static class Utilities
{
    // <Animation>
    public static async Task ShowConsoleAnimation()
    {
        string[] animations = ["| -", "/ \\", "- |", "\\ /"];
        for (int i = 0; i < 20; i++)
        {
            foreach (string s in animations)
            {
                Console.Write(s);
                await Task.Delay(50);
                Console.Write("\b\b\b");
            }
        }
        Console.WriteLine();
    }
    // </Animation>
}


```
