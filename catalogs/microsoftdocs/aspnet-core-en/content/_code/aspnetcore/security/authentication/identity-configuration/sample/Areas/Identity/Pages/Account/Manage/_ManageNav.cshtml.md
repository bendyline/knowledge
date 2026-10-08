# Source code: aspnetcore/security/authentication/identity-configuration/sample/Areas/Identity/Pages/Account/Manage/_ManageNav.cshtml

Complete source file; linked examples may select a region or line range.

```
@inject SignInManager<IdentityUser> SignInManager
@{
    var hasExternalLogins = (await SignInManager.GetExternalAuthenticationSchemesAsync()).Any();
}
<ul class="nav nav-pills nav-stacked">
    <li class="@ManageNavPages.IndexNavClass(ViewContext)"><a asp-page="./Index">Profile</a></li>
    <li class="@ManageNavPages.ChangePasswordNavClass(ViewContext)"><a id="change-password" asp-page="./ChangePassword">Password</a></li>
    @if (hasExternalLogins)
    {
        <li class="@ManageNavPages.ExternalLoginsNavClass(ViewContext)"><a id="external-login" asp-page="./ExternalLogins">External logins</a></li>
    }
    <li class="@ManageNavPages.TwoFactorAuthenticationNavClass(ViewContext)"><a asp-page="./TwoFactorAuthentication">Two-factor authentication</a></li>
    <li class="@ManageNavPages.PersonalDataNavClass(ViewContext)"><a asp-page="./PersonalData">Personal data</a></li>
</ul>

```
