# Source code: docs/standard/base-types/snippets/best-practices-strings/csharp/explicitargs/Program.cs

Complete source file; linked examples may select a region or line range.

```

CompareWithDefault();
CompareExplicit();

void CompareWithDefault()
{
    //<default>
    Uri url = new("https://learn.microsoft.com/");

    // Incorrect
    if (string.Equals(url.Scheme, "https"))
    {
        // ...Code to handle HTTPS protocol.
    }
    //</default>
}

void CompareExplicit()
{
    //<explicit>
    Uri url = new("https://learn.microsoft.com/");

    // Correct
    if (string.Equals(url.Scheme, "https", StringComparison.OrdinalIgnoreCase))
    {
        // ...Code to handle HTTPS protocol.
    }
    //</explicit>
}

```
