# Source code: docs/csharp/advanced-topics/interface-implementation/snippets/staticinterfaces/Widget.cs

Complete source file; linked examples may select a region or line range.

```
// <Widget>
public struct Widget : IDescribable<Widget>
{
    public static string TypeName => "Widget";

    // Uses the default Describe(): returns "Widget"
}
// </Widget>

```
