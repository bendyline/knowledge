# Source code: samples/end2end/PlanetaryDocs/PlanetaryDocs/Pages/Add.razor

Complete source file; linked examples may select a region or line range.

```
@page "/Add"

@inherits AddBase

<div class="container">
    @if (Saving)
    {
        <Saving/>
    }
    else if (Loading)
    {
        <Loading/>
    }
    else
    {
        <EditBar ChangeCount="ChangeCount"
                 IsValid="IsValid"
                 IsDirty="IsDirty"
                 SaveAsync="SaveAsync"/>
        <div class="row">
            <div class="col-12">
                <Editor DocumentToEdit="Document"
                        Insert="true"
                        @bind-IsValid="IsValid"
                        @bind-ChangeCount="ChangeCount"
                        @ref="Editor" />
            </div>
        </div>
    }
</div>
```
