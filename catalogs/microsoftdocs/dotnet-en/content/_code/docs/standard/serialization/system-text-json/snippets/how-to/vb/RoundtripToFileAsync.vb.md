# Source code: docs/standard/serialization/system-text-json/snippets/how-to/vb/RoundtripToFileAsync.vb

Complete source file; linked examples may select a region or line range.

```
Imports System.IO
Imports System.Text.Json

Namespace SystemTextJsonSamples

    Public Class RoundtripToFileAsync

        Public Shared Async Function RunAsync() As Task
            Dim fileName As String = "WeatherForecastAsync.json"
            Dim weatherForecast1 As WeatherForecast = WeatherForecastFactories.CreateWeatherForecast()
            weatherForecast1.DisplayPropertyValues()

            ' <Serialize>
            Dim createStream As FileStream = File.Create(fileName)
            Await JsonSerializer.SerializeAsync(createStream, weatherForecast1)
            ' </Serialize>
            Console.WriteLine($"The result is in {fileName}")
            Await createStream.DisposeAsync()

            ' <Deserialize>
            Dim openStream As FileStream = File.OpenRead(fileName)
            weatherForecast1 = Await JsonSerializer.DeserializeAsync(Of WeatherForecast)(openStream)
            ' </Deserialize>
            weatherForecast1.DisplayPropertyValues()
        End Function

    End Class

End Namespace

```
