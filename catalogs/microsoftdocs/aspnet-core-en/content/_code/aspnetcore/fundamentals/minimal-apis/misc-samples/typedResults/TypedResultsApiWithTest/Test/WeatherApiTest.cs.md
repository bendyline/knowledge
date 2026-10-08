# Source code: aspnetcore/fundamentals/minimal-apis/misc-samples/typedResults/TypedResultsApiWithTest/Test/WeatherApiTest.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Tests
{
    // <snippet_1>
    [TestClass()]
    public class WeatherApiTests
    {
        [TestMethod()]
        public void MapWeatherApiTest()
        {
            var result = WeatherApi.GetAllWeathers();
            Assert.IsInstanceOfType(result, typeof(Ok<WeatherForecast[]>));
        }      
    }
    // </snippet_1>
}

```
