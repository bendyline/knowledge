# Source code: aspnetcore/security/authentication/cookie/samples/2.x/CookieSample/Pages/_LoginPartial.cshtml

Complete source file; linked examples may select a region or line range.

```
@inject Microsoft.AspNetCore.Http.IHttpContextAccessor HttpContextAccessor;

@if (HttpContextAccessor.HttpContext.User.Identity.IsAuthenticated)
{
    <form asp-controller="Account" asp-action="Logout" method="post" id="logoutForm">
        <ul>
            <li>
                <button type="submit" class="btn-link" style="padding:0">Sign out</button>
            </li>
        </ul>
    </form>
}
else
{
    <ul>
        <li><a asp-page="/Account/Login">Sign in</a></li>
    </ul>
}

```
