# Source code: docs/standard/serialization/system-text-json/snippets/how-to/vb/DeserializeCaseInsensitive.vb

Complete source file; linked examples may select a region or line range.

```
Imports System.Text.Json

Namespace SystemTextJsonSamples

    Public NotInheritable Class DeserializeCaseInsensitive

        Public Shared Sub Run()
            Dim jsonString As String = "{
  ""date"": ""2019-08-01T00:00:00-07:00"",
  ""temperatureCelsius"": 25,
  ""summary"": ""Hot""
}"
            Console.WriteLine($"JSON input:{jsonString}")

            ' <Deserialize>
            Dim options As JsonSerializerOptions = New JsonSerializerOptions With {
                .PropertyNameCaseInsensitive = True
            }
            Dim weatherForecast1 = JsonSerializer.Deserialize(Of WeatherForecast)(jsonString, options)
            ' </Deserialize>
            weatherForecast1.DisplayPropertyValues()
        End Sub

    End Class

End Namespace

```
