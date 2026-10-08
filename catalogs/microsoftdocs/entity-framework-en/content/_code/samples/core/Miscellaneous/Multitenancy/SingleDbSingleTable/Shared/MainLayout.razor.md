# Source code: samples/core/Miscellaneous/Multitenancy/SingleDbSingleTable/Shared/MainLayout.razor

Complete source file; linked examples may select a region or line range.

```
@inherits LayoutComponentBase

<PageTitle>Single Db Single Table Multitenant</PageTitle>

<div class="page">
    <div class="sidebar">
        <NavMenu />
    </div>

    <main>
        <div class="top-row px-4">
            <a href="https://docs.microsoft.com/aspnet/" target="_blank">About</a>
        </div>

        <article class="content px-4">
            @Body
        </article>
    </main>
</div>

```
