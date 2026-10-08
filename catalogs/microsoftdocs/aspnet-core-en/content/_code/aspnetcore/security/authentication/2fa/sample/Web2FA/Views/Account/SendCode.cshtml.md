# Source code: aspnetcore/security/authentication/2fa/sample/Web2FA/Views/Account/SendCode.cshtml

Complete source file; linked examples may select a region or line range.

```
@model SendCodeViewModel
@{
    ViewData["Title"] = "Send Verification Code";
}

<h2>@ViewData["Title"].</h2>

<form asp-controller="Account" asp-action="SendCode" asp-route-returnurl="@Model.ReturnUrl" method="post" class="form-horizontal">
    <input asp-for="RememberMe" type="hidden" />
    <div class="row">
        <div class="col-md-8">
            Select Two-Factor Authentication Provider:
            <select asp-for="SelectedProvider" asp-items="Model.Providers"></select>
            <button type="submit" class="btn btn-default">Submit</button>
        </div>
    </div>
</form>

@section Scripts {
    @{await Html.RenderPartialAsync("_ValidationScriptsPartial"); }
}

```
