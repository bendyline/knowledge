# Source code: docs/standard/events/snippets/shared/how-to-provider-observer/vb/program.vb

Complete source file; linked examples may select a region or line range.

```
Imports TemperatureSample

Module Program
    Sub Main()
        Dim provider As New TemperatureMonitor()
        Dim observer1 As New TemperatureReporter()
        Dim observer2 As New TemperatureReporter()

        observer1.Subscribe(provider)
        observer2.Subscribe(provider)

        provider.GetTemperatureAsync().GetAwaiter().GetResult()
    End Sub
End Module

```
