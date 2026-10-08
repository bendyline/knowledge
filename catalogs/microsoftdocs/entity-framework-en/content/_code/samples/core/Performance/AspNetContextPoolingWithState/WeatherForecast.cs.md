# Source code: samples/core/Performance/AspNetContextPoolingWithState/WeatherForecast.cs

Complete source file; linked examples may select a region or line range.

```
namespace Performance.AspNetContextPoolingWithState;

public class WeatherForecast
{
    public int Id { get; set; }
    public int TenantId { get; set; }

    public DateTime Date { get; set; }
    public int TemperatureC { get; set; }
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
    public string Summary { get; set; }
}
```
