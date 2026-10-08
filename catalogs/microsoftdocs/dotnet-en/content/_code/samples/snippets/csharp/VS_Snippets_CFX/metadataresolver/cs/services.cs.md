# Source code: samples/snippets/csharp/VS_Snippets_CFX/metadataresolver/cs/services.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Collections.Generic;
using System.ServiceModel;
using System.Text;

namespace Microsoft.WCF.Documentation
{
  [ServiceContract(Namespace="http://Microsoft.WCF.Documentation")]
  public interface ISampleService{
    [OperationContract(ProtectionLevel=System.Net.Security.ProtectionLevel.None)]
    string SampleMethod(string msg);
  }

  class SampleService : ISampleService
  {
  #region ISampleService Members

  public string  SampleMethod(string msg)
  {
 	  return "The service greets you: " + msg;
  }

  #endregion
  }
}

```
