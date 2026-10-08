### Item-scrolling a flat list with items of different pixel-height

#### Details

When an [System.Windows.Controls.ItemsControl](https://learn.microsoft.com/search/?terms=System.Windows.Controls.ItemsControl) displays a collection using virtualization (`IsVirtualizing=true`) and item- scrolling (`ScrollUnit=Item`), and when the control scrolls to display an item whose height in pixels differs from its neighbors, the [System.Windows.Controls.VirtualizingStackPanel](https://learn.microsoft.com/search/?terms=System.Windows.Controls.VirtualizingStackPanel) iterates over all items in the collection. The UI is unresponsive during this iteration. The iteration occurs in other circumstances, even in previous .NET Framework releases. For example, it occurs when pixel-scrolling (`ScrollUnit=Pixel`) upon encountering an item with different pixel height, and when item-scrolling hierarchical data (such as a [System.Windows.Controls.TreeView](https://learn.microsoft.com/search/?terms=System.Windows.Controls.TreeView) or an [System.Windows.Controls.ItemsControl](https://learn.microsoft.com/search/?terms=System.Windows.Controls.ItemsControl) with grouping enabled) upon encountering an item with a different number of descendant items than its neighbors.For the case of item-scrolling and different pixel height, the iteration was introduced in .NET Framework 4.6.1 to fix bugs in the layout of hierarchical data.  It is not needed if the data is flat (no hierarchy), and .NET Framework 4.6.2 does not do it in that case.

#### Suggestion

If the iteration occurs in .NET Framework 4.6.1 but not in earlier releases - that is, if the [System.Windows.Controls.ItemsControl](https://learn.microsoft.com/search/?terms=System.Windows.Controls.ItemsControl) is item- scrolling a flat list with items of different pixel height - there are two remedies:

- Install .NET Framework 4.6.2.
- Install hotfix HR 1605 for .NET Framework 4.6.1.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.6.1 |
| Type | Runtime |

#### Affected APIs

- [System.Windows.Controls.VirtualizingStackPanel](https://learn.microsoft.com/search/?terms=System.Windows.Controls.VirtualizingStackPanel)

<!--

#### Affected APIs

- `T:System.Windows.Controls.VirtualizingStackPanel`

-->
