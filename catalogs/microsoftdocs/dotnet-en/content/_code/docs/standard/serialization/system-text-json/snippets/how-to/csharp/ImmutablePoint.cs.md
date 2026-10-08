# Source code: docs/standard/serialization/system-text-json/snippets/how-to/csharp/ImmutablePoint.cs

Complete source file; linked examples may select a region or line range.

```
namespace SystemTextJsonSamples
{
    // <ImmutablePoint>
    public readonly struct ImmutablePoint
    {
        public ImmutablePoint(int x, int y)
        {
            X = x;
            Y = y;
        }

        public int X { get; }
        public int Y { get; }
    }
    // </ImmutablePoint>
}

```
