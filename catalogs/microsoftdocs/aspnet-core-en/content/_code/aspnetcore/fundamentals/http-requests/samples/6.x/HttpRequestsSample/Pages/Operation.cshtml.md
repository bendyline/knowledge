# Source code: aspnetcore/fundamentals/http-requests/samples/6.x/HttpRequestsSample/Pages/Operation.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model HttpRequestsSample.Pages.OperationModel

@{
    ViewData["Title"] = "Operation";
}

<h1>Operation</h1>

<div>Request Scope: @Model.OperationIdFromRequestScope</div>
<div>Handler Scope: @Model.OperationIdFromHandlerScope</div>

```
