# Source code: docs/azure/sdk/snippets/unit-testing/ResourceManager/ComputeExtensions.cs

Complete source file; linked examples may select a region or line range.

```
using Azure.Core;

#nullable disable

namespace UnitTestingSampleApp.ResourceManager;

public static partial class ComputeExtensions
{
    private static MockableComputeResourceGroupResource GetMockableComputeResourceGroupResource(
        ArmResource resource)
    {
        return resource.GetCachedClient(client =>
            new MockableComputeResourceGroupResource(client, resource.Id));
    }

    public static VirtualMachineCollection GetVirtualMachines(
        this ResourceGroupResource resourceGroup)
    {
        return GetMockableComputeResourceGroupResource(resourceGroup)
            .GetVirtualMachines();
    }
}

public partial class MockableComputeResourceGroupResource : ArmResource
{
    protected MockableComputeResourceGroupResource()
    { }

    internal MockableComputeResourceGroupResource(
        ArmClient client, ResourceIdentifier id) : base(client, id)
    { }

    public virtual VirtualMachineCollection GetVirtualMachines()
    {
        return new VirtualMachineCollection(Client, Id);
    }
}

```
