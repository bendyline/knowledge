# Source code: aspnetcore/security/authentication/social/additional-claims/samples/2.x/ClaimsSample/Areas/Identity/Pages/Account/Manage/DownloadPersonalData.cshtml

Complete source file; linked examples may select a region or line range.

```
@page
@model DownloadPersonalDataModel
@{
    ViewData["Title"] = "Download Your Data";
    ViewData["ActivePage"] = ManageNavPages.PersonalData;
}

<h4>@ViewData["Title"]</h4>

@section Scripts {
    <partial name="_ValidationScriptsPartial" />
}
```
