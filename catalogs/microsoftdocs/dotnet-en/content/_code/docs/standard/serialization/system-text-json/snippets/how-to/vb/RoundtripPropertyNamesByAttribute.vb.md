# Source code: docs/standard/serialization/system-text-json/snippets/how-to/vb/RoundtripPropertyNamesByAttribute.vb

Complete source file; linked examples may select a region or line range.

```
Imports System.Text.Json

Namespace SystemTextJsonSamples

    Public NotInheritable Class RoundtripPropertyNamesByAttribute

        Public Shared Sub Run()
            Dim jsonString As String
            Dim weatherForecast As WeatherForecastWithPropertyName = WeatherForecastFactories.CreateWeatherForecastWithPropertyName()
            weatherForecast.DisplayPropertyValues()

            ' <Serialize>
            Dim serializeOptions As JsonSerializerOptions = New JsonSerializerOptions With {
                .WriteIndented = True
            }
            jsonString = JsonSerializer.Serialize(weatherForecast, serializeOptions)
            ' </Serialize>
            Console.WriteLine($"JSON output:{jsonString}")

            ' <Deserialize>
            weatherForecast = JsonSerializer.Deserialize(Of WeatherForecastWithPropertyName)(jsonString)
            weatherForecast.DisplayPropertyValues()
            ' </Deserialize>
        End Sub

    End Class

End Namespace

```
