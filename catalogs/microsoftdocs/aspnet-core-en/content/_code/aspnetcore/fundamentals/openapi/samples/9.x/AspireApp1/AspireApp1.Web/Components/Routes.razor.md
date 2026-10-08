# Source code: aspnetcore/fundamentals/openapi/samples/9.x/AspireApp1/AspireApp1.Web/Components/Routes.razor

Complete source file; linked examples may select a region or line range.

```
<Router AppAssembly="typeof(Program).Assembly">
    <Found Context="routeData">
        <RouteView RouteData="routeData" DefaultLayout="typeof(Layout.MainLayout)" />
        <FocusOnNavigate RouteData="routeData" Selector="h1" />
    </Found>
</Router>

```
