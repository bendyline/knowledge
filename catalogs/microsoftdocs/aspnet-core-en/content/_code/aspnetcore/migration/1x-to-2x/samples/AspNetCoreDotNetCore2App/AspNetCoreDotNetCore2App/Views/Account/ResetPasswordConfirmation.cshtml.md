# Source code: aspnetcore/migration/1x-to-2x/samples/AspNetCoreDotNetCore2App/AspNetCoreDotNetCore2App/Views/Account/ResetPasswordConfirmation.cshtml

Complete source file; linked examples may select a region or line range.

```
@{
    ViewData["Title"] = "Reset password confirmation";
}

<h1>@ViewData["Title"].</h1>
<p>
    Your password has been reset. Please <a asp-controller="Account" asp-action="Login">Click here to log in</a>.
</p>

```
