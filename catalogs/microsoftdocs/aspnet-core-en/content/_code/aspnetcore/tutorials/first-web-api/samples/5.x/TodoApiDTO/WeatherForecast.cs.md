# Source code: aspnetcore/tutorials/first-web-api/samples/5.x/TodoApiDTO/WeatherForecast.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace TodoApi
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
