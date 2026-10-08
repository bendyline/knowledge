# Source code: aspnetcore/web-api/advanced/formatting/samples/3.x/ResponseFormattingSample/WeatherForecast.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace ResponseFormattingSample
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
