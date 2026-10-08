# Source code: docs/core/tutorials/snippets/create-class-library/csharp/StringLibrary/Class1.cs

Complete source file; linked examples may select a region or line range.

```
namespace UtilityLibraries;

public static class StringLibrary
{
    public static bool StartsWithUpper(this string? str)
    {
        if (string.IsNullOrWhiteSpace(str))
            return false;

        return char.IsUpper(str[0]);
    }
}

```
