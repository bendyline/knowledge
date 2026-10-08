# Source code: docs/standard/serialization/system-text-json/snippets/how-to/vb/SerializeExcludeReadOnlyProperties.vb

Complete source file; linked examples may select a region or line range.

```
Imports System.Text.Json

Namespace SystemTextJsonSamples

    Public NotInheritable Class SerializeExcludeReadOnlyProperties

        Public Shared Sub Run()
            Dim jsonString As String
            Dim weatherForecast As WeatherForecastWithROProperty = WeatherForecastFactories.CreateWeatherForecastWithROProperty()
            weatherForecast.DisplayPropertyValues()

            ' <Serialize>
            Dim options As JsonSerializerOptions = New JsonSerializerOptions With {
                .IgnoreReadOnlyProperties = True,
                .WriteIndented = True
            }
            jsonString = JsonSerializer.Serialize(weatherForecast, options)
            ' </Serialize>
            Console.WriteLine(jsonString)
            Console.WriteLine()
        End Sub

    End Class

End Namespace

```
