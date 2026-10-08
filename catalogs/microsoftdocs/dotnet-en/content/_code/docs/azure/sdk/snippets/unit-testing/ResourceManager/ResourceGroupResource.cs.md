# Source code: docs/azure/sdk/snippets/unit-testing/ResourceManager/ResourceGroupResource.cs

Complete source file; linked examples may select a region or line range.

```
using Azure.Core;

#nullable disable

namespace UnitTestingSampleApp.ResourceManager;

public partial class ResourceGroupResource : ArmResource
{
    protected ResourceGroupResource()
    { }

    internal ResourceGroupResource(ArmClient client, ResourceIdentifier id) : base(client, id)
    { }
}

```
