# Source code: samples/end2end/PlanetaryDocs/PlanetaryDocs/Shared/TagPicker.razor

Complete source file; linked examples may select a region or line range.

```
@inherits TagPickerBase

@if (Tags != null && Tags.Count > 0)
{
    foreach (var tag in Tags)
    {
        <span>
            "@tag" [<a href="#"
                       title="Remove"
                       tabindex="@(IndexForTag(tag))"
                       @onclick="async () => await RemoveAsync(tag)"
                       @onclick:preventDefault>x</a>]
            &nbsp;
        </span>
    }
}
@if (PickNew)
{
    <TagSearch TabIndex="@(AltTabIndex.ToString())"
               @bind-Tag="@NewTag" />
}
else
{
    <a href="#"
       tabindex="@AltTabIndex"
       @onclick="() => PickNew = true"
       @onclick:preventDefault>Pick Existing</a>
}
&nbsp;
<input type="text" placeholder="Enter new tag"
       tabindex="@(AltTabIndex + 1)"
       @bind-value="AddTag"
       @bind-value:event="oninput" />[
@if (string.IsNullOrWhiteSpace(AddTag))
{
    <span>&nbsp;</span>
}
else
{
    <a href="#"
       tabindex="@(AltTabIndex + 2)"
       title="Add Tag"
       @onclick="() => NewTag = AddTag"
       @onclick:preventDefault>+</a>
}]
```
