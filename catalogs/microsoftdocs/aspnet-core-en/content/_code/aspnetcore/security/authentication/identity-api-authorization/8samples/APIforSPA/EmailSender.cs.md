# Source code: aspnetcore/security/authentication/identity-api-authorization/8samples/APIforSPA/EmailSender.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;

namespace APIforSPA;

sealed class EmailSender : IEmailSender
{
    private readonly ILogger _logger;

    public EmailSender(ILogger<EmailSender> logger)
    {
        _logger = logger;
    }
    public List<Email> Emails { get; set; } = new();

    public Task SendEmailAsync(string email, string subject, string htmlMessage)
    {
        _logger.LogWarning($"{email} {subject} {htmlMessage}");
        Emails.Add(new(email, subject, htmlMessage));
        return Task.CompletedTask;
    }
}
sealed record Email(string Address, string Subject, string HtmlMessage);

```
