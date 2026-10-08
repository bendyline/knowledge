# Source code: docs/csharp/fundamentals/tutorials/snippets/records/DailyTemperature.cs

Complete source file; linked examples may select a region or line range.

```
namespace record_types;

// <TemperatureRecord>
public readonly record struct DailyTemperature(double HighTemp, double LowTemp)
{
    public double Mean => (HighTemp + LowTemp) / 2.0;
}
// </TemperatureRecord>

```
