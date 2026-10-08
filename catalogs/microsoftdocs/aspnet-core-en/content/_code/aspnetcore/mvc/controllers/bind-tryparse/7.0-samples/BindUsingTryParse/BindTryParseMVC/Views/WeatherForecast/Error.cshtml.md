# Source code: aspnetcore/mvc/controllers/bind-tryparse/7.0-samples/BindUsingTryParse/BindTryParseMVC/Views/WeatherForecast/Error.cshtml

Complete source file; linked examples may select a region or line range.

```
@model IEnumerable<Microsoft.AspNetCore.Mvc.ModelBinding.ModelError>
@{
    ViewData["Title"] = "Error";
}

@foreach (var modelError in Model) 
{
    <h2 class="text-danger">@modelError.ErrorMessage</h2>
}

```
