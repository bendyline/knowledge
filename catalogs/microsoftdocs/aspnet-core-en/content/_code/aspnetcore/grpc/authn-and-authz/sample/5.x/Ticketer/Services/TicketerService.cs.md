# Source code: aspnetcore/grpc/authn-and-authz/sample/5.x/Ticketer/Services/TicketerService.cs

Complete source file; linked examples may select a region or line range.

```
using System.Threading.Tasks;
using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using Microsoft.AspNetCore.Authorization;
using Ticket;

namespace Ticketer.Services
{
    public class TicketerService : Ticket.Ticketer.TicketerBase
    {
        private readonly TicketRepository _ticketRepository;

        public TicketerService(TicketRepository ticketRepository)
        {
            _ticketRepository = ticketRepository;
        }

        public override Task<AvailableTicketsResponse> GetAvailableTickets(Empty request, ServerCallContext context)
        {
            return Task.FromResult(new AvailableTicketsResponse
            {
                Count = _ticketRepository.GetAvailableTickets()
            });
        }

        [Authorize]
        public override Task<BuyTicketsResponse> BuyTickets(BuyTicketsRequest request, ServerCallContext context)
        {
            var user = context.GetHttpContext().User;

            return Task.FromResult(new BuyTicketsResponse
            {
                Success = _ticketRepository.BuyTickets(user.Identity.Name!, request.Count)
            });
        }
    }
}

```
