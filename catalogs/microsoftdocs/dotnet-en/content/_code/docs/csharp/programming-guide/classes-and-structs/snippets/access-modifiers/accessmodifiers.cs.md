# Source code: docs/csharp/programming-guide/classes-and-structs/snippets/access-modifiers/accessmodifiers.cs

Complete source file; linked examples may select a region or line range.

```
namespace objectoriented;

//<SnippetPublicAccess>
public class Bicycle
{
    public void Pedal() { }
}
//</SnippetPublicAccess>

//<SnippetMethodAccess>
// public class:
public class Tricycle
{
    // protected method:
    protected void Pedal() { }

    // private field:
    private int _wheels = 3;

    // protected internal property:
    protected internal int Wheels => _wheels;
}
//</SnippetMethodAccess>

```
