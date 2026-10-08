# Source code: aspnetcore/security/authentication/identity-configuration/sample/Areas/Identity/Pages/Account/Lockout.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model LockoutModel
@{
    ViewData["Title"] = "Locked out";
}

<header>
    <h1 class="text-danger">@ViewData["Title"]</h1>
    <p class="text-danger">This account has been locked out, please try again later.</p>
</header>

```
