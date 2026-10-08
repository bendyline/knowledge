# Source code: docs/standard/events/snippets/how-to-handle-multiple-events-using-event-properties/vb/Program.vb

Complete source file; linked examples may select a region or line range.

```
Module Program
    Sub Main()
        Dim sensor As New Sensor()
        ' <SubscribeEvent>
        AddHandler sensor.TemperatureChanged, AddressOf Sensor_TemperatureChanged
        ' </SubscribeEvent>
    End Sub

    ' <HandleEvent>
    Sub Sensor_TemperatureChanged(sender As Object, e As SensorEventArgs)
        Console.WriteLine("Sensor {0}: temperature changed to {1}.", e.SensorId, e.Value)
    End Sub
    ' </HandleEvent>
End Module


```
