# Source code: aspnetcore/fundamentals/http-requests/samples/5.x/HttpRequestsSample/Pages/Operation.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model OperationModel

@{
    ViewData["Title"] = "Operation";
}

<div>Request Scope: @Model.OperationIdFromRequestScope</div>
<div>Handler Scope: @Model.OperationIdFromHandlerScope</div>

```
