# Source code: docs/csharp/language-reference/builtin-types/snippets/shared/BoolType.cs

Complete source file; linked examples may select a region or line range.

```
namespace builtin_types;

public static class BoolType
{
    public static void Examples()
    {
        Literals();
    }

    private static void Literals()
    {
        // <SnippetLiterals>
        bool check = true;
        Console.WriteLine(check ? "Checked" : "Not checked");  // output: Checked

        Console.WriteLine(false ? "Checked" : "Not checked");  // output: Not checked
        // </SnippetLiterals>
    }
}

```
