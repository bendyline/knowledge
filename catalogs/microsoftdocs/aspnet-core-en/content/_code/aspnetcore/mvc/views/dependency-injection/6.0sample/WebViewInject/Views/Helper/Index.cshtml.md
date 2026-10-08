# Source code: aspnetcore/mvc/views/dependency-injection/6.0sample/WebViewInject/Views/Helper/Index.cshtml

Complete source file; linked examples may select a region or line range.

```
@using System.Threading.Tasks
@using ViewInjectSample.Helpers
@inject MyHtmlHelper Html
<!DOCTYPE html>
<html>
<head>
    <title>My Helper</title>
</head>
<body>
    <div>
        Test: @Html.Value
    </div>
</body>
</html>
```
