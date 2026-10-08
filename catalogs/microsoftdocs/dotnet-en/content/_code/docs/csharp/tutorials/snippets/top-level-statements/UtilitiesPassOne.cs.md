# Source code: docs/csharp/tutorials/snippets/top-level-statements/UtilitiesPassOne.cs

Complete source file; linked examples may select a region or line range.

```
namespace FirstPass
{
    // <SnippetUtilities>
    namespace MyNamespace
    {
        public static class Utilities
        {
            public static async Task ShowConsoleAnimation()
            {
                // <AnimationFirstPass>
                for (int i = 0; i < 20; i++)
                {
                    Console.Write("| -");
                    await Task.Delay(50);
                    Console.Write("\b\b\b");
                    Console.Write("/ \\");
                    await Task.Delay(50);
                    Console.Write("\b\b\b");
                    Console.Write("- |");
                    await Task.Delay(50);
                    Console.Write("\b\b\b");
                    Console.Write("\\ /");
                    await Task.Delay(50);
                    Console.Write("\b\b\b");
                }
                Console.WriteLine();
                // </AnimationFirstPass>
            }
        }
    }
    // </SnippetUtilities>
}

```
