# Source code: aspnetcore/mvc/controllers/bind-tryparse/7.0-samples/BindUsingTryParse/BindTryParseMVC/Models/WeatherForecast.cs

Complete source file; linked examples may select a region or line range.

```
namespace BindTryParseMVC.Models
{
    public class WeatherForecast
    {
        public DateTime Date { get; set; }

        public int TemperatureC { get; set; }

        public string? Summary { get; set; }
    }

    public class WeatherForecastViewModel
    {
        public string? Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF { get; set; }

        public string? Summary { get; set; }
    }
}

```
