# Source code: docs/standard/serialization/system-text-json/snippets/how-to/csharp/RoundtripLongToString.cs

Complete source file; linked examples may select a region or line range.

```
using System.Text.Json;

namespace SystemTextJsonSamples
{
    public class RoundtripLongToString
    {
        public static void Run()
        {
            // Serialize to create input JSON
            WeatherForecastWithLong weatherForecast = WeatherForecastFactories.CreateWeatherForecastWithLong();
            var serializeOptions = new JsonSerializerOptions
            {
                WriteIndented = true
            };
            string jsonString = JsonSerializer.Serialize(weatherForecast, serializeOptions);
            Console.WriteLine($"JSON output:\n{jsonString}\n");

            weatherForecast = JsonSerializer.Deserialize<WeatherForecastWithLong>(jsonString)!;
            weatherForecast.DisplayPropertyValues();
        }
    }
}

```
