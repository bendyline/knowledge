# Source code: aspnetcore/tutorials/dotnet-watch/sample/WebAppTests/CalculatorTests.cs

Complete source file; linked examples may select a region or line range.

```
using WebApp.Controllers;
using Xunit;

namespace WebAppTests
{
    public class CalculatorTests
    {
        [Fact]
        public void TestSum()
        {
            Assert.Equal(9, Calculator.Sum(4, 5));
        }

        [Fact]
        public void TestProduct()
        {
            Assert.Equal(20, Calculator.Product(4, 5));
        }
    }
}

```
