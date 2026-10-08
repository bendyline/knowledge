# Source code: docs/standard/serialization/system-text-json/snippets/how-to/csharp/SerializeExcludePropertiesyByAttribute.cs

Complete source file; linked examples may select a region or line range.

```
using System.Text.Json;

namespace SystemTextJsonSamples
{
    public class SerializeExcludePropertiesByAttribute
    {
        public static void Run()
        {
            string jsonString;
            WeatherForecastWithIgnoreAttribute weatherForecast =
                WeatherForecastFactories.CreateWeatherForecastWithIgnoreAttribute();
            weatherForecast.DisplayPropertyValues();

            // <Serialize>
            var options = new JsonSerializerOptions
            {
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
