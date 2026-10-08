# Source code: samples/core/Miscellaneous/Multitenancy/TenantControls/TenantDisplay.razor

Complete source file; linked examples may select a region or line range.

```
@inject ITenantService TenantService

<div class="@TenantClass">@_tenant</div>

@code
{
    private string _tenant = null!;

    [Parameter]
    public string TenantClass { get; set; } = string.Empty;

    protected override void OnInitialized()
    {
        _tenant = TenantService.Tenant;
        TenantService.OnTenantChanged += (o, e) =>
        {
            _tenant = e.NewTenant;
            StateHasChanged();
        };

        base.OnInitialized();
    }
}

```
