# Source code: samples/core/Miscellaneous/NewInEFCore6.Cosmos/Program.cs

Complete source file; linked examples may select a region or line range.

```
using System.Threading.Tasks;

public class Program
{
    public static async Task Main()
    {
        // Note: These samples requires the Cosmos DB emulator to be installed and running
        await CosmosPrimitiveTypesSample.Collections_and_dictionaries_of_primitive_types();
        await CosmosQueriesSample.Cosmos_queries();
        await CosmosDiagnosticsSample.Cosmos_diagnostics();
        CosmosModelConfigurationSample.Cosmos_configure_time_to_live();
        await CosmosModelConfigurationSample.Cosmos_configure_time_to_live_per_instance();
        await CosmosImplicitOwnershipSample.Cosmos_models_use_implicit_ownership_by_default();
        CosmosMinimalApiSample.Add_a_DbContext_and_provider();
    }
}

```
