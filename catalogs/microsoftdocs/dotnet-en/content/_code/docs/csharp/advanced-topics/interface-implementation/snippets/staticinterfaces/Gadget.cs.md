# Source code: docs/csharp/advanced-topics/interface-implementation/snippets/staticinterfaces/Gadget.cs

Complete source file; linked examples may select a region or line range.

```
// <Gadget>
public struct Gadget : IDescribable<Gadget>
{
    public static string TypeName => "Gadget";

    // Overrides the default Describe() with a custom message
    public static string Describe() => $"{TypeName} (version 2.0)";
}
// </Gadget>

```
