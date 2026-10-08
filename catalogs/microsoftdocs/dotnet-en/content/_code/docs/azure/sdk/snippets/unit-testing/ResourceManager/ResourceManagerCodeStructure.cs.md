# Source code: docs/azure/sdk/snippets/unit-testing/ResourceManager/ResourceManagerCodeStructure.cs

Complete source file; linked examples may select a region or line range.

```
#nullable disable

namespace UnitTestingSampleApp.ResourceManager;

public class ResourceManagerCodeStructure
{
    public void CallingExtensionMethodForHierarchy(ResourceGroupResource resourceGroup)
    {
        // <ParentOfVMIsRG>
        VirtualMachineCollection virtualMachineCollection = resourceGroup.GetVirtualMachines();
        // </ParentOfVMIsRG>
    }
}

```
