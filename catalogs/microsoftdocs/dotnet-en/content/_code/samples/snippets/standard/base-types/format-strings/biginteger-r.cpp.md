# Source code: samples/snippets/standard/base-types/format-strings/biginteger-r.cpp

Complete source file; linked examples may select a region or line range.

```
#using <System.Numerics.dll>

using namespace System;
using namespace System::Numerics;

void main()
{ 
   BigInteger value = BigInteger::Pow(Int64::MaxValue, 2);
   Console::WriteLine(value.ToString("R"));
}
// The example displays the following output:
//      85070591730234615847396907784232501249  



```
