# Source code: aspnetcore/fundamentals/app-state/6.0samples/SessionSample/Pages/Privacy.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model PrivacyModel
@{
    ViewData["Title"] = "Privacy Policy";
}
<h1>@ViewData["Title"]</h1>

<div class="text-center">
<p><b>Name:</b> @HttpContext.Session.GetString("_Name");<b>Age:

</b> @HttpContext.Session.GetInt32("_Age").ToString()</p>
</div>



```
