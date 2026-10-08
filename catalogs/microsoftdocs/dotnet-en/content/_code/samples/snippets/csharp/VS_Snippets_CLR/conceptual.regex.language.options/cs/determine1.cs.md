# Source code: samples/snippets/csharp/VS_Snippets_CLR/conceptual.regex.language.options/cs/determine1.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Text.RegularExpressions;

public class DetermineOptionsExample
{
    public static void Main()
    {
        Regex rgx = new Regex(@"\w*\s", RegexOptions.IgnoreCase);
        // <Snippet19>
        if ((rgx.Options & RegexOptions.IgnoreCase) == RegexOptions.IgnoreCase)
            Console.WriteLine("Case-insensitive pattern comparison.");
        else
            Console.WriteLine("Case-sensitive pattern comparison.");
        // </Snippet19>
        // <Snippet20>
        if (rgx.Options == RegexOptions.None)
            Console.WriteLine("No options have been set.");
        // </Snippet20>
    }
}

```
