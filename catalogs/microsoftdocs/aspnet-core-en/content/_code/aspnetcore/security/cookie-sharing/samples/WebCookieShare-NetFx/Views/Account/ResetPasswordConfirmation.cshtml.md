# Source code: aspnetcore/security/cookie-sharing/samples/WebCookieShare-NetFx/Views/Account/ResetPasswordConfirmation.cshtml

Complete source file; linked examples may select a region or line range.

```
@{
    ViewBag.Title = "Reset password confirmation";
}

<hgroup class="title">
    <h1>@ViewBag.Title.</h1>
</hgroup>
<div>
    <p>
        Your password has been reset. Please @Html.ActionLink("click here to log in", "Login", "Account", routeValues: null, htmlAttributes: new { id = "loginLink" })
    </p>
</div>

```
