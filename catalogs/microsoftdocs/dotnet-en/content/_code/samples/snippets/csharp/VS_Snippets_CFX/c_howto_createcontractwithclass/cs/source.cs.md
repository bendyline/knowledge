# Source code: samples/snippets/csharp/VS_Snippets_CFX/c_howto_createcontractwithclass/cs/source.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.ServiceModel;

namespace Samples
{

   //<snippet1>
   [ServiceContract]
   public class CalculatorService
   {
     [OperationContract]
     public double Add(double n1, double n2)
     {
        return n1 + n2;
     }

     [OperationContract]
     public double Subtract(double n1, double n2)
     {
        return n1 - n2;
     }

     [OperationContract]
     public double Multiply(double n1, double n2)
     {
        return n1 * n2;
     }

     [OperationContract]
     public double Divide(double n1, double n2)
     {
        return n1 / n2;
     }
   }

    //</snippet1>

    public class Test
    {
        public static void Main()
        {
        }
    }
}

```
