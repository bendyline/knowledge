# Source code: samples/core/Cosmos/Program.cs

Complete source file; linked examples may select a region or line range.

```
using System.Threading.Tasks;
using Cosmos.ModelBuilding;

namespace Cosmos;

public class Program
{
    private static async Task Main()
    {
        await Sample.Run();
        await UnstructuredData.Sample.Run();
    }
}
```
