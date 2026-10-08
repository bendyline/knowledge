# Source code: samples/end2end/PlanetaryDocs/PlanetaryDocs.Domain/IDocSummaries.cs

Complete source file; linked examples may select a region or line range.

```
using System.Collections.Generic;

namespace PlanetaryDocs.Domain
{
    /// <summary>
    /// Indicates classes with summaries.
    /// </summary>
    public interface IDocSummaries
    {
        /// <summary>
        /// Gets the list of summaries.
        /// </summary>
        List<DocumentSummary> Documents { get; }
    }
}

```
