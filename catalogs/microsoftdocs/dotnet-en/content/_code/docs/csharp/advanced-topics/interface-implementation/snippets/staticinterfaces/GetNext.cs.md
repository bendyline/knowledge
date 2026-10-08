# Source code: docs/csharp/advanced-topics/interface-implementation/snippets/staticinterfaces/GetNext.cs

Complete source file; linked examples may select a region or line range.

```
public interface IGetNext<T> where T : IGetNext<T>
{
    static abstract T operator ++(T other);
}

```
