# Source code: aspnetcore/migration/1x-to-2x/samples/AspNetCoreDotNetCore1App/AspNetCoreDotNetCore1App/Views/Account/ConfirmEmail.cshtml

Complete source file; linked examples may select a region or line range.

```
@{
    ViewData["Title"] = "Confirm Email";
}

<h2>@ViewData["Title"].</h2>
<div>
    <p>
        Thank you for confirming your email. Please <a asp-controller="Account" asp-action="Login">Click here to Log in</a>.
    </p>
</div>

```
