# Source code: docs/standard/serialization/system-text-json/snippets/how-to/csharp/SerializeExcludeReadOnlyProperties.cs

Complete source file; linked examples may select a region or line range.

```
using System.Text.Json;

namespace SystemTextJsonSamples
{
    public class SerializeExcludeReadOnlyProperties
    {
        public static void Run()
        {
            string jsonString;
            WeatherForecastWithROProperty weatherForecast =
                WeatherForecastFactories.CreateWeatherForecastWithROProperty();
            weatherForecast.DisplayPropertyValues();

            // <Serialize>
            var options = new JsonSerializerOptions
            {
                IgnoreReadOnlyProperties = true,
                WriteIndented = true
            };
            jsonString = JsonSerializer.Serialize(weatherForecast, options);
            // </Serialize>
            Console.WriteLine(jsonString);
            Console.WriteLine();
        }
    }
}

```
