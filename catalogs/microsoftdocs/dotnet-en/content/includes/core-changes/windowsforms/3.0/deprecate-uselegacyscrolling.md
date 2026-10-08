### DomainUpDown.UseLegacyScrolling compatibility switch not supported

The `Switch.System.Windows.Forms.DomainUpDown.UseLegacyScrolling` compatibility switch, which was introduced in .NET Framework 4.7.1, is not supported in Windows Forms on .NET Core or .NET 5.0 and later.

#### Change description

Starting with .NET Framework 4.7.1, the `Switch.System.Windows.Forms.DomainUpDown.UseLegacyScrolling` compatibility switch allowed developers to opt-out of independent [System.Windows.Forms.DomainUpDown.DownButton](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.DownButton) and [System.Windows.Forms.DomainUpDown.UpButton](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.UpButton) actions. The switch restored the legacy behavior, in which the [System.Windows.Forms.DomainUpDown.UpButton](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.UpButton) is ignored if context text is present, and the developer is required to use [System.Windows.Forms.DomainUpDown.DownButton](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.DownButton) action on the control before the [System.Windows.Forms.DomainUpDown.UpButton](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.UpButton) action. For more information, see [\<AppContextSwitchOverrides> element](../../../../docs/framework/configure-apps/file-schema/runtime/appcontextswitchoverrides-element.md).

In .NET Core and .NET 5.0 and later, the `Switch.System.Windows.Forms.DomainUpDown.UseLegacyScrolling` switch is not supported.

#### Version introduced

3.0

#### Recommended action

Remove the switch. The switch is not supported, and no alternative functionality is available.

#### Category

Windows Forms

#### Affected APIs

- [System.Windows.Forms.DomainUpDown.DownButton](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.DownButton)
- [System.Windows.Forms.DomainUpDown.UpButton](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.UpButton)

<!-- 

#### Affected APIs

- `M:System.Windows.Forms.DomainUpDown.DownButton`
- `M:System.Windows.Forms.DomainUpDown.UpButton`

-->
