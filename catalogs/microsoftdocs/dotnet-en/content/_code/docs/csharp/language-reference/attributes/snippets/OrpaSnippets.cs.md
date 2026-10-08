# Source code: docs/csharp/language-reference/attributes/snippets/OrpaSnippets.cs

Complete source file; linked examples may select a region or line range.

```
using System.Runtime.CompilerServices;

namespace attributes;
public class OverloadExample
{

    public static void OrpaExample()
    {
        // <SnippetOrpaExample>
        var d = new OverloadExample();
        int[] arr = [1, 2, 3];
        d.M(1, 2, 3, 4); // Prints "Span"
        d.M(arr); // Prints "Span" when PriorityAttribute is applied
        d.M([1, 2, 3, 4]); // Prints "Span"
        d.M(1, 2, 3, 4); // Prints "Span"
        // </SnippetOrpaExample>
    }

    // <SnippetOverloadExample>
    [OverloadResolutionPriority(1)]
    public void M(params ReadOnlySpan<int> s) => Console.WriteLine("Span");
    // Default overload resolution priority of 0
    public void M(params int[] a) => Console.WriteLine("Array");
    // </SnippetOverloadExample>
}

```
