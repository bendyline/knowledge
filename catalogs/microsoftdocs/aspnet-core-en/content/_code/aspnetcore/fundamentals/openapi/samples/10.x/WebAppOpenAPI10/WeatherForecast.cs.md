# Source code: aspnetcore/fundamentals/openapi/samples/10.x/WebAppOpenAPI10/WeatherForecast.cs

Complete source file; linked examples may select a region or line range.

```
namespace WebAppOpenAPI10
{
    public class WeatherForecast
    {
        public DateOnly Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        public string? Summary { get; set; }
    }
}

```
