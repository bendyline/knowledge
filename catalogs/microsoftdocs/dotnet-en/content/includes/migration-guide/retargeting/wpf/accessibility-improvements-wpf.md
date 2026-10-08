### Accessibility improvements in WPF

#### Details

**High Contrast improvements**

- The focus for the [System.Windows.Controls.Expander](https://learn.microsoft.com/search/?terms=System.Windows.Controls.Expander) control is now visible. In previous versions of .NET Framework, it was not.
- The text in [System.Windows.Controls.CheckBox](https://learn.microsoft.com/search/?terms=System.Windows.Controls.CheckBox) and [System.Windows.Controls.RadioButton](https://learn.microsoft.com/search/?terms=System.Windows.Controls.RadioButton) controls when they are selected is now easier to see than in previous .NET Framework versions.
- The border of a disabled [System.Windows.Controls.ComboBox](https://learn.microsoft.com/search/?terms=System.Windows.Controls.ComboBox) is now the same color as the disabled text. In previous versions of .NET Framework, it was not.
- Disabled and focused buttons now use the correct theme color. In previous versions of .NET Framework, they did not.
- The dropdown button is now visible when a [System.Windows.Controls.ComboBox](https://learn.microsoft.com/search/?terms=System.Windows.Controls.ComboBox) control's style is set to [System.Windows.Controls.ToolBar.ComboBoxStyleKey](https://learn.microsoft.com/search/?terms=System.Windows.Controls.ToolBar.ComboBoxStyleKey). In previous versions of .NET Framework, it was not.
- The sort indicator arrow in a [System.Windows.Controls.DataGrid](https://learn.microsoft.com/search/?terms=System.Windows.Controls.DataGrid) control now uses theme colors. In previous versions of .NET Framework, it did not.
- The default hyperlink style now changes to the correct theme color on mouse over. In previous versions of .NET Framework, it did not.
- The Keyboard focus on radio buttons is now visible. In previous versions of .NET Framework, it was not.
- The [System.Windows.Controls.DataGrid](https://learn.microsoft.com/search/?terms=System.Windows.Controls.DataGrid) control's checkbox column now uses the expected colors for keyboard focus feedback. In previous versions of .NET Framework, it did not.
- the Keyboard focus visuals are now visible on [System.Windows.Controls.ComboBox](https://learn.microsoft.com/search/?terms=System.Windows.Controls.ComboBox) and [System.Windows.Controls.ListBox](https://learn.microsoft.com/search/?terms=System.Windows.Controls.ListBox) controls. In previous versions of .NET Framework, it was not.

**Screen reader interaction improvements**

- [System.Windows.Controls.Expander](https://learn.microsoft.com/search/?terms=System.Windows.Controls.Expander) controls are now correctly announced as groups (expand/collapse) by screen readers.
- [System.Windows.Controls.DataGridCell](https://learn.microsoft.com/search/?terms=System.Windows.Controls.DataGridCell) controls are now correctly announced as data grid cell (localized) by screen readers.
- Screen readers will now announce the name of an editable [System.Windows.Controls.ComboBox](https://learn.microsoft.com/search/?terms=System.Windows.Controls.ComboBox).
- [System.Windows.Controls.PasswordBox](https://learn.microsoft.com/search/?terms=System.Windows.Controls.PasswordBox) controls are no longer announced as "no item in view" by screen readers.

**LiveRegion support**

Screen readers, such as Narrator, help people understand the user interface (UI) of an application, usually by describing the UI element that currently has focus. However, if a UI element changes somewhere in the screen and it does not have the focus, the user may not be informed and miss important information. LiveRegions are meant to solve this problem. A developer can use them to inform the screen reader or any other [UI Automation](../../../../docs/framework/ui-automation/ui-automation-overview.md) client that an important change has been made to a UI element. The screen reader can then decide how and when to inform the user of this change. The LiveSetting property also lets the screen reader know how important it is to inform the user of the change made to the UI.

#### Suggestion

**How to opt in or out of these changes**

In order for the application to benefit from these changes, it must run on .NET Framework 4.7.1 or later. The application can benefit from these changes in either of the following ways:

- Target .NET Framework 4.7.1. This is the recommended approach. These accessibility changes are enabled by default on WPF applications that target .NET Framework 4.7.1 or later.
- It opts out of the legacy accessibility behaviors by adding the following [AppContext Switch](../../../../docs/framework/configure-apps/file-schema/runtime/appcontextswitchoverrides-element.md) in the `<runtime>` section of the app config file and setting it to `false`, as the following example shows.

  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <configuration>
    <startup>
      <supportedRuntime version="v4.0" sku=".NETFramework,Version=v4.7"/>
    </startup>
    <runtime>
      <!-- AppContextSwitchOverrides value attribute is in the form of 'key1=true/false;key2=true/false'  -->
      <AppContextSwitchOverrides value="Switch.UseLegacyAccessibilityFeatures=false" />
    </runtime>
  </configuration>
  ```

Applications that target .NET Framework 4.7.1 or later and want to preserve the legacy accessibility behavior can opt in to the use of legacy accessibility features by explicitly setting this AppContext switch to `true`.
For an overview of UI automation, see [UI Automation Overview](../../../../docs/framework/ui-automation/ui-automation-overview.md).

| Name | Value |
| :--- | :--- |
| Scope | Major |
| Version | 4.7.1 |
| Type | Retargeting |

#### Affected APIs

- [System.Windows.Automation.AutomationElementIdentifiers.LiveSettingProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.LiveSettingProperty)
- [System.Windows.Automation.AutomationElementIdentifiers.LiveRegionChangedEvent](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationElementIdentifiers.LiveRegionChangedEvent)
- [System.Windows.Automation.AutomationLiveSetting](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationLiveSetting)
- [System.Windows.Automation.AutomationProperties.LiveSettingProperty](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationProperties.LiveSettingProperty)
- [System.Windows.Automation.AutomationProperties.SetLiveSetting(System.Windows.DependencyObject,System.Windows.Automation.AutomationLiveSetting)](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationProperties.SetLiveSetting(System.Windows.DependencyObject%2CSystem.Windows.Automation.AutomationLiveSetting))
- [System.Windows.Automation.AutomationProperties.GetLiveSetting(System.Windows.DependencyObject)](https://learn.microsoft.com/search/?terms=System.Windows.Automation.AutomationProperties.GetLiveSetting(System.Windows.DependencyObject))
- [System.Windows.Automation.Peers.AutomationPeer.GetLiveSettingCore](https://learn.microsoft.com/search/?terms=System.Windows.Automation.Peers.AutomationPeer.GetLiveSettingCore)
