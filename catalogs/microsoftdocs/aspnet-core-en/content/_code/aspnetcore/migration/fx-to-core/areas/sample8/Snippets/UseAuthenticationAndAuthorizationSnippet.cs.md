# Source code: aspnetcore/migration/fx-to-core/areas/sample8/Snippets/UseAuthenticationAndAuthorizationSnippet.cs

Complete source file; linked examples may select a region or line range.

```
class UseAuthenticationAndAuthorizationSnippet
{
    void Snippet(WebApplication app)
    {
// <snippet_UseAuthenticationAndAuthorization>
        app.UseAuthentication();
        app.UseAuthenticationEvents();

        app.UseAuthorization();
        app.UseAuthorizationEvents();
// </snippet_UseAuthenticationAndAuthorization>
    }
}

```
