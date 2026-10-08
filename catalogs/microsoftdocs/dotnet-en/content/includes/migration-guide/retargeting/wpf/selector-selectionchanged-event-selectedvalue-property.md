### Selector SelectionChanged event and SelectedValue property

#### Details

Starting with the .NET Framework 4.7.1, a [System.Windows.Controls.Primitives.Selector](https://learn.microsoft.com/search/?terms=System.Windows.Controls.Primitives.Selector) always updates the value of its [System.Windows.Controls.Primitives.Selector.SelectedValue%2A](https://learn.microsoft.com/search/?terms=System.Windows.Controls.Primitives.Selector.SelectedValue%252A) property before raising the [System.Windows.Controls.Primitives.Selector.SelectionChanged](https://learn.microsoft.com/search/?terms=System.Windows.Controls.Primitives.Selector.SelectionChanged) event, when its selection changes. This makes the SelectedValue property consistent with the other selection properties ([System.Windows.Controls.Primitives.Selector.SelectedItem%2A](https://learn.microsoft.com/search/?terms=System.Windows.Controls.Primitives.Selector.SelectedItem%252A) and [System.Windows.Controls.Primitives.Selector.SelectedIndex%2A](https://learn.microsoft.com/search/?terms=System.Windows.Controls.Primitives.Selector.SelectedIndex%252A)), which are updated before raising the event.

In the .NET Framework 4.7 and earlier versions, the update to SelectedValue happened before the event in most cases, but it happened after the event if the selection change was caused by changing the [System.Windows.Controls.Primitives.Selector.SelectedValue%2A](https://learn.microsoft.com/search/?terms=System.Windows.Controls.Primitives.Selector.SelectedValue%252A) property.

#### Suggestion

Apps that target the .NET Framework 4.7.1 or later can opt out of this change and use legacy behavior by adding the following to the `<runtime>` section of the application configuration file:

```xml
<runtime>
<AppContextSwitchOverrides
value="Switch.System.Windows.Controls.TabControl.SelectionPropertiesCanLagBehindSelectionChangedEvent=true" />
</runtime>
```

Apps that target the .NET Framework 4.7 or earlier but are running on the .NET Framework 4.7.1 or later can enable the new behavior by adding the following line to the `<runtime>` section of the application .configuration file:

```xml
<runtime>
<AppContextSwitchOverrides value="Switch.System.Windows.Controls.TabControl.SelectionPropertiesCanLagBehindSelectionChangedEvent=false" />
</runtime>
```

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.7.1 |
| Type | Retargeting |

#### Affected APIs

- [System.Windows.Controls.TabControl.SelectedContent](https://learn.microsoft.com/search/?terms=System.Windows.Controls.TabControl.SelectedContent)
- [System.Windows.Controls.Primitives.Selector.SelectionChanged](https://learn.microsoft.com/search/?terms=System.Windows.Controls.Primitives.Selector.SelectionChanged)
