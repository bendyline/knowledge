# Source code: samples/snippets/core/testing/unit-testing-using-nunit/csharp/PrimeService/PrimeService.cs

Complete source file; linked examples may select a region or line range.

```
using System;

namespace Prime.Services
{
    public class PrimeService
    {
        public bool IsPrime(int candidate)
        {
            if (candidate < 2)
            {
                return false;
            }
            throw new NotImplementedException("Please create a test first");
        }
    }
}

```
