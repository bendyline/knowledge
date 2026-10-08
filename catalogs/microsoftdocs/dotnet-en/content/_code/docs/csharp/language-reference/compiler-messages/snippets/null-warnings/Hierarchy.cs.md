# Source code: docs/csharp/language-reference/compiler-messages/snippets/null-warnings/Hierarchy.cs

Complete source file; linked examples may select a region or line range.

```
namespace null_warnings
{
    // <Hierarchy>
    public class B
    {
        public virtual string GetMessage(string id) => string.Empty;
    }
    public class D : B
    {
        public override string? GetMessage(string? id) => default;
    }
    // </Hierarchy>
}

```
