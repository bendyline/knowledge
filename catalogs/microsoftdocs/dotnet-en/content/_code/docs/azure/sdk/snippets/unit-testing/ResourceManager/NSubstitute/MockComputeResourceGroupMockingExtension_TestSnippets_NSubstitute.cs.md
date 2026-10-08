# Source code: docs/azure/sdk/snippets/unit-testing/ResourceManager/NSubstitute/MockComputeResourceGroupMockingExtension_TestSnippets_NSubstitute.cs

Complete source file; linked examples may select a region or line range.

```
using NSubstitute;

namespace UnitTestingSampleApp.ResourceManager.NSubstitute;

public class MockComputeResourceGroupMockingExtension_TestSnippets_NSubstitute
{
    public void GetVirtualMachinesSnippets()
    {
        ResourceGroupResource rgMock = Substitute.For<ResourceGroupResource>();
        MockableComputeResourceGroupResource mockableRg =
            Substitute.For<MockableComputeResourceGroupResource>();
        // mock the actual method
        mockableRg.GetVirtualMachines()
            .Returns(Substitute.For<VirtualMachineCollection>());
        // mock the GetCachedClient method
        rgMock.GetCachedClient(Arg.Any<Func<ArmClient, MockableComputeResourceGroupResource>>())
            .Returns(mockableRg);

        ResourceGroupResource resourceGroup = rgMock;
    }
}

```
