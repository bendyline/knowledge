# Source code: samples/end2end/PlanetaryDocs/PlanetaryDocs/Shared/AliasSearch.razor

Complete source file; linked examples may select a region or line range.

```
@inherits AliasSearchBase

<AutoComplete @ref="AutoComplete"
              TabIndex="@TabIndex"
              LabelText="Alias:" 
              PlaceHolderText="Type the alias..."
              @bind-SelectedValue="Alias"
              SearchFn="SearchAsync"/>
```
