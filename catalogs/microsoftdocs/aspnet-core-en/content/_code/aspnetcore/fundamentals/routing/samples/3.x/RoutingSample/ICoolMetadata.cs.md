# Source code: aspnetcore/fundamentals/routing/samples/3.x/RoutingSample/ICoolMetadata.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using System;

namespace RoutingSample
{
    // <snippet>
    // <snippet2>
    public interface ICoolMetadata
    {
        bool IsCool { get; }
    }

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class CoolMetadataAttribute : Attribute, ICoolMetadata
    {
        public bool IsCool => true;
    }
    // </snippet2>

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class SuppressCoolMetadataAttribute : Attribute, ICoolMetadata
    {
        public bool IsCool => false;
    }

    [CoolMetadata]
    public class MyController : Controller
    {
        public void MyCool() { }

        [SuppressCoolMetadata]
        public void Uncool() { }
    }
    // </snippet>
}

```
