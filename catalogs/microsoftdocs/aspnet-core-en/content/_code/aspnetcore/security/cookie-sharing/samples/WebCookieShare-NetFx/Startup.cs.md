# Source code: aspnetcore/security/cookie-sharing/samples/WebCookieShare-NetFx/Startup.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(WebCookieShare_NetFx.Startup))]
namespace WebCookieShare_NetFx
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

```
