# Source code: aspnetcore/mvc/views/display-templates/sample/Pages/Shared/DisplayTemplates/Address.cshtml

Complete source file; linked examples may select a region or line range.

```
@model Address

<dl>
    <dd>@Model.FirstName @Model.MiddleName @Model.LastName</dd>
    <dd>@Model.Street</dd>
    <dd>@Model.City @Model.State @Model.Zipcode</dd>
</dl>
```
