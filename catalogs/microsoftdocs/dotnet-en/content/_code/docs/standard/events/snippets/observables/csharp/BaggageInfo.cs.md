# Source code: docs/standard/events/snippets/observables/csharp/BaggageInfo.cs

Complete source file; linked examples may select a region or line range.

```
namespace Observables.Example;

public readonly record struct BaggageInfo(
    int FlightNumber,
    string From,
    int Carousel);

```
