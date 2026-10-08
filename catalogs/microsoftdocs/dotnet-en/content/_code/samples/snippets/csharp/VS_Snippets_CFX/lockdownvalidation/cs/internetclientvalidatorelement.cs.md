# Source code: samples/snippets/csharp/VS_Snippets_CFX/lockdownvalidation/cs/internetclientvalidatorelement.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.ServiceModel.Configuration;

namespace Microsoft.ServiceModel.Samples
{
    //<snippet3>
    public class InternetClientValidatorElement : BehaviorExtensionElement
    {
        public override Type BehaviorType
        {
            get { return typeof(InternetClientValidatorBehavior); }
        }

        protected override object CreateBehavior()
        {
            return new InternetClientValidatorBehavior();
        }
    }
    //</snippet3>
  }

```
