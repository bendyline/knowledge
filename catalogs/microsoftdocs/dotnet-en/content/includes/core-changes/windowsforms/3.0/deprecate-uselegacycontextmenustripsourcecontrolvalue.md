### UseLegacyContextMenuStripSourceControlValue compatibility switch not supported

The `Switch.System.Windows.Forms.UseLegacyContextMenuStripSourceControlValue` compatibility switch, which was introduced in .NET Framework 4.7.2, is not supported in Windows Forms on .NET Core or .NET 5.0 and later.

#### Change description

Starting with .NET Framework 4.7.2, the `Switch.System.Windows.Forms.UseLegacyContextMenuStripSourceControlValue` compatibility switch allows the developer to opt out of the new behavior of the [System.Windows.Forms.ContextMenuStrip.SourceControl](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ContextMenuStrip.SourceControl) property, which now returns a reference to the source control. The previous behavior of the property was to return `null`. For more information, see [\<AppContextSwitchOverrides> element](../../../../docs/framework/configure-apps/file-schema/runtime/appcontextswitchoverrides-element.md).

In .NET Core and .NET 5.0 and later, the `Switch.System.Windows.Forms.UseLegacyContextMenuStripSourceControlValue` switch is not supported.

#### Version introduced

3.0

#### Recommended action

Remove the switch. The switch is not supported, and no alternative functionality is available.

#### Category

Windows Forms

#### Affected APIs

- [System.Windows.Forms.ContextMenuStrip.SourceControl](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ContextMenuStrip.SourceControl)

<!-- 

#### Affected APIs

- `P:System.Windows.Forms.ContextMenuStrip.SourceControl`

-->
