# Source code: docs/csharp/language-reference/statements/snippets/iteration-statements/WhileStatement.cs

Complete source file; linked examples may select a region or line range.

```
namespace IterationStatements;

public static class WhileStatement
{
    public static void Examples()
    {
        Example();
    }

    private static void Example()
    {
        // <Example>
        int n = 0;
        while (n < 5)
        {
            Console.Write(n);
            n++;
        }
        // Output:
        // 01234
        // </Example>
        Console.WriteLine();
    }
}

```
