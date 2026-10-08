# Source code: aspnetcore/mvc/views/razor/sample/Views/Home/Contact4.cshtml

Complete source file; linked examples may select a region or line range.

```
@using Microsoft.AspNetCore.Hosting
@inject IHostingEnvironment Html

<div>The Application Name: @Html.ApplicationName</div>
<div>The Application ContentRootFileProvider: @Html.ContentRootFileProvider</div>
<div>The Application ContentRootPath: @Html.ContentRootPath</div>
<div>The Application EnvironmentName: @Html.EnvironmentName</div>

@*The following would generate a run time error
'IHostingEnvironment' does not contain a definition for 'Label' 

<p>@Html.Label("xyz")</p>
*@

```
