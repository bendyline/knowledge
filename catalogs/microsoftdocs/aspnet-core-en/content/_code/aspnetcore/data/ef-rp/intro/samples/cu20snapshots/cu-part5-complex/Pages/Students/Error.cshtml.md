# Source code: aspnetcore/data/ef-rp/intro/samples/cu20snapshots/cu-part5-complex/Pages/Students/Error.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@{
    var message = TempData["HandleSqlException"] as string;
}

<p>@message</p>
```
