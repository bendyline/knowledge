# Source code: aspnetcore/performance/caching/memory/samples/3.x/WebCacheSample/Views/Home/Dependent.cshtml

Complete source file; linked examples may select a region or line range.

```
@model DependentViewModel

<div>
    <h2>Actions</h2>
    <ul>
        <li><a asp-area="" asp-controller="Home" asp-action="CreateDependentEntries">CreateDependentEntries</a></li>
        <li><a asp-area="" asp-controller="Home" asp-action="GetDependentEntries">GetDependentEntries</a></li>
        <li><a asp-area="" asp-controller="Home" asp-action="RemoveChildEntry">RemoveChildEntry</a></li>
    </ul>
</div>

<h3>Current Time: @DateTime.Now.TimeOfDay.ToString()</h3>
<h3>Parent Cached Time: @(Model?.ParentCachedTime == null ? "No cached entry found" : Model.ParentCachedTime.Value.TimeOfDay.ToString())</h3>
<h3>Child Cached Time: @(Model?.ChildCachedTime == null ? "No cached entry found" : Model.ChildCachedTime.Value.TimeOfDay.ToString())</h3>
<h3>@(Model?.Message)</h3>


```
