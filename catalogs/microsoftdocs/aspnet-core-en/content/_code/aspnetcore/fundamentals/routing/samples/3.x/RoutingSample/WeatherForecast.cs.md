# Source code: aspnetcore/fundamentals/routing/samples/3.x/RoutingSample/WeatherForecast.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace RoutingSample
{
    public class WeatherForecast
    {
        public DateTime Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        public string Summary { get; set; }
    }
}

```
