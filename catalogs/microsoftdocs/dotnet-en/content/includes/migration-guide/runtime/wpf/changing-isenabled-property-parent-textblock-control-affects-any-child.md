### Changing the IsEnabled property of the parent of a TextBlock control affects any child controls

#### Details

Starting with the .NET Framework 4.6.2, changing the [System.Windows.UIElement.IsEnabled](https://learn.microsoft.com/search/?terms=System.Windows.UIElement.IsEnabled) property of the parent of a [System.Windows.Controls.TextBlock](https://learn.microsoft.com/search/?terms=System.Windows.Controls.TextBlock) control affects any child controls (such as hyperlinks and buttons) of the [System.Windows.Controls.TextBlock](https://learn.microsoft.com/search/?terms=System.Windows.Controls.TextBlock) control.In the .NET Framework 4.6.1 and earlier versions, controls inside a [System.Windows.Controls.TextBlock](https://learn.microsoft.com/search/?terms=System.Windows.Controls.TextBlock) did not always reflect the state of the [System.Windows.UIElement.IsEnabled](https://learn.microsoft.com/search/?terms=System.Windows.UIElement.IsEnabled) property of the [System.Windows.Controls.TextBlock](https://learn.microsoft.com/search/?terms=System.Windows.Controls.TextBlock) parent.

#### Suggestion

None. This change conforms to the expected behavior for controls inside a [System.Windows.Controls.TextBlock](https://learn.microsoft.com/search/?terms=System.Windows.Controls.TextBlock) control.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.6.2 |
| Type | Runtime |

#### Affected APIs

- [System.Windows.UIElement.IsEnabled](https://learn.microsoft.com/search/?terms=System.Windows.UIElement.IsEnabled)

<!--

#### Affected APIs

- `P:System.Windows.UIElement.IsEnabled`

-->
