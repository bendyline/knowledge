### SerializableAttribute removed from some Windows Forms types

The [System.SerializableAttribute](https://learn.microsoft.com/search/?terms=System.SerializableAttribute) has been removed from some Windows Forms classes that have no known binary serialization scenarios.

#### Change description

The following types are decorated with the [System.SerializableAttribute](https://learn.microsoft.com/search/?terms=System.SerializableAttribute) in .NET Framework, but the attribute has been removed in .NET Core:

- `System.InvariantComparer`
- [System.ComponentModel.Design.ExceptionCollection](https://learn.microsoft.com/search/?terms=System.ComponentModel.Design.ExceptionCollection)
- [System.ComponentModel.Design.Serialization.CodeDomSerializerException](https://learn.microsoft.com/search/?terms=System.ComponentModel.Design.Serialization.CodeDomSerializerException)
- `System.ComponentModel.Design.Serialization.CodeDomComponentSerializationService.CodeDomSerializationStore`
- [System.Drawing.Design.ToolboxItem](https://learn.microsoft.com/search/?terms=System.Drawing.Design.ToolboxItem)
- `System.Resources.ResXNullRef`
- `System.Resources.ResXDataNode`
- `System.Resources.ResXFileRef`
- [System.Windows.Forms.Cursor](https://learn.microsoft.com/search/?terms=System.Windows.Forms.Cursor)
- `System.Windows.Forms.NativeMethods.MSOCRINFOSTRUCT`
- `System.Windows.Forms.NativeMethods.MSG`

Historically, this serialization mechanism has had serious maintenance and security concerns. Maintaining `SerializableAttribute` on types means those types must be tested for version-to-version serialization changes and potentially framework-to-framework serialization changes. This makes it harder to evolve those types and can be costly to maintain. These types have no known binary serialization scenarios, which minimizes the impact of removing the attribute.

For more information, see [Binary serialization](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/standard/serialization/binary-serialization.md).

#### Version introduced

3.0

#### Recommended action

Update any code that may depend on these types being marked as serializable.

#### Category

Windows Forms

#### Affected APIs

- None

<!--

#### Affected APIs

- Not detectable via API analysis

-->
