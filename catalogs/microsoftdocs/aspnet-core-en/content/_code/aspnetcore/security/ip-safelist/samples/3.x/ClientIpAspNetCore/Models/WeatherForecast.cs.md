# Source code: aspnetcore/security/ip-safelist/samples/3.x/ClientIpAspNetCore/Models/WeatherForecast.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace ClientIpAspNetCore.Models
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
