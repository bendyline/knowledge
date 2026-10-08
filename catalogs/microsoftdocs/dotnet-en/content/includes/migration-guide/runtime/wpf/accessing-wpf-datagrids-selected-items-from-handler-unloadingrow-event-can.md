### Accessing a WPF DataGrid's selected items from a handler of the DataGrid's UnloadingRow event can cause a NullReferenceException

#### Details

Due to a bug in the .NET Framework 4.5, event handlers for [System.Windows.Controls.DataGrid](https://learn.microsoft.com/search/?terms=System.Windows.Controls.DataGrid) events involving the removal of a row can cause a [System.NullReferenceException](https://learn.microsoft.com/search/?terms=System.NullReferenceException) to be thrown if they access the [System.Windows.Controls.DataGrid](https://learn.microsoft.com/search/?terms=System.Windows.Controls.DataGrid)'s [System.Windows.Controls.Primitives.Selector.SelectedItem](https://learn.microsoft.com/search/?terms=System.Windows.Controls.Primitives.Selector.SelectedItem) or [System.Windows.Controls.Primitives.MultiSelector.SelectedItems](https://learn.microsoft.com/search/?terms=System.Windows.Controls.Primitives.MultiSelector.SelectedItems) properties.

#### Suggestion

This issue has been fixed in the .NET Framework 4.6 and may be addressed by upgrading to that version of the .NET Framework.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.5 |
| Type | Runtime |

#### Affected APIs

- [System.Windows.Controls.DataGrid.UnloadingRow](https://learn.microsoft.com/search/?terms=System.Windows.Controls.DataGrid.UnloadingRow)
- [System.Windows.Controls.DataGrid.UnloadingRowDetails](https://learn.microsoft.com/search/?terms=System.Windows.Controls.DataGrid.UnloadingRowDetails)

<!--

#### Affected APIs

- `E:System.Windows.Controls.DataGrid.UnloadingRow`
- `E:System.Windows.Controls.DataGrid.UnloadingRowDetails`

-->
