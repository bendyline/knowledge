### Add SelectionTextBrush public property to TextBox/PasswordBox non-adorner selection

#### Details

In WPF applications using [non-adorner based text selection](https://github.com/Microsoft/dotnet/blob/main/Documentation/compatibility/wpf-TextBox-PasswordBox-text-selection-does-not-follow-system-colors.md) for [System.Windows.Controls.TextBox](https://learn.microsoft.com/search/?terms=System.Windows.Controls.TextBox) and [System.Windows.Controls.PasswordBox](https://learn.microsoft.com/search/?terms=System.Windows.Controls.PasswordBox), developers may now set the newly added SelectionTextBrush property in order to alter the rendering of the selected text.  By default, this color changes with [System.Windows.SystemColors.HighlightTextBrushKey](https://learn.microsoft.com/search/?terms=System.Windows.SystemColors.HighlightTextBrushKey).  If non-adorner based text selection is not enabled, this property does nothing.

#### Suggestion

Once non-adorner based text selection is enabled, you can use the [System.Windows.Controls.PasswordBox.SelectionTextBrush](https://learn.microsoft.com/search/?terms=System.Windows.Controls.PasswordBox.SelectionTextBrush) and [System.Windows.Controls.Primitives.TextBoxBase.SelectionTextBrush](https://learn.microsoft.com/search/?terms=System.Windows.Controls.Primitives.TextBoxBase.SelectionTextBrush) property to change the appearance of the selected text. This can be achieved using XAML:

```xaml
<TextBox SelectionBrush="Red" SelectionTextBrush="White"  SelectionOpacity="0.5"
Foreground="Blue" CaretBrush="Blue">
This is some text.
</TextBox>
```

| Name | Value |
| :--- | :--- |
| Scope | Major |
| Version | 4.8 |
| Type | Retargeting |

#### Affected APIs

- [System.Windows.Controls.Primitives.TextBoxBase.SelectionTextBrushProperty](https://learn.microsoft.com/search/?terms=System.Windows.Controls.Primitives.TextBoxBase.SelectionTextBrushProperty)
- [System.Windows.Controls.Primitives.TextBoxBase.SelectionTextBrush](https://learn.microsoft.com/search/?terms=System.Windows.Controls.Primitives.TextBoxBase.SelectionTextBrush)
- [System.Windows.Controls.TextBox](https://learn.microsoft.com/search/?terms=System.Windows.Controls.TextBox)
- [System.Windows.Controls.PasswordBox](https://learn.microsoft.com/search/?terms=System.Windows.Controls.PasswordBox)
