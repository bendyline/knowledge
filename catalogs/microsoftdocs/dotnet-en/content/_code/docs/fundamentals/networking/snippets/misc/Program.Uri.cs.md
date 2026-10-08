# Source code: docs/fundamentals/networking/snippets/misc/Program.Uri.cs

Complete source file; linked examples may select a region or line range.

```
public static partial class Program
{
    static void CanonicalUri()
    {
        // <canonicaluri>
        const string uriString =
            "https://learn.microsoft.com/en-us/dotnet/path?key=value#bookmark";

        Uri canonicalUri = new(uriString);
        Console.WriteLine(canonicalUri.Host);
        Console.WriteLine(canonicalUri.PathAndQuery);
        Console.WriteLine(canonicalUri.Fragment);
        // Sample output:
        //     learn.microsoft.com
        //     /en-us/dotnet/path?key=value
        //     #bookmark
        // </canonicaluri>
    }
}

```
