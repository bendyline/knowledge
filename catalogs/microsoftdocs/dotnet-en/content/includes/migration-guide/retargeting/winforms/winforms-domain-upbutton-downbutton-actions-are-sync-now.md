### WinForm's Domain upbutton and downbutton actions are in sync now

#### Details

In the .NET Framework 4.7.1 and previous versions the [System.Windows.Forms.DomainUpDown](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown) control's [System.Windows.Forms.DomainUpDown.UpButton](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.UpButton) action is ignored when control text is present, and the developer is required to use [System.Windows.Forms.DomainUpDown.DownButton](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.DownButton) action on the control before using [System.Windows.Forms.DomainUpDown.UpButton](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.UpButton) action. Starting with the .NET Framework 4.7.2 both the [System.Windows.Forms.DomainUpDown.UpButton](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.UpButton) and [System.Windows.Forms.DomainUpDown.DownButton](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.DownButton) actions work independently in this scenario and remain in sync.

#### Suggestion

In order for an application to benefit from these changes, it must run on the .NET Framework 4.7.2 or later. The application can benefit from these changes in either of the following ways:

- It is recompiled to target the .NET Framework 4.7.2. This change is enabled by default on Windows Forms applications that target the .NET Framework 4.7.2 or later.
- It opts out of the legacy scrolling behavior by adding the following [AppContext Switch](../../../../docs/framework/configure-apps/file-schema/runtime/appcontextswitchoverrides-element.md) to the `<runtime>` section of the app config file and setting it to `false`, as the following example shows.

```xml
<runtime>
<AppContextSwitchOverrides value="Switch.System.Windows.Forms.DomainUpDown.UseLegacyScrolling=false"/>
</runtime>
```

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.7.2 |
| Type | Retargeting |

#### Affected APIs

- [System.Windows.Forms.DomainUpDown.UpButton](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.UpButton)
- [System.Windows.Forms.DomainUpDown.DownButton](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DomainUpDown.DownButton)
