# Source code: aspnetcore/fundamentals/routing/samples/6.x/RoutingSample/Routing/NoZeroesRouteConstraint.cs

Complete source file; linked examples may select a region or line range.

```
using System.Globalization;
using System.Text.RegularExpressions;

namespace RoutingSample.Routing;

// <snippet_Class>
public class NoZeroesRouteConstraint : IRouteConstraint
{
    private static readonly Regex _regex = new(
        @"^[1-9]*$",
        RegexOptions.CultureInvariant | RegexOptions.IgnoreCase,
        TimeSpan.FromMilliseconds(100));

    public bool Match(
        HttpContext? httpContext, IRouter? route, string routeKey,
        RouteValueDictionary values, RouteDirection routeDirection)
    {
        if (!values.TryGetValue(routeKey, out var routeValue))
        {
            return false;
        }

        var routeValueString = Convert.ToString(routeValue, CultureInfo.InvariantCulture);

        if (routeValueString is null)
        {
            return false;
        }

        return _regex.IsMatch(routeValueString);
    }
}
// </snippet_Class>

```
