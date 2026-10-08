# Source code: docs/csharp/advanced-topics/interface-implementation/snippets/mixins-with-default-interface-methods/ILight.cs

Complete source file; linked examples may select a region or line range.

```
namespace mixins_with_interfaces;

// <SnippetPowerStatus>
public enum PowerStatus
{
    NoPower,
    ACPower,
    FullBattery,
    MidBattery,
    LowBattery
}
// </SnippetPowerStatus>

// <SnippetILightInterface>
public interface ILight
{
    void SwitchOn();
    void SwitchOff();
    bool IsOn();
    public PowerStatus Power() => PowerStatus.NoPower;
}
// </SnippetILightInterface>

```
