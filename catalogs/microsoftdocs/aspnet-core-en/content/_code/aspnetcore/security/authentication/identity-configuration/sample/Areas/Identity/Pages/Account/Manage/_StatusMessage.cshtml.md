# Source code: aspnetcore/security/authentication/identity-configuration/sample/Areas/Identity/Pages/Account/Manage/_StatusMessage.cshtml

Complete source file; linked examples may select a region or line range.

```
@model string

@if (!String.IsNullOrEmpty(Model))
{
    var statusMessageClass = Model.StartsWith("Error") ? "danger" : "success";
    <div class="alert alert-@statusMessageClass alert-dismissible" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        @Model
    </div>
}

```
