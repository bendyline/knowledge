### DataGridCellsPanel.BringIndexIntoView throws ArgumentOutOfRangeException

#### Details

[System.Windows.Controls.DataGrid.ScrollIntoView(System.Object)](https://learn.microsoft.com/search/?terms=System.Windows.Controls.DataGrid.ScrollIntoView(System.Object)) will work asynchronously when column virtualization is enabled but the column widths have not yet been determined. If columns are removed before the asynchronous work happens, an [System.ArgumentOutOfRangeException](https://learn.microsoft.com/search/?terms=System.ArgumentOutOfRangeException) can occur.

#### Suggestion

Any one of the following:

- Upgrade to .NET Framework 4.7.
- Install the latest servicing patch for .NET Framework 4.6.2.
- Avoid removing columns until the asynchronous response to [System.Windows.Controls.DataGrid.ScrollIntoView(System.Object)](https://learn.microsoft.com/search/?terms=System.Windows.Controls.DataGrid.ScrollIntoView(System.Object)) has completed.

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.6.2 |
| Type | Runtime |

#### Affected APIs

- [System.Windows.Controls.DataGrid.ScrollIntoView(System.Object)](https://learn.microsoft.com/search/?terms=System.Windows.Controls.DataGrid.ScrollIntoView(System.Object))
- [System.Windows.Controls.DataGrid.ScrollIntoView(System.Object,System.Windows.Controls.DataGridColumn)](https://learn.microsoft.com/search/?terms=System.Windows.Controls.DataGrid.ScrollIntoView(System.Object%2CSystem.Windows.Controls.DataGridColumn))

<!--

#### Affected APIs

- `M:System.Windows.Controls.DataGrid.ScrollIntoView(System.Object)`
- `M:System.Windows.Controls.DataGrid.ScrollIntoView(System.Object,System.Windows.Controls.DataGridColumn)`

-->
