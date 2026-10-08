### Calling DataGrid.CommitEdit from a CellEditEnding handler drops focus

#### Details

Calling [System.Windows.Controls.DataGrid.CommitEdit](https://learn.microsoft.com/search/?terms=System.Windows.Controls.DataGrid.CommitEdit) from one of the [System.Windows.Controls.DataGrid](https://learn.microsoft.com/search/?terms=System.Windows.Controls.DataGrid)'s [System.Windows.Controls.DataGrid.CellEditEnding](https://learn.microsoft.com/search/?terms=System.Windows.Controls.DataGrid.CellEditEnding) event handlers causes the [System.Windows.Controls.DataGrid](https://learn.microsoft.com/search/?terms=System.Windows.Controls.DataGrid) to lose focus.

#### Suggestion

This bug has been fixed in the .NET Framework 4.5.2, so it can be avoided by upgrading the .NET Framework. Alternatively, it can be avoided by explicitly re-selecting the [System.Windows.Controls.DataGrid](https://learn.microsoft.com/search/?terms=System.Windows.Controls.DataGrid) after calling [System.Windows.Controls.DataGrid.CommitEdit](https://learn.microsoft.com/search/?terms=System.Windows.Controls.DataGrid.CommitEdit).

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.5 |
| Type | Runtime |

#### Affected APIs

- [System.Windows.Controls.DataGrid.CommitEdit](https://learn.microsoft.com/search/?terms=System.Windows.Controls.DataGrid.CommitEdit)
- [System.Windows.Controls.DataGrid.CommitEdit(System.Windows.Controls.DataGridEditingUnit,System.Boolean)](https://learn.microsoft.com/search/?terms=System.Windows.Controls.DataGrid.CommitEdit(System.Windows.Controls.DataGridEditingUnit%2CSystem.Boolean))

<!--

#### Affected APIs

- `M:System.Windows.Controls.DataGrid.CommitEdit`
- `M:System.Windows.Controls.DataGrid.CommitEdit(System.Windows.Controls.DataGridEditingUnit,System.Boolean)`

-->
