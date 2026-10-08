# Source code: aspnetcore/mvc/views/dependency-injection/6.0sample/WebViewInject/Views/Home/Privacy.cshtml

Complete source file; linked examples may select a region or line range.

```
@using Microsoft.Extensions.Configuration
@inject IConfiguration Configuration
@{
    ViewData["Title"] = "Privacy MVC";
}
<h1>@ViewData["Title"]</h1>

<p>MVC Use this page to detail your site's privacy policy.</p>

<h2>
   MyRoot:MyParent:MyChildName: @Configuration["MyRoot:MyParent:MyChildName"]
</h2>

```
