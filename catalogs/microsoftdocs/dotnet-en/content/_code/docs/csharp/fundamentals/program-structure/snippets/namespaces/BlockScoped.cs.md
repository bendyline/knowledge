# Source code: docs/csharp/fundamentals/program-structure/snippets/namespaces/BlockScoped.cs

Complete source file; linked examples may select a region or line range.

```
// <BlockScopedNamespace>
namespace MyApp.Models
{
    class Product
    {
        public required string Name { get; init; }
        public decimal Price { get; init; }

        public override string ToString() => $"{Name}: {Price:C}";
    }
}
// </BlockScopedNamespace>

```
