using System.Collections.Generic;
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
        public StripeController()
        {
            StripeConfiguration.ApiKey = "sk_test_51I3vwwCAVxkeCX4Q1oj0bkDbuTi8WBxxYn3GFhIgBLkV4hQN7HJsUCXb4HSIlBeGJdBuTi9PZ7bU2SAqcckIDBrL00Ccdn3QU4";
        }

        [HttpPost("token")]
        public ActionResult ChargePayment(StripeDataModel data)
        {
            StripeConfiguration.ApiKey = "sk_test_51I3vwwCAVxkeCX4Q1oj0bkDbuTi8WBxxYn3GFhIgBLkV4hQN7HJsUCXb4HSIlBeGJdBuTi9PZ7bU2SAqcckIDBrL00Ccdn3QU4";
            
            var service = new ChargeService();
            var charge = service.Create(new ChargeCreateOptions
            {
                Amount = data.Amount,
                Currency = data.Currency,
                Source = data.Token,
                Description = data.Description,
                Metadata = new Dictionary<string, string>{{"email",data.Email}}
            });

            return Ok(charge.Status);
        }

        [HttpPost("session")]
        public ActionResult CreateCheckoutSession(ProductModel data)
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
                                Images = new List<string>{ "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" }
                            }
                        },
                        Quantity = data.Quantity
                    }
                },
                Mode = "payment",
                SuccessUrl = "http://localhost:4200/prebuild-checkout/success",
                CancelUrl = "http://localhost:4200/prebuild-checkout/cancel"
            };

            var service = new SessionService();
            var session = service.Create(options);

            return Json(new { id = session.Id });
        }
    }
}
