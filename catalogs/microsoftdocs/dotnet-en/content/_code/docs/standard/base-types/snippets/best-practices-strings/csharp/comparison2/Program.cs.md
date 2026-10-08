# Source code: docs/standard/base-types/snippets/best-practices-strings/csharp/comparison2/Program.cs

Complete source file; linked examples may select a region or line range.

```
string strA = "Владимир";
string strB = "ВЛАДИМИР";

// <OrdinalIgnoreCase>
string.Compare(strA, strB, StringComparison.OrdinalIgnoreCase);
// </OrdinalIgnoreCase>
Console.WriteLine(string.Compare(strA, strB, StringComparison.OrdinalIgnoreCase));

// <Ordinal>
string.Compare(strA.ToUpperInvariant(), strB.ToUpperInvariant(), StringComparison.Ordinal);
// </Ordinal>
Console.WriteLine(string.Compare(strA.ToUpperInvariant(), strB.ToUpperInvariant(), StringComparison.Ordinal));

```
