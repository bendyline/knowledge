# Source code: aspnetcore/fundamentals/routing/samples/6.x/RoutingSample/Routing/SlugifyParameterTransformer.cs

Complete source file; linked examples may select a region or line range.

```
using System.Text.RegularExpressions;

namespace RoutingSample.Routing;
    
// <snippet_Class>
public class SlugifyParameterTransformer : IOutboundParameterTransformer
{
    public string? TransformOutbound(object? value)
    {
        if (value is null)
        {
            return null;
        }

        return Regex.Replace(
            value.ToString()!,
                "([a-z])([A-Z])",
            "$1-$2",
            RegexOptions.CultureInvariant,
            TimeSpan.FromMilliseconds(100))
            .ToLowerInvariant();
    }
}
// </snippet_Class>

```
