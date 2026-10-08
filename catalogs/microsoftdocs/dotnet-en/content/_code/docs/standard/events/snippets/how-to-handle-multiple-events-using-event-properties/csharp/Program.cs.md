# Source code: docs/standard/events/snippets/how-to-handle-multiple-events-using-event-properties/csharp/Program.cs

Complete source file; linked examples may select a region or line range.

```
Sensor sensor = new Sensor();
// <SubscribeEvent>
sensor.TemperatureChanged += Sensor_TemperatureChanged;
// </SubscribeEvent>

// <HandleEvent>
static void Sensor_TemperatureChanged(object? sender, SensorEventArgs e) =>
    Console.WriteLine($"Sensor {e.SensorId}: temperature changed to {e.Value}.");
// </HandleEvent>


```
