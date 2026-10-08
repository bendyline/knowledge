### CellFormatting event not raised if tooltip is shown

A [System.Windows.Forms.DataGridView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView) now shows a cell's text and error tooltips when hovered by a mouse and when selected via the keyboard. If a tooltip is shown, the [System.Windows.Forms.DataGridView.CellFormatting](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView.CellFormatting) event is not raised.

#### Change description

Prior to .NET Core 3.1, a [System.Windows.Forms.DataGridView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView) that had the [System.Windows.Forms.DataGridView.ShowCellToolTips%2A](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView.ShowCellToolTips%252A) property set to `true` showed a tooltip for a cell's text and errors when the cell was hovered by a mouse. Tooltips were not shown when a cell was selected via the keyboard (for example, by using the Tab key, shortcut keys, or arrow navigation). If the user edited a cell, and then, while the [System.Windows.Forms.DataGridView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView) was still in edit mode, hovered over a cell that did not have the [System.Windows.Forms.DataGridViewCell.ToolTipText](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewCell.ToolTipText) property set, a [System.Windows.Forms.DataGridView.CellFormatting](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView.CellFormatting) event was raised to format the cell's text for display in the cell.

To meet accessibility standards, starting in .NET Core 3.1, a [System.Windows.Forms.DataGridView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView) that has the [System.Windows.Forms.DataGridView.ShowCellToolTips%2A](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView.ShowCellToolTips%252A) property set to `true` shows tooltips for a cell's text and errors not only when the cell is hovered, but also when it's selected via the keyboard. As a consequence of this change, the [System.Windows.Forms.DataGridView.CellFormatting](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView.CellFormatting) event is *not* raised when cells that don't have the [System.Windows.Forms.DataGridViewCell.ToolTipText](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridViewCell.ToolTipText) property set are hovered while the [System.Windows.Forms.DataGridView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView) is in edit mode. The event is not raised because the content of the hovered cell is shown as a tooltip instead of being displayed in the cell.

#### Version introduced

3.1

#### Recommended action

Refactor any code that depends on the [System.Windows.Forms.DataGridView.CellFormatting](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView.CellFormatting) event while the [System.Windows.Forms.DataGridView](https://learn.microsoft.com/search/?terms=System.Windows.Forms.DataGridView) is in edit mode.

#### Category

Windows Forms

#### Affected APIs

None

<!-- 

#### Affected APIs

Not detectable via API analysis.

-->
