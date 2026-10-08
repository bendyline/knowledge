# Source code: aspnetcore/test/razor-pages-tests/samples/3.x/tests/RazorPagesTestSample.Tests/UnitTests/PartialPageTests.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Routing;
using Moq;
using RazorPagesTestSample.Pages;
using Xunit;

namespace RazorPagesTestSample.Tests.UnitTests
{
    public class PartialPageTests
    {
        [Fact]
        public void OnGetPartial_ReturnsAPartialViewResult()
        {
            // Arrange
            var httpContext = new DefaultHttpContext();
            var modelState = new ModelStateDictionary();
            var actionContext = new ActionContext(httpContext, new RouteData(), new PageActionDescriptor(), modelState);
            var modelMetadataProvider = new EmptyModelMetadataProvider();
            var viewData = new ViewDataDictionary(modelMetadataProvider, modelState);
            var tempData = new TempDataDictionary(httpContext, Mock.Of<ITempDataProvider>());
            var pageContext = new PageContext(actionContext)
            {
                ViewData = viewData
            };
            var pageModel = new PartialsModel()
            {
                PageContext = pageContext,
                TempData = tempData,
                Url = new UrlHelper(actionContext),
                MetadataProvider = modelMetadataProvider
            };

            // Act
            var result = pageModel.OnGetPartial();

            // Assert
            Assert.IsType<PartialViewResult>(result);
        }
    }
}


```
