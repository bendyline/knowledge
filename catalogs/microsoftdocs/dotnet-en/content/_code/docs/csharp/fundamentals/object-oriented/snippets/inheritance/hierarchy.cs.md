# Source code: docs/csharp/fundamentals/object-oriented/snippets/inheritance/hierarchy.cs

Complete source file; linked examples may select a region or line range.

```
namespace Hierarchy;

// <SnippetFirstHierarchy>
public class A
{
    public virtual void DoWork() { }
}
public class B : A
{
    public override void DoWork() { }
}
// </SnippetFirstHierarchy>

// <SnippetSealedOverride>
public class C : B
{
    public sealed override void DoWork() { }
}
// </SnippetSealedOverride>

// <SnippetNewDeclaration>
public class D : C
{
    public new void DoWork() { }
}
// </SnippetNewDeclaration>

// <SnippetAccessBase>
public class Base
{
    public virtual void DoWork() {/*...*/ }
}
public class Derived : Base
{
    public override void DoWork()
    {
        //Perform Derived's work here
        //...
        // Call DoWork on base class
        base.DoWork();
    }
}
// </SnippetAccessBase>

```
