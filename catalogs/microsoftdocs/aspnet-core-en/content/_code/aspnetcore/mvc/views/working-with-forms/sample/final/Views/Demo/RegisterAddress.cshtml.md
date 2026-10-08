# Source code: aspnetcore/mvc/views/working-with-forms/sample/final/Views/Demo/RegisterAddress.cshtml

Complete source file; linked examples may select a region or line range.

```
@model RegisterAddressViewModel

<form asp-controller="Demo" asp-action="RegisterAddress" method="post">
    <label>Email: <input asp-for="Email" /></label> <br />
    <label>Password: <input asp-for="Password" /></label><br />
    <label>Address: <input asp-for="Address.AddressLine1" /></label><br />
    <button type="submit">Register</button>
</form>
```
