# Source code: aspnetcore/security/authentication/configure-jwt-bearer-authentication/sample/JwtBearer/WeatherForecast.cs

Complete source file; linked examples may select a region or line range.

```
namespace JwtBearer;

public class WeatherForecast
{
    public DateOnly Date { get; set; }

    public int TemperatureC { get; set; }

    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

    public string? Summary { get; set; }
}

```
