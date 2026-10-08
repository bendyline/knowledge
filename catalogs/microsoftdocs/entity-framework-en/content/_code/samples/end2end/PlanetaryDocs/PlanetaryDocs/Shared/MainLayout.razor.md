# Source code: samples/end2end/PlanetaryDocs/PlanetaryDocs/Shared/MainLayout.razor

Complete source file; linked examples may select a region or line range.

```
@inject LoadingService LoadingService

@inherits LayoutComponentBase

<div class="page">
    <div class="sidebar">
        <NavMenu />
    </div>

    <div class="main">
        <CascadingValue Value="LoadingService" 
                        IsFixed="true" 
                        TValue="LoadingService">
            <div class="content px-4">
                @Body
            </div>
        </CascadingValue>
    </div>
</div>

@code { 
    protected override void OnInitialized()
    {
        LoadingService.StateChangedCallback = StateHasChanged;
        base.OnInitialized();
    }
}
```
