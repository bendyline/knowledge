# Source code: aspnetcore/security/cookie-sharing/samples/WebCookieShare-NetFx/Views/Account/ConfirmEmail.cshtml

Complete source file; linked examples may select a region or line range.

```
@{
    ViewBag.Title = "Confirm Email";
}

<h2>@ViewBag.Title.</h2>
<div>
    <p>
        Thank you for confirming your email. Please @Html.ActionLink("Click here to Log in", "Login", "Account", routeValues: null, htmlAttributes: new { id = "loginLink" })
    </p>
</div>

```
