# Source code: aspnetcore/mvc/views/working-with-forms/sample/final/Views/Demo/RegisterInput.cshtml

Complete source file; linked examples may select a region or line range.

```
@model RegisterViewModel

<form asp-controller="Demo" asp-action="RegisterInput" method="post">
    <label>Email: <input asp-for="Email" /></label> <br />
    <label>Password: <input asp-for="Password" /></label><br />
    <button type="submit">Register</button>
</form>
```
