# Source code: samples/snippets/csharp/VS_Snippets_CFX/c_securitybestpractices/cs/source.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Collections.Generic;
using System.Text;
using System.Security.Principal;
using System.ServiceModel;
using System.Security.Permissions;

namespace Design2
{
    class Program
    {
        static void Main(string[] args)
        {
        }

        private void Run()
        {
            //<snippet1>
            WindowsIdentity identity = ServiceSecurityContext.Current.WindowsIdentity;
            using (identity.Impersonate())
            {
                // Run code under the caller's identity.
            }
            //</snippet1>
        }
    }
}

```
