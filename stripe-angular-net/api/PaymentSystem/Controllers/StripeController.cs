using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PaymentSystem.Models;
using Stripe;
using Stripe.Checkout;

namespace PaymentSystem.Controllers
{
    [Route("api/stripe")]
    [ApiController]
    public class StripeController : Controller
    {
        [HttpPost("token")]
        public IActionResult ChargePayment(StripeDataModel data)
        {
            var service = new ChargeService();
            service.Create(new ChargeCreateOptions
            {
                Amount = data.Amount,
                Currency = data.Currency,
                Source = data.Token,
                Description = data.Description,
                Metadata = new Dictionary<string, string>{{"email",data.Email}}
            });

            return Ok();
        }

        [HttpPost("payment-session")]
        public IActionResult CreateCheckoutSession(ProductModel data)
        {
            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string> { "card" },
                LineItems = new List<SessionLineItemOptions>
                {
                    new SessionLineItemOptions
                    {
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            UnitAmount = data.Amount * 100,
                            Currency = "usd",
                            ProductData = new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = data.ProductName,
                                Description = data.ProductDescription,
                                Images = new List<string>{ data.ProductImageUrl }
                            }
                        },
                        Quantity = data.Quantity
                    }
                },
                Mode = "payment",
                SuccessUrl = "http://fullstackstripe-angular-net.s3-website-us-east-1.amazonaws.com/prebuild-checkout/success",
                CancelUrl = "http://fullstackstripe-angular-net.s3-website-us-east-1.amazonaws.com/prebuild-checkout/cancel"
            };

            var service = new SessionService();
            var session = service.Create(options);

            return Json(new { id = session.Id });
        }

        [HttpPost("subscription-session")]
        public async Task<IActionResult> CreateCheckoutSession([FromBody] SubscriptionSessionModel data)
        {
            var options = new SessionCreateOptions
            {
                // See https://stripe.com/docs/api/checkout/sessions/create
                // for additional parameters to pass.
                // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
                // the actual Session ID is returned in the query parameter when your customer
                // is redirected to the success page.
                SuccessUrl = "http://fullstackstripe-angular-net.s3-website-us-east-1.amazonaws.com/subscription/success?sessionId={CHECKOUT_SESSION_ID}",
                CancelUrl = "http://fullstackstripe-angular-net.s3-website-us-east-1.amazonaws.com/subscription/cancel",
                PaymentMethodTypes = new List<string> { "card" },
                Mode = "subscription",
                LineItems = new List<SessionLineItemOptions>
                {
                    new SessionLineItemOptions
                    {
                        Price = data.PriceId,
                        // For metered billing, do not pass quantity
                        Quantity = 1
                    }
                }
            };
            var service = new SessionService();
            try
            {
                var session = await service.CreateAsync(options);

                data.SessionId = session.Id;
                return Ok(data);
            }
            catch (StripeException e)
            {
                Console.WriteLine(e.StripeError.Message);
                return BadRequest(e.StripeError.Message);
            }
        }

        [HttpGet("subscription-session")]
        public async Task<IActionResult> CheckoutSession(string sessionId)
        {
            var service = new SessionService();
            var session = await service.GetAsync(sessionId);

            return Ok(new SubscriptionSessionModel
            {
                SessionId = sessionId,
                CustomerId = session.CustomerId
            });
        }

        [HttpPost("customer-portal")]
        public async Task<IActionResult> CustomerPortal([FromBody] CustomerPortalModel data)
        {
            // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
            // Typically this is stored alongside the authenticated user in your database.
            var checkoutSessionId = data.SessionId;
            var checkoutService = new SessionService();
            var checkoutSession = await checkoutService.GetAsync(checkoutSessionId);

            // This is the URL to which your customer will return after
            // they are done managing billing in the Customer Portal.
            var returnUrl = "http://fullstackstripe-angular-net.s3-website-us-east-1.amazonaws.com/subscription";

            var options = new Stripe.BillingPortal.SessionCreateOptions
            {
                Customer = checkoutSession.CustomerId,
                ReturnUrl = returnUrl
            };
            var service = new Stripe.BillingPortal.SessionService();
            var session = await service.CreateAsync(options);

            data.Url = session.Url;

            return Ok(data);
        }
    }
}
