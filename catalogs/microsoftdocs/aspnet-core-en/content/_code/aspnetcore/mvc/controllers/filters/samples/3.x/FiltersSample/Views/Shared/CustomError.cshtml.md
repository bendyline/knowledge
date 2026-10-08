# Source code: aspnetcore/mvc/controllers/filters/samples/3.x/FiltersSample/Views/Shared/CustomError.cshtml

Complete source file; linked examples may select a region or line range.

```
@{
    Layout = null;
    var exception = ViewData["Exception"] as Exception;
}

<!DOCTYPE html>

<html>
<head>
    <title>Custom Error Page</title>
</head>
<body>
    <div>
        <h1>Custom Error Page</h1>
    </div>
    <footer>
        Exception Details: @exception.Message
    </footer>
</body>
</html>
```
