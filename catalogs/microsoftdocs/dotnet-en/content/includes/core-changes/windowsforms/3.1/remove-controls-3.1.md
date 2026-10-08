### Removed controls

Starting in .NET Core 3.1, some Windows Forms controls are no longer available.

#### Change description

Starting with .NET Core 3.1, various Windows Forms controls are no longer available. Replacement controls that have better design and support were introduced in .NET Framework 2.0. The deprecated controls were previously removed from designer toolboxes but were still available to be used.

The following types are no longer available:

- [System.Windows.Forms.ContextMenu](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ContextMenu)
- [System.Windows.Forms.DataGrid](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGrid)
- [System.Windows.Forms.DataGrid.HitTestType](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGrid.HitTestType)
- [System.Windows.Forms.DataGrid.HitTestInfo](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGrid.HitTestInfo)
- [System.Windows.Forms.DataGridBoolColumn](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridBoolColumn)
- [System.Windows.Forms.DataGridCell](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridCell)
- [System.Windows.Forms.DataGridColumnStyle](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridColumnStyle)
- [System.Windows.Forms.DataGridColumnStyle.DataGridColumnHeaderAccessibleObject](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridColumnStyle.DataGridColumnHeaderAccessibleObject)
- [System.Windows.Forms.DataGridColumnStyle.CompModSwitches](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridColumnStyle.CompModSwitches)
- [System.Windows.Forms.DataGridLineStyle](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridLineStyle)
- [System.Windows.Forms.DataGridParentRowsLabelStyle](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridParentRowsLabelStyle)
- [System.Windows.Forms.DataGridPreferredColumnWidthTypeConverter](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridPreferredColumnWidthTypeConverter)
- [System.Windows.Forms.DataGridTableStyle](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridTableStyle)
- [System.Windows.Forms.DataGridTextBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridTextBox)
- [System.Windows.Forms.DataGridTextBoxColumn](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridTextBoxColumn)
- [System.Windows.Forms.GridColumnStylesCollection](https://learn.microsoft.com/search/?terms=System.Windows.Forms.GridColumnStylesCollection)
- [System.Windows.Forms.GridTablesFactory](https://learn.microsoft.com/search/?terms=System.Windows.Forms.GridTablesFactory)
- [System.Windows.Forms.GridTableStylesCollection](https://learn.microsoft.com/search/?terms=System.Windows.Forms.GridTableStylesCollection)
- [System.Windows.Forms.IDataGridEditingService](https://learn.microsoft.com/search/?terms=System.Windows.Forms.IDataGridEditingService)
- [System.Windows.Forms.Design.IMenuEditorService](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Design.IMenuEditorService)
- [System.Windows.Forms.MainMenu](https://learn.microsoft.com/search/?terms=System.Windows.Forms.MainMenu)
- [System.Windows.Forms.Menu](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Menu)
- [System.Windows.Forms.Menu.MenuItemCollection](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Menu.MenuItemCollection)
- [System.Windows.Forms.MenuItem](https://learn.microsoft.com/search/?terms=System.Windows.Forms.MenuItem)
- [System.Windows.Forms.ToolBar](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolBar)
- [System.Windows.Forms.ToolBarAppearance](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolBarAppearance)
- [System.Windows.Forms.ToolBarButton](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolBarButton)
- [System.Windows.Forms.ToolBar.ToolBarButtonCollection](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolBar.ToolBarButtonCollection)
- [System.Windows.Forms.ToolBarButtonClickEventArgs](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolBarButtonClickEventArgs)
- [System.Windows.Forms.ToolBarButtonStyle](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolBarButtonStyle)
- [System.Windows.Forms.ToolBarTextAlign](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolBarTextAlign)

#### Version introduced

3.1

#### Recommended action

Each removed control has a recommended replacement control. Refer to the following table:

| Removed control (API) | Recommended replacement | Associated APIs that are removed |
| --- | --- | --- |
| ContextMenu | ContextMenuStrip |  |
| DataGrid | DataGridView | DataGridCell, DataGridRow, DataGridTableCollection, DataGridColumnCollection, DataGridTableStyle, DataGridColumnStyle, DataGridLineStyle, DataGridParentRowsLabel, DataGridParentRowsLabelStyle, DataGridBoolColumn, DataGridTextBox, GridColumnStylesCollection, GridTableStylesCollection, HitTestType |
| MainMenu | MenuStrip |  |
| Menu | ToolStripDropDown, ToolStripDropDownMenu | MenuItemCollection |
| MenuItem | ToolStripMenuItem |  |
| ToolBar | ToolStrip | ToolBarAppearance |
| ToolBarButton | ToolStripButton | ToolBarButtonClickEventArgs, ToolBarButtonClickEventHandler, ToolBarButtonStyle, ToolBarTextAlign |

#### Category

Windows Forms

#### Affected APIs

- [System.Windows.Forms.ContextMenu](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ContextMenu)
- [System.Windows.Forms.GridColumnStylesCollection](https://learn.microsoft.com/search/?terms=System.Windows.Forms.GridColumnStylesCollection)
- [System.Windows.Forms.GridTablesFactory](https://learn.microsoft.com/search/?terms=System.Windows.Forms.GridTablesFactory)
- [System.Windows.Forms.GridTableStylesCollection](https://learn.microsoft.com/search/?terms=System.Windows.Forms.GridTableStylesCollection)
- [System.Windows.Forms.IDataGridEditingService](https://learn.microsoft.com/search/?terms=System.Windows.Forms.IDataGridEditingService)
- [System.Windows.Forms.MainMenu](https://learn.microsoft.com/search/?terms=System.Windows.Forms.MainMenu)
- [System.Windows.Forms.Menu](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Menu)
- [System.Windows.Forms.Menu.MenuItemCollection](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Menu.MenuItemCollection)
- [System.Windows.Forms.MenuItem](https://learn.microsoft.com/search/?terms=System.Windows.Forms.MenuItem)
- [System.Windows.Forms.ToolBar](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolBar)
- [System.Windows.Forms.ToolBar.ToolBarButtonCollection](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolBar.ToolBarButtonCollection)
- [System.Windows.Forms.ToolBarAppearance](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolBarAppearance)
- [System.Windows.Forms.ToolBarButton](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolBarButton)
- [System.Windows.Forms.ToolBarButtonClickEventArgs](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolBarButtonClickEventArgs)
- [System.Windows.Forms.ToolBarButtonStyle](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolBarButtonStyle)
- [System.Windows.Forms.ToolBarTextAlign](https://learn.microsoft.com/search/?terms=System.Windows.Forms.ToolBarTextAlign)
- [System.Windows.Forms.DataGrid](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGrid)
- [System.Windows.Forms.DataGrid.HitTestType](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGrid.HitTestType)
- [System.Windows.Forms.DataGridBoolColumn](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridBoolColumn)
- [System.Windows.Forms.DataGridCell](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridCell)
- [System.Windows.Forms.DataGridColumnStyle](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridColumnStyle)
- [System.Windows.Forms.DataGridLineStyle](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridLineStyle)
- [System.Windows.Forms.DataGridParentRowsLabelStyle](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridParentRowsLabelStyle)
- [System.Windows.Forms.DataGridPreferredColumnWidthTypeConverter](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridPreferredColumnWidthTypeConverter)
- [System.Windows.Forms.DataGridTableStyle](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridTableStyle)
- [System.Windows.Forms.DataGridTextBox](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridTextBox)
- [System.Windows.Forms.DataGridTextBoxColumn](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridTextBoxColumn)
- [System.Windows.Forms.Design.IMenuEditorService](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Design.IMenuEditorService)

<!-- 

#### Affected APIs

- `T:System.Windows.Forms.Menu`
- `T:System.Windows.Forms.Menu.MenuItemCollection`
- `T:System.Windows.Forms.MainMenu`
- `T:System.Windows.Forms.ContextMenu`
- `T:System.Windows.Forms.MenuItem`
- `T:System.Windows.Forms.ToolBar`
- `T:System.Windows.Forms.ToolBarAppearance`
- `T:System.Windows.Forms.ToolBarButton`
- `T:System.Windows.Forms.ToolBar.ToolBarButtonCollection`
- `T:System.Windows.Forms.ToolBarButtonClickEventArgs`
- `T:System.Windows.Forms.ToolBarButtonStyle`
- `T:System.Windows.Forms.ToolBarTextAlign`
- `T:System.Windows.Forms.DataGrid`
- `T:System.Windows.Forms.DataGridBoolColumn`
- `T:System.Windows.Forms.DataGridCell`
- `T:System.Windows.Forms.DataGridColumnStyle`
- `T:System.Windows.Forms.DataGridLineStyle`
- `T:System.Windows.Forms.DataGridParentRowsLabelStyle`
- `T:System.Windows.Forms.DataGridPreferredColumnWidthTypeConverter`
- `T:System.Windows.Forms.DataGridTableStyle`
- `T:System.Windows.Forms.DataGridTextBox`
- `T:System.Windows.Forms.DataGridTextBoxColumn`
- `T:System.Windows.Forms.GridColumnStylesCollection`
- `T:System.Windows.Forms.GridTablesFactory`
- `T:System.Windows.Forms.GridTableStylesCollection`
- `T:System.Windows.Forms.IDataGridEditingService`
- `T:System.Windows.Forms.DataGrid.HitTestType`
- `T:System.Windows.Forms.Design.IMenuEditorService`

-->
