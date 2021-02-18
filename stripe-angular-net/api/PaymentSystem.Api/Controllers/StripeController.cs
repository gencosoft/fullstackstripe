using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PaymentSystem.Services.Payment;
using PaymentSystem.Services.Payment.Models;

namespace PaymentSystem.Api.Controllers
{
    [ApiController]
    [Route("api/stripe")]
    public class StripeController : Controller
    {
        private readonly StripeService _stripeService;

        public StripeController(StripeService stripeService)
        {
            _stripeService = stripeService;
        }

        [HttpPost("token")]
        public IActionResult ChargePayment(ChargePaymentModel data)
        {
            var success = _stripeService.ChargePayment(data);

            if (!success) return BadRequest();

            return Ok();
        }

        [HttpPost("payment-session")]
        public IActionResult CreateCheckoutSession(CheckoutSessionModel data)
        {
            var result = _stripeService.CreateCheckoutSession(data);

            return Ok(result);
        }

        [Authorize]
        [HttpGet("my-subscriptions")]
        public async Task<IActionResult> GetSubscriptions()
        {
            var customerId = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.UserData)?.Value;

            var result = await _stripeService.GetSubscriptions(customerId);

            if (!result.Success) return BadRequest(result.ErrorMessage);

            return Ok(result.CustomerSubscriptions);
        }

        [Authorize]
        [HttpPost("subscription-session")]
        public async Task<IActionResult> CreateSubscriptionSession([FromBody] SubscriptionSessionModel data)
        {
            var result = await _stripeService.CreateSubscriptionSession(data);

            if(!result.Success) return BadRequest(result.ErrorMessage);

            return Ok(result);
        }

        [Authorize]
        [HttpGet("subscription-session")]
        public async Task<IActionResult> GetSessionInfo(string sessionId)
        {
            var result = await _stripeService.GetSessionInfo(sessionId);

            if (!result.Success) return BadRequest(result.ErrorMessage);

            return Ok(result);
        }

        [Authorize]
        [HttpPost("customer-portal")]
        public async Task<IActionResult> CustomerPortal([FromBody] CustomerPortalModel data)
        {
            var result = await _stripeService.CustomerPortal(data);

            if (!result.Success) BadRequest(result.ErrorMessage);

            return Ok(result);
        }
    }
}
