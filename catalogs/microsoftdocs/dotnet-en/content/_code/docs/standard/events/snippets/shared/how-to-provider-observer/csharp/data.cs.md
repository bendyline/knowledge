# Source code: docs/standard/events/snippets/shared/how-to-provider-observer/csharp/data.cs

Complete source file; linked examples may select a region or line range.

```
// <Temperature>
namespace TemperatureSample;

public readonly record struct Temperature(decimal Degrees, DateTime Date);
// </Temperature>

```
