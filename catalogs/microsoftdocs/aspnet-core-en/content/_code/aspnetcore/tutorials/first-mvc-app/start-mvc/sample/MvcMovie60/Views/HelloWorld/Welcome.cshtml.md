# Source code: aspnetcore/tutorials/first-mvc-app/start-mvc/sample/MvcMovie60/Views/HelloWorld/Welcome.cshtml

Complete source file; linked examples may select a region or line range.

```
@{
    ViewData["Title"] = "Welcome";
}

<h2>Welcome</h2>

<ul>
    @for (int i = 0; i < (int)ViewData["NumTimes"]!; i++)
    {
        <li>@ViewData["Message"]</li>
    }
</ul>

```
