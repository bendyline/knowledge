# Source code: docs/standard/base-types/snippets/best-practices-strings/csharp/comparison3/Program.cs

Complete source file; linked examples may select a region or line range.

```
string separated = "\u0061\u030a";
string combined = "\u00e5";

Console.WriteLine($"Equal sort weight of {separated} and {combined} using InvariantCulture: {string.Compare(separated, combined, StringComparison.InvariantCulture) == 0}");

Console.WriteLine($"Equal sort weight of {separated} and {combined} using Ordinal: {string.Compare(separated, combined, StringComparison.Ordinal) == 0}");

// The example displays the following output:
//     Equal sort weight of a° and å using InvariantCulture: True
//     Equal sort weight of a° and å using Ordinal: False

```
