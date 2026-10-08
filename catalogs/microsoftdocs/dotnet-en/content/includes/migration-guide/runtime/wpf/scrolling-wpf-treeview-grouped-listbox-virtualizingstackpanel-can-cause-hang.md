### Scrolling a WPF TreeView or grouped ListBox in a VirtualizingStackPanel can cause the application to stop responding

#### Details

In the .NET Framework v4.5, scrolling a WPF [System.Windows.Controls.TreeView](https://learn.microsoft.com/search/?terms=System.Windows.Controls.TreeView) in a virtualized stack panel can cause the application to stop responding if there are margins in the viewport (between the items in the [System.Windows.Controls.TreeView](https://learn.microsoft.com/search/?terms=System.Windows.Controls.TreeView), for example, or on an ItemsPresenter element). Additionally, in some cases, different sized items in the view can cause instability even if there are no margins.

#### Suggestion

This bug can be avoided by upgrading to .NET Framework 4.5.1. Alternatively, margins can be removed from view collections (like [System.Windows.Controls.TreeView](https://learn.microsoft.com/search/?terms=System.Windows.Controls.TreeView)s) within virtualized stack panels if all contained items are the same size.

| Name | Value |
| :--- | :--- |
| Scope | Major |
| Version | 4.5 |
| Type | Runtime |

#### Affected APIs

- [System.Windows.Controls.VirtualizingStackPanel.SetIsVirtualizing(System.Windows.DependencyObject,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Windows.Controls.VirtualizingStackPanel.SetIsVirtualizing(System.Windows.DependencyObject%2CSystem.Boolean))

<!--

#### Affected APIs

- `M:System.Windows.Controls.VirtualizingStackPanel.SetIsVirtualizing(System.Windows.DependencyObject,System.Boolean)`

-->
