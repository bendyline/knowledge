# Source code: aspnetcore/test/integration-tests/samples/3.x/IntegrationTestsSample/src/RazorPagesProject/Services/IQuoteService.cs

Complete source file; linked examples may select a region or line range.

```
using System.Threading.Tasks;

namespace RazorPagesProject.Services
{
    #region snippet1
    public interface IQuoteService
    {
        Task<string> GenerateQuote();
    }
    #endregion
}

```
