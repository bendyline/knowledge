# Source code: docs/csharp/language-reference/builtin-types/snippets/shared/VoidType.cs

Complete source file; linked examples may select a region or line range.

```
namespace builtin_types;

public static class VoidType
{
    public static void Examples()
    {
        Display([1, 2, 9]);
    }

    // <SnippetVoidExample>
    public static void Display(IEnumerable<int> numbers)
    {
        if (numbers is null)
        {
            return;
        }

        Console.WriteLine(string.Join(" ", numbers));
    }
    // </SnippetVoidExample>
}

```
