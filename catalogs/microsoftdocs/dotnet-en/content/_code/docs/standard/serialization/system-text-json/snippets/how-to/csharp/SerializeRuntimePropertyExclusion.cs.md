# Source code: docs/standard/serialization/system-text-json/snippets/how-to/csharp/SerializeRuntimePropertyExclusion.cs

Complete source file; linked examples may select a region or line range.

```
using System.Text.Json;

namespace SystemTextJsonSamples
{
    public class SerializeRuntimePropertyExclusion
    {
        public static void Run()
        {
            string jsonString;
            var wf = WeatherForecastFactories.CreateWeatherForecast();
            wf.DisplayPropertyValues();

            var serializeOptions = new JsonSerializerOptions
            {
                WriteIndented = true,
                Converters =
                {
                    new WeatherForecastRuntimeIgnoreConverter()
                }
            };
            jsonString = JsonSerializer.Serialize(wf, serializeOptions);
            Console.WriteLine($"JSON output:\n{jsonString}\n");

            wf.Summary = "N/A";
            wf.DisplayPropertyValues();
            jsonString = JsonSerializer.Serialize(wf, serializeOptions);
            Console.WriteLine($"JSON output:\n{jsonString}\n");

            var deserializeOptions = new JsonSerializerOptions
            {
                Converters =
                {
                    new WeatherForecastRuntimeIgnoreConverter()
                }
            };
            wf = JsonSerializer.Deserialize<WeatherForecast>(jsonString, deserializeOptions);
            wf!.DisplayPropertyValues();
        }
    }
}

```
