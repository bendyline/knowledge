# Source code: docs/standard/serialization/system-text-json/snippets/how-to/csharp/RegisterConverterWithConvertersCollection.cs

Complete source file; linked examples may select a region or line range.

```
using System.Text.Json;

namespace SystemTextJsonSamples
{
    public class RegisterConverterWithConverterscollection
    {
        public static void Run()
        {
            string jsonString;
            WeatherForecast weatherForecast = WeatherForecastFactories.CreateWeatherForecast();
            weatherForecast.DisplayPropertyValues();

            // <Serialize>
            var serializeOptions = new JsonSerializerOptions
            {
                WriteIndented = true
            };
			serializeOptions.Converters.Add(new DateTimeOffsetJsonConverter());
            
            jsonString = JsonSerializer.Serialize(weatherForecast, serializeOptions);
            // </Serialize>
            Console.WriteLine($"JSON output:\n{jsonString}\n");

            // <Deserialize>
            var deserializeOptions = new JsonSerializerOptions();
            deserializeOptions.Converters.Add(new DateTimeOffsetJsonConverter());
            weatherForecast = JsonSerializer.Deserialize<WeatherForecast>(jsonString, deserializeOptions)!;
            // </Deserialize>
            weatherForecast.DisplayPropertyValues();
        }
    }
}

```
