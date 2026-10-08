# Source code: samples/core/Miscellaneous/NewInEFCore9.Cosmos/Program.cs

Complete source file; linked examples may select a region or line range.

```
using System.Threading.Tasks;

public class Program
{
    public static async Task Main()
    {
        // Note: These samples requires the Cosmos DB emulator to be installed and running
        CosmosSyncApisSample.Cosmos_provider_blocks_sync_APIs();
        await CosmosPrimitiveTypesSample.Collections_and_dictionaries_of_primitive_types();
        await HierarchicalPartitionKeysSample.UseHierarchicalPartitionKeys();
    }
}

```
