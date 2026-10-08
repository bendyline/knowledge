# Source code: aspnetcore/security/authentication/identity/sample/src/ASPNETCore-IdentityDemoComplete/IdentityDemo/Views/Manage/_ManageNav.cshtml

Complete source file; linked examples may select a region or line range.

```
@using IdentityDemo.Views.Manage
@inject SignInManager<ApplicationUser> SignInManager
@{
    var hasExternalLogins = (await SignInManager.GetExternalAuthenticationSchemesAsync()).Any();
}

<ul class="nav nav-pills nav-stacked">
    <li class="@ManageNavPages.IndexNavClass(ViewContext)"><a asp-action="Index">Profile</a></li>
    <li class="@ManageNavPages.ChangePasswordNavClass(ViewContext)"><a asp-action="ChangePassword">Password</a></li>
    @if (hasExternalLogins)
    {
        <li class="@ManageNavPages.ExternalLoginsNavClass(ViewContext)"><a asp-action="ExternalLogins">External logins</a></li>
    }
    <li class="@ManageNavPages.TwoFactorAuthenticationNavClass(ViewContext)"><a asp-action="TwoFactorAuthentication">Two-factor authentication</a></li>
</ul>


```
