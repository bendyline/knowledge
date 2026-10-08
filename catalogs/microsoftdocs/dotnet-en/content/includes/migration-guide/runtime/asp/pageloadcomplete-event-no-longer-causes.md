### Page.LoadComplete event no longer causes System.Web.UI.WebControls.EntityDataSource control to invoke data binding

#### Details

The [System.Web.UI.Page.LoadComplete](https://learn.microsoft.com/search/?terms=System.Web.UI.Page.LoadComplete) event no longer causes the [System.Web.UI.WebControls.EntityDataSource](https://learn.microsoft.com/search/?terms=System.Web.UI.WebControls.EntityDataSource) control to invoke data binding for changes to create/update/delete parameters. This change eliminates an extraneous trip to the database, prevents the values of controls from being reset, and produces behavior that is consistent with other data controls, such as [System.Web.UI.WebControls.SqlDataSource](https://learn.microsoft.com/search/?terms=System.Web.UI.WebControls.SqlDataSource) and [System.Web.UI.WebControls.ObjectDataSource](https://learn.microsoft.com/search/?terms=System.Web.UI.WebControls.ObjectDataSource). This change produces different behavior in the unlikely event that applications rely on invoking data binding in the [System.Web.UI.Page.LoadComplete](https://learn.microsoft.com/search/?terms=System.Web.UI.Page.LoadComplete) event.

#### Suggestion

If there is a need for databinding, manually invoke databind in an event that is earlier in the post-back.

| Name | Value |
| :--- | :--- |
| Scope | Edge |
| Version | 4.5 |
| Type | Runtime |

#### Affected APIs

Not detectable via API analysis.

<!--

#### Affected APIs

Not detectable via API analysis.

-->
