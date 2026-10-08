# Source code: samples/end2end/PlanetaryDocs/PlanetaryDocs/Shared/TagSearch.razor

Complete source file; linked examples may select a region or line range.

```
@inherits TagSearchBase

<AutoComplete TabIndex="@TabIndex"
              LabelText="Tag:" 
              PlaceHolderText="Type the tag..."
              @bind-SelectedValue="Tag"
              SearchFn="SearchAsync" />
```
