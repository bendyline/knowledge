# Source code: samples/end2end/PlanetaryDocs/PlanetaryDocs/Shared/DisabledNavLink.razor

Complete source file; linked examples may select a region or line range.

```
@inherits NavLink

<a @attributes="@AdditionalAttributes" 
   class="@CssClass" 
   @onclick:preventDefault>
    @ChildContent
</a>
```
