# Source code: docs/csharp/advanced-topics/interface-implementation/snippets/mixins-with-default-interface-methods/ITimerLight.cs

Complete source file; linked examples may select a region or line range.

```
namespace mixins_with_interfaces;

// <SnippetTimerLightFinal>
public interface ITimerLight : ILight
{
    public async Task TurnOnFor(int duration)
    {
        Console.WriteLine("Using the default interface method for the ITimerLight.TurnOnFor.");
        SwitchOn();
        await Task.Delay(duration);
        SwitchOff();
        Console.WriteLine("Completed ITimerLight.TurnOnFor sequence.");
    }
}
// </SnippetTimerLightFinal>

```
