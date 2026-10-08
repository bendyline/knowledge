**Applies to: \>= aspnetcore-3.0 < aspnetcore-6.0**

* The project templates include extension points and stubbed markup that you can replace with your privacy and cookie use policy.
* The `Pages/Privacy.cshtml` page or `Views/Home/Privacy.cshtml` view provides a page to detail your site's privacy policy.

To enable the default cookie consent feature like that found in the ASP.NET Core 2.2 templates in a current ASP.NET Core template generated app:

* Add `using Microsoft.AspNetCore.Http` to the list of using directives.
* Add [Microsoft.AspNetCore.Builder.CookiePolicyOptions](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CookiePolicyOptions) to `Startup.ConfigureServices` and [Microsoft.AspNetCore.Builder.CookiePolicyAppBuilderExtensions.UseCookiePolicy%2A](https://learn.microsoft.com/search/?terms=Microsoft.AspNetCore.Builder.CookiePolicyAppBuilderExtensions.UseCookiePolicy%252A) to `Startup.Configure`:

  [Main (complete source file; reference: \~/security/gdpr/sample/RP3.0/Startup.cs?name=snippet1\&highlight=12-19,38)](../../../../_code/aspnetcore/security/gdpr/sample/RP3.0/Startup.cs.md)

* Add the cookie consent partial to the `_Layout.cshtml` file:

  [Main (complete source file; reference: \~/security/gdpr/sample/RP3.0/Pages/Shared/\_Layout.cshtml?name=snippet\&highlight=4)](../../../../_code/aspnetcore/security/gdpr/sample/RP3.0/Pages/Shared/_Layout.cshtml.md)

* Add the *\_CookieConsentPartial.cshtml* file to the project:

  [Main (complete source file; reference: \~/security/gdpr/sample/RP3.0/Pages/Shared/\_CookieConsentPartial.cshtml)](../../../../_code/aspnetcore/security/gdpr/sample/RP3.0/Pages/Shared/_CookieConsentPartial.cshtml.md)

* Select the ASP.NET Core 2.2 version of this article to read about the cookie consent feature.
