# Source code: samples/core/Querying/QueryFilters/Program.cs

Complete source file; linked examples may select a region or line range.

```
using System.Threading.Tasks;

namespace EFQuerying.QueryFilters;

internal class Program
{
    private static async Task Main(string[] args)
    {
        await SoftDeletion.Sample();
        await Multitenancy.Sample();
        await NamedFilters.Sample();
        await QueryFiltersAndRequiredNavigations.Sample();
    }
}

```
