# Source code: docs/standard/serialization/system-text-json/snippets/how-to/csharp/IForecast.cs

Complete source file; linked examples may select a region or line range.

```
namespace SystemTextJsonSamples
{
    public interface IForecast
    {
        public DateTimeOffset Date { get; set; }
        public int TemperatureCelsius { get; set; }
        public string? Summary { get; set; }
    }

    public class Forecast : IForecast
    {
        public DateTimeOffset Date { get; set; }
        public int TemperatureCelsius { get; set; }
        public string? Summary { get; set; }
        public int WindSpeed { get; set; }
    }

    public class Forecasts
    {
        public IForecast? Monday { get; set; }
        public object? Tuesday { get; set; }
    }
}

```
