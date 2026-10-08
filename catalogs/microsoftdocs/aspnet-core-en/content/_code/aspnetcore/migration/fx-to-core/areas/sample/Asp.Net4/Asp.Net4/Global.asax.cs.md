# Source code: aspnetcore/migration/fx-to-core/areas/sample/Asp.Net4/Asp.Net4/Global.asax.cs

Complete source file; linked examples may select a region or line range.

```
using System.Web.Routing;

namespace Asp.Net4
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
}

```
