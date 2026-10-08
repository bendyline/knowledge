# Source code: docs/azure/sdk/snippets/unit-testing/ResourceManager/VirtualMachineResource.cs

Complete source file; linked examples may select a region or line range.

```
using Azure.Core;

#nullable disable

namespace UnitTestingSampleApp.ResourceManager;

public partial class VirtualMachineResource : ArmResource
{
    internal VirtualMachineResource(ArmClient client, ResourceIdentifier id) : base(client, id)
    { }
}

```
