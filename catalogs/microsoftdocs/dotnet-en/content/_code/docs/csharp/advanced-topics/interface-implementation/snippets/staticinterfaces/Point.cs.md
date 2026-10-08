# Source code: docs/csharp/advanced-topics/interface-implementation/snippets/staticinterfaces/Point.cs

Complete source file; linked examples may select a region or line range.

```
using System.Numerics;

public record Point<T>(T X, T Y) : IAdditionOperators<Point<T>, Translation<T>, Point<T>>
    where T : IAdditionOperators<T, T, T>, IAdditiveIdentity<T, T>
{
    public static Point<T> operator +(Point<T> left, Translation<T> right) =>
        left with { X = left.X + right.XOffset, Y = left.Y + right.YOffset };
}

```
