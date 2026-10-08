### GridViews with AllowCustomPaging set to true may fire the PageIndexChanging event when leaving the final page of the view

#### Details

A bug in the .NET Framework 4.5 causes [System.Web.UI.WebControls.GridView.PageIndexChanging](https://learn.microsoft.com/search/?terms=System.Web.UI.WebControls.GridView.PageIndexChanging) to sometimes not fire for [System.Web.UI.WebControls.GridView](https://learn.microsoft.com/search/?terms=System.Web.UI.WebControls.GridView)s that have enabled [System.Web.UI.WebControls.GridView.AllowCustomPaging](https://learn.microsoft.com/search/?terms=System.Web.UI.WebControls.GridView.AllowCustomPaging).

#### Suggestion

This issue has been fixed in the .NET Framework 4.6 and may be addressed by upgrading to that version of the .NET Framework. As a work-around, the app can do an explicit BindGrid on any `Page_Load` that would hit these conditions (the [System.Web.UI.WebControls.GridView](https://learn.microsoft.com/search/?terms=System.Web.UI.WebControls.GridView) is on the last page and Last[System.Web.UI.WebControls.GridView.PageSize](https://learn.microsoft.com/search/?terms=System.Web.UI.WebControls.GridView.PageSize) is different from [System.Web.UI.WebControls.GridView.PageSize](https://learn.microsoft.com/search/?terms=System.Web.UI.WebControls.GridView.PageSize)). Alternatively, the app can be modified to allow paging (instead of custom paging), as that scenario does not demonstrate the problem.

| Name | Value |
| :--- | :--- |
| Scope | Minor |
| Version | 4.5 |
| Type | Runtime |

#### Affected APIs

- [System.Web.UI.WebControls.GridView.AllowCustomPaging](https://learn.microsoft.com/search/?terms=System.Web.UI.WebControls.GridView.AllowCustomPaging)

<!--

#### Affected APIs

- `P:System.Web.UI.WebControls.GridView.AllowCustomPaging`

-->
