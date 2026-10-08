# Source code: docs/azure/sdk/snippets/unit-testing/ResourceManager/VirtualMachineCollection.cs

Complete source file; linked examples may select a region or line range.

```
using Azure.Core;

#nullable disable

namespace UnitTestingSampleApp.ResourceManager;

public class VirtualMachineCollection : ArmCollection
{
    protected VirtualMachineCollection()
    { }

    internal VirtualMachineCollection(ArmClient client, ResourceIdentifier id) : base(client, id)
    { }
}

```
