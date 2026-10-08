# Source code: docs/csharp/fundamentals/program-structure/snippets/namespaces/FileScopedExample.cs

Complete source file; linked examples may select a region or line range.

```
// <FileScopedNamespace>
namespace MyApp.Models;

class Customer
{
    public required string Name { get; init; }
    public string? Email { get; init; }

    public override string ToString() => $"{Name} ({Email ?? "no email"})";
}
// </FileScopedNamespace>

```
