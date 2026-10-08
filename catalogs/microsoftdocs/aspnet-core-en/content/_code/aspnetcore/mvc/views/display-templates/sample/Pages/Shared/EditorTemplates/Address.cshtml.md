# Source code: aspnetcore/mvc/views/display-templates/sample/Pages/Shared/EditorTemplates/Address.cshtml

Complete source file; linked examples may select a region or line range.

```
@model Address

<dl>
    <dd>    Name:
        <input asp-for="FirstName" /> <input asp-for="MiddleName" /> <input asp-for="LastName" /> 
    </dd>
        <dd>    Street:
        <input asp-for="Street" /> 
    </dd>

        <dd>    city/state/zip:
        <input asp-for="City" /> <input asp-for="State" /> <input asp-for="Zipcode" /> 
    </dd>

</dl>

```
