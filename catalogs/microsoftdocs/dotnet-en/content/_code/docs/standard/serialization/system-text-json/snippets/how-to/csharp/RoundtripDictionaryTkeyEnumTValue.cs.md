# Source code: docs/standard/serialization/system-text-json/snippets/how-to/csharp/RoundtripDictionaryTkeyEnumTValue.cs

Complete source file; linked examples may select a region or line range.

```
using System.Text.Json;

namespace SystemTextJsonSamples
{
    public class RoundtripDictionaryTkeyEnumTValue
    {
        public static void Run()
        {
            string jsonString;

            WeatherForecastWithEnumDictionary weatherForecast =
                WeatherForecastFactories.CreateWeatherForecastWithEnumDictionary();

            // <Register>
            var serializeOptions = new JsonSerializerOptions();
            serializeOptions.Converters.Add(new DictionaryTKeyEnumTValueConverter());
            // </Register>
            serializeOptions.WriteIndented = true;
            jsonString = JsonSerializer.Serialize(weatherForecast, serializeOptions);
            Console.WriteLine($"JSON output:\n{jsonString}\n");

            // <Deserialize>
            var deserializeOptions = new JsonSerializerOptions
            {
                Converters =
                {
                    new DictionaryTKeyEnumTValueConverter()
                }
            };
            weatherForecast = JsonSerializer.Deserialize<WeatherForecastWithEnumDictionary>(
                jsonString, deserializeOptions)!;
            // </Deserialize>
            weatherForecast.DisplayPropertyValues();
        }
    }
}

```
