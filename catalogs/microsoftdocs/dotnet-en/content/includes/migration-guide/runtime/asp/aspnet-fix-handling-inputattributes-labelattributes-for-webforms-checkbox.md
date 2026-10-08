### ASP.NET Fix handling of InputAttributes and LabelAttributes for WebForms CheckBox control

#### Details

For applications that target .NET Framework 4.7.2 and earlier versions, [System.Web.UI.WebControls.CheckBox.InputAttributes](https://learn.microsoft.com/search/?terms=System.Web.UI.WebControls.CheckBox.InputAttributes) and [System.Web.UI.WebControls.CheckBox.LabelAttributes](https://learn.microsoft.com/search/?terms=System.Web.UI.WebControls.CheckBox.LabelAttributes) that are programmatically added to a WebForms [System.Web.UI.WebControls.CheckBox](https://learn.microsoft.com/search/?terms=System.Web.UI.WebControls.CheckBox) control are lost after postback. For applications that target .NET Framework 4.8 or later versions, they are preserved after postback.

#### Suggestion

For the correct behavior for restoring attributes on postback, set the `targetFrameworkVersion` to 4.8 or higher. For example:

```xml
<configuration>
<system.web>
<httpRuntime targetFramework="4.8"/>
</system.web>
</configuration>
```

Setting it lower, or not at all, preserves the old incorrect behavior.

| Name | Value |
| :--- | :--- |
| Scope | Unknown |
| Version | 4.8 |
| Type | Runtime |

#### Affected APIs

- [System.Web.UI.WebControls.CheckBox](https://learn.microsoft.com/search/?terms=System.Web.UI.WebControls.CheckBox)

<!--

#### Affected APIs

- `T:System.Web.UI.WebControls.CheckBox`

-->
