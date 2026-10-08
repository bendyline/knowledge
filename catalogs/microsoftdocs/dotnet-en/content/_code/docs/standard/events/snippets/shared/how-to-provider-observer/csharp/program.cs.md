# Source code: docs/standard/events/snippets/shared/how-to-provider-observer/csharp/program.cs

Complete source file; linked examples may select a region or line range.

```
using TemperatureSample;

TemperatureMonitor provider = new();
TemperatureReporter observer1 = new();
TemperatureReporter observer2 = new();

observer1.Subscribe(provider);
observer2.Subscribe(provider);

await provider.GetTemperatureAsync();

```
