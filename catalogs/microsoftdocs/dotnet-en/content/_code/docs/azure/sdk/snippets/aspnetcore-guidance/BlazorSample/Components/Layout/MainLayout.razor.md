# Source code: docs/azure/sdk/snippets/aspnetcore-guidance/BlazorSample/Components/Layout/MainLayout.razor

Complete source file; linked examples may select a region or line range.

```
@inherits LayoutComponentBase

<div class="page">
    <div class="sidebar">
        <NavMenu />
    </div>

    <main>
        <div class="top-row px-4">
            <a href="https://learn.microsoft.com/aspnet/core/" target="_blank">About</a>
        </div>

        <article class="content px-4">
            @Body
        </article>
    </main>
</div>

```
