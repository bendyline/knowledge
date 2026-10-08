# Source code: aspnetcore/fundamentals/error-handling/samples/5.x/ErrorHandlingSample/Pages/Error.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@{
    Layout = null;  // clean up F12 tool network tab
}
@model ErrorModel
@{
    ViewData["Title"] = "Error";
}
<head>  <!-- prevent favicon.ico from being requested. -->
    <link rel="icon" href="data:,">
</head>
<h1 class="text-danger">Error from Error Page.</h1>
<h2 class="text-danger">An error occurred while processing your request.</h2>

@if (Model.ShowRequestId)
{
    <p>
        <strong>Request ID:</strong> <code>@Model.RequestId</code>
    </p>
}

<h3>Exception Message</h3>
<p>
    @Model.ExceptionMessage
</p>


```
