# Source code: samples/snippets/core/testing/unit-testing-using-dotnet-test/csharp/PrimeService/PrimeService.cs

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

            for (var divisor = 2; divisor <= Math.Sqrt(candidate); divisor++)
            {
                if (candidate % divisor == 0)
                {
                    return false;
                }
            }
            return true;
        }
    }
}

```
