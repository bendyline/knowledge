### WPF TreeViewItem must be used within a TreeView

#### Details

A change was introduced in 4.5 that restricts usage of [System.Windows.Controls.TreeViewItem](https://learn.microsoft.com/search/?terms=System.Windows.Controls.TreeViewItem) elements outside of a [System.Windows.Controls.TreeView](https://learn.microsoft.com/search/?terms=System.Windows.Controls.TreeView). This manifests under the following conditions:

- [System.Windows.Controls.TreeViewItem](https://learn.microsoft.com/search/?terms=System.Windows.Controls.TreeViewItem)'s visual parent is not a panel. (A [System.Windows.Controls.TreeViewItem](https://learn.microsoft.com/search/?terms=System.Windows.Controls.TreeViewItem) generated for a [System.Windows.Controls.TreeView](https://learn.microsoft.com/search/?terms=System.Windows.Controls.TreeView) will have a panel as its parent)
- The [System.Windows.Controls.TreeViewItem](https://learn.microsoft.com/search/?terms=System.Windows.Controls.TreeViewItem) is a descendant of a [System.Windows.Controls.VirtualizingStackPanel](https://learn.microsoft.com/search/?terms=System.Windows.Controls.VirtualizingStackPanel) acting as the &quot;items host&quot; for a list control (ListBox, DataGrid, ListView, etc.). Virtualization doesn't need to be enabled.
- The [System.Windows.Controls.VirtualizingStackPanel](https://learn.microsoft.com/search/?terms=System.Windows.Controls.VirtualizingStackPanel) is item-scrolling (`ScrollUnit=&quot;Item&quot;`).
- Someone calls `VirtualizingStackPanel.MakeVisible(v)` to scroll an element `v` into view. This can be done explicitly, or implicitly in a number of ways; perhaps the most common way is simply clicking on `v` to give it the keyboard focus.
- The visual-parent chain from `v` to the [System.Windows.Controls.VirtualizingStackPanel](https://learn.microsoft.com/search/?terms=System.Windows.Controls.VirtualizingStackPanel) passes through the [System.Windows.Controls.TreeViewItem](https://learn.microsoft.com/search/?terms=System.Windows.Controls.TreeViewItem).

In other words, this is seen when a [System.Windows.Controls.TreeViewItem](https://learn.microsoft.com/search/?terms=System.Windows.Controls.TreeViewItem) is used outside of a [System.Windows.Controls.TreeView](https://learn.microsoft.com/search/?terms=System.Windows.Controls.TreeView), and the user clicks on a descendant of the [System.Windows.Controls.TreeViewItem](https://learn.microsoft.com/search/?terms=System.Windows.Controls.TreeViewItem) to bring it into view. If the [System.Windows.Controls.TreeViewItem](https://learn.microsoft.com/search/?terms=System.Windows.Controls.TreeViewItem) has no focusable descendants, you'll never see this issue. An example of a situation where this is hit is when a [System.Windows.Controls.TreeViewItem](https://learn.microsoft.com/search/?terms=System.Windows.Controls.TreeViewItem) is the root of a DataTemplate. When this issue is hit, there is an InvalidCastException that occurs within the WPF framework.

#### Suggestion

A hotfix will be made available for this.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.5 |
| Type | Runtime |

#### Affected APIs

Not detectable via API analysis.

<!--

#### Affected APIs

Not detectable via API analysis.

-->
