# Source code: aspnetcore/security/authentication/identity/sample/src/ASPNETCore-IdentityDemoComplete/IdentityDemo/Views/Manage/_Layout.cshtml

Complete source file; linked examples may select a region or line range.

```
@{ 
    Layout = "/Views/Shared/_Layout.cshtml";
}

<h2>Manage your account</h2>

<div>
    <h4>Change your account settings</h4>
    <hr />
    <div class="row">
        <div class="col-md-3">
            @await Html.PartialAsync("_ManageNav")
        </div>
        <div class="col-md-9">
            @RenderBody()
        </div>
    </div>
</div>

@section Scripts {
    @RenderSection("Scripts", required: false)
}
        

```
