# Source code: docs/csharp/advanced-topics/interface-implementation/snippets/staticinterfaces/Describable.cs

Complete source file; linked examples may select a region or line range.

```
// <Describable>
public interface IDescribable<T> where T : IDescribable<T>
{
    static abstract string TypeName { get; }
    static virtual string Describe() => T.TypeName;
}
// </Describable>

```
