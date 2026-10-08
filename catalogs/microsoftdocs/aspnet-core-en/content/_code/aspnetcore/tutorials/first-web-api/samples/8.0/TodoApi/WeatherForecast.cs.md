# Source code: aspnetcore/tutorials/first-web-api/samples/8.0/TodoApi/WeatherForecast.cs

Complete source file; linked examples may select a region or line range.

```
namespace TodoApi
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
