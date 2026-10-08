# Source code: aspnetcore/security/cors/6.0sample/Cors/WebAPI/WeatherForecast.cs

Complete source file; linked examples may select a region or line range.

```

namespace WebAPI;
public class WeatherForecast
{
    public DateTime Date { get; set; }

    public int TemperatureC { get; set; }

    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

    public string? Summary { get; set; }
}

```
