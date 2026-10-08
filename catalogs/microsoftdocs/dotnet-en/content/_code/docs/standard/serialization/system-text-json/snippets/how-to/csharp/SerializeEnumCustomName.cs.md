# Source code: docs/standard/serialization/system-text-json/snippets/how-to/csharp/SerializeEnumCustomName.cs

Complete source file; linked examples may select a region or line range.

```
using System.Text.Json;

namespace SystemTextJsonSamples
{
    public class SerializeEnumCustomName
    {
        public static void Run()
        {
            string jsonString;
            WeatherForecastWithEnumCustomName weatherForecast =
                WeatherForecastFactories.CreateWeatherForecastWithEnumCustomName();
            weatherForecast.DisplayPropertyValues();

            // <Serialize>
            var options = new JsonSerializerOptions
            {
                WriteIndented = true,
            };
            jsonString = JsonSerializer.Serialize(weatherForecast, options);
            // </Serialize>
            Console.WriteLine($"JSON with enum member with custom name:\n{jsonString}\n");
        }
    }
}

```
