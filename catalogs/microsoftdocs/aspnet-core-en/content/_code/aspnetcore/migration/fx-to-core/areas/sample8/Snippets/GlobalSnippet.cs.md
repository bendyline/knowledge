# Source code: aspnetcore/migration/fx-to-core/areas/sample8/Snippets/GlobalSnippet.cs

Complete source file; linked examples may select a region or line range.

```
class GlobalSnippet
{
    void Snippet(WebApplicationBuilder builder)
    {
// <snippet_AddGlobal>
        builder.Services.AddSystemWebAdapters()
            .AddHttpApplication<Global>();
// </snippet_AddGlobal>
    }
}

class Global { }

```
