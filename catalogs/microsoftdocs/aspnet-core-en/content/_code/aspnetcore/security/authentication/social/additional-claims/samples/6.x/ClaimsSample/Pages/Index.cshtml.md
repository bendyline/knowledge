# Source code: aspnetcore/security/authentication/social/additional-claims/samples/6.x/ClaimsSample/Pages/Index.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}

<div class="text-center">
    <h1 class="display-4">Welcome</h1>
    <p>Learn about <a href="https://docs.microsoft.com/aspnet/core">building Web apps with ASP.NET Core</a>.</p>
    @if (Model.GivenNameClaim != null)
    {
        <p>
            Hello @Model.GivenNameClaim.Value!
        </p>
    }
    @if (Model.PictureUrlClaim != null)
    {
        <img style="margin:15px 0" alt="User's Google picture" src="@Model.PictureUrlClaim.Value">
    }
    @if (Model.LocaleClaim != null)
    {
        <p>
            Google locale: @Model.LocaleClaim.Value
        </p>
    }
</div>

```
