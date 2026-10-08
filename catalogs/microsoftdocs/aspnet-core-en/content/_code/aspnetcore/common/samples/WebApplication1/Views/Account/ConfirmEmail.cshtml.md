# Source code: aspnetcore/common/samples/WebApplication1/Views/Account/ConfirmEmail.cshtml

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
