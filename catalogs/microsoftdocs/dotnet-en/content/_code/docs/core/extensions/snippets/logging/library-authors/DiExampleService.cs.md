# Source code: docs/core/extensions/snippets/logging/library-authors/DiExampleService.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.Extensions.Logging;

namespace Logging.LibraryAuthors;

public class DiExampleService(ILogger<DiExampleService> logger)
{
    public void ProcessProductSale(Product product, int sold)
    {
        // Product sale processing logic.
        // Log results...

        logger.LogProductSaleDetails(
            quantity: sold,
            description: product.GetFriendlyProductDescription());
    }
}

```
