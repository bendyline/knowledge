### Items.Clear does not remove duplicates from SelectedItems

#### Details

Suppose a Selector (with multiple selection enabled) has duplicates in its [System.Windows.Controls.Primitives.MultiSelector.SelectedItems](https://learn.microsoft.com/search/?terms=System.Windows.Controls.Primitives.MultiSelector.SelectedItems) collection - the same item appears more than once.  Removing those items from the data source (e.g. by calling Items.Clear) fails to remove them from [System.Windows.Controls.Primitives.MultiSelector.SelectedItems](https://learn.microsoft.com/search/?terms=System.Windows.Controls.Primitives.MultiSelector.SelectedItems); only the first instance is removed. Furthermore, subsequent use of [System.Windows.Controls.Primitives.MultiSelector.SelectedItems](https://learn.microsoft.com/search/?terms=System.Windows.Controls.Primitives.MultiSelector.SelectedItems) (e.g. SelectedItems.Clear()) can encounter problems such as [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException), because [System.Windows.Controls.Primitives.MultiSelector.SelectedItems](https://learn.microsoft.com/search/?terms=System.Windows.Controls.Primitives.MultiSelector.SelectedItems) contains items that are no longer in the data source.

#### Suggestion

Upgrade if possible to .NET Framework 4.6.2.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.5 |
| Type | Runtime |

#### Affected APIs

- [System.Windows.Controls.Primitives.MultiSelector.SelectedItems](https://learn.microsoft.com/search/?terms=System.Windows.Controls.Primitives.MultiSelector.SelectedItems)

<!--

#### Affected APIs

- `P:System.Windows.Controls.Primitives.MultiSelector.SelectedItems`

-->
