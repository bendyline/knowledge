# Source code: aspnetcore/security/gdpr/sample/RP2.2/Pages/Consent.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model Consent
@{
    ViewData["Title"] = "Consent";
}
<h2>@ViewData["Title"]</h2>

<form method="post">

    <div class="form-group">
        <input type="submit" value="Grant" asp-page-handler="Grant" class="btn btn-default" />
    </div>

    <div class="form-group">
        <input type="submit" value="Withdraw" asp-page-handler="Withdraw" class="btn btn-default" />
    </div>
</form>

```
