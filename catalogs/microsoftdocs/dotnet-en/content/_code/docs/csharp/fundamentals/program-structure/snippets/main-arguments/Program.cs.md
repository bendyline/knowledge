# Source code: docs/csharp/fundamentals/program-structure/snippets/main-arguments/Program.cs

Complete source file; linked examples may select a region or line range.

```
namespace main_arguments;

// <AsyncMain>
class Program
{
    static async Task<int> Main(string[] args)
    {
        return await AsyncConsoleWork();
    }

    private static async Task<int> AsyncConsoleWork()
    {
        return 0;
    }
}
// </AsyncMain>

```
