# Source code: aspnetcore/security/cookie-sharing/samples/WebCookieShare-NetFx/App_Start/FilterConfig.cs

Complete source file; linked examples may select a region or line range.

```
using System.Web;
using System.Web.Mvc;

namespace WebCookieShare_NetFx
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}

```
