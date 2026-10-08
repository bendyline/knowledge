# Source code: aspnetcore/mvc/controllers/testing/samples/3.x/TestingControllersSample/src/TestingControllersSample/Core/Interfaces/IBrainStormSessionRepository.cs

Complete source file; linked examples may select a region or line range.

```
using System.Collections.Generic;
using System.Threading.Tasks;
using TestingControllersSample.Core.Model;

namespace TestingControllersSample.Core.Interfaces
{
    public interface IBrainstormSessionRepository
    {
        Task<BrainstormSession> GetByIdAsync(int id);
        Task<List<BrainstormSession>> ListAsync();
        Task AddAsync(BrainstormSession session);
        Task UpdateAsync(BrainstormSession session);
    }
}

```
