# Source code: docs/csharp/fundamentals/program-structure/snippets/main-command-line/Program.cs

Complete source file; linked examples may select a region or line range.

```
namespace main_command_line;

class Program
{
    static int Main(string[] args)
    {
        //<Snippet4>
        if (args.Length == 0)
        {
            System.Console.WriteLine("Please enter a numeric argument.");
            return 1;
        }
        //</Snippet4>

        return 0;
    }
}


```
