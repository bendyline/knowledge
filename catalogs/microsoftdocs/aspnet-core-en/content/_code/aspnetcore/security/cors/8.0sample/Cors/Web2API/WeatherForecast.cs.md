# Source code: aspnetcore/security/cors/8.0sample/Cors/Web2API/WeatherForecast.cs

Complete source file; linked examples may select a region or line range.

```

using System;

namespace WebAPI;
public class WeatherForecast
{
    public DateTime Date { get; set; }

    public int TemperatureC { get; set; }

    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

    public string? Summary { get; set; }
}

```
