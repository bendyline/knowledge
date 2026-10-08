# Source code: aspnetcore/fundamentals/middleware/extensibility-third-party-container/samples/2.x/SampleApp/Middleware/SimpleInjectorMiddlewareFactory.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using Microsoft.AspNetCore.Http;
using SimpleInjector;

namespace MiddlewareExtensibilitySample.Middleware
{
    #region snippet1
    public class SimpleInjectorMiddlewareFactory : IMiddlewareFactory
    {
        private readonly Container _container;

        public SimpleInjectorMiddlewareFactory(Container container)
        {
            _container = container;
        }

        public IMiddleware Create(Type middlewareType)
        {
            return _container.GetInstance(middlewareType) as IMiddleware;
        }

        public void Release(IMiddleware middleware)
        {
            // The container is responsible for releasing resources.
        }
    }
    #endregion
}

```
