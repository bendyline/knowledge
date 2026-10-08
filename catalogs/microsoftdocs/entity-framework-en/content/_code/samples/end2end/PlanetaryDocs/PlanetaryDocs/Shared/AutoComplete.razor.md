# Source code: samples/end2end/PlanetaryDocs/PlanetaryDocs/Shared/AutoComplete.razor

Complete source file; linked examples may select a region or line range.

```
@inherits AutoCompleteBase

<div @onkeydown="HandleKeyDown" @onkeydown:stopPropagation>

    <span class="labelArea">@LabelText</span>

    @if (Selected)
    {
        <a href="#" 
            tabindex="@BaseIndex"
            title="@SelectedValue - Click to change"
            @onclick="async () => await SetSelectionAsync(string.Empty, true)"
            @onclick:preventDefault>
            @SelectedValue
        </a>
    }
    else
    {
        <input tabindex="@BaseIndex"
                @bind-value="Value"
                @ref="InputElem"
                @bind-value:event="oninput" 
                placeholder="@PlaceHolderText" />
    }

    @if (!Selected && Values != null)
    {
        foreach (var result in Values)
        {
            <p tabindex="@GetIndex(result)" class="@GetClass(result)" @onclick="async ()=>await SetSelectionAsync(result)">@result</p>
        }
    }
</div>

```
