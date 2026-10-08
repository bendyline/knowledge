# Source code: docs/csharp/advanced-topics/interface-implementation/snippets/mixins-with-default-interface-methods/IBlinkingLight.cs

Complete source file; linked examples may select a region or line range.

```
namespace mixins_with_interfaces;

// <SnippetBlinkingLight>
public interface IBlinkingLight : ILight
{
    public async Task Blink(int duration, int repeatCount)
    {
        Console.WriteLine("Using the default interface method for IBlinkingLight.Blink.");
        for (int count = 0; count < repeatCount; count++)
        {
            SwitchOn();
            await Task.Delay(duration);
            SwitchOff();
            await Task.Delay(duration);
        }
        Console.WriteLine("Done with the default interface method for IBlinkingLight.Blink.");
    }
}
// </SnippetBlinkingLight>

```
