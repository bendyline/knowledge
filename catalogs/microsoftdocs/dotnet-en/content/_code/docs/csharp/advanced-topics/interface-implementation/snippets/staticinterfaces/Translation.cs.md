# Source code: docs/csharp/advanced-topics/interface-implementation/snippets/staticinterfaces/Translation.cs

Complete source file; linked examples may select a region or line range.

```
using System.Numerics;

public record Translation<T>(T XOffset, T YOffset) : IAdditiveIdentity<Translation<T>, Translation<T>>
    where T : IAdditionOperators<T, T, T>, IAdditiveIdentity<T, T>
{
    public static Translation<T> AdditiveIdentity =>
        new Translation<T>(XOffset: T.AdditiveIdentity, YOffset: T.AdditiveIdentity);
}

```
