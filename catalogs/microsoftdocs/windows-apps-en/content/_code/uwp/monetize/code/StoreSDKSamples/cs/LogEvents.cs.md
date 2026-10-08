# Source code: uwp/monetize/code/StoreSDKSamples/cs/LogEvents.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//<EngagementNamespace>
using Microsoft.Services.Store.Engagement;
//</EngagementNamespace>

namespace StoreSDKSamples
{
    class LogEvents
    {
        private void Example1()
        {
            //<Log>
            StoreServicesCustomEventLogger logger = StoreServicesCustomEventLogger.GetDefault();
            logger.Log("myCustomEvent");
            //</Log>
        }
    }
}

```
