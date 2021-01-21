using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace PaymentSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : Controller
    {
        [HttpGet]
        public ActionResult Get()
        {
            return Ok("get works!");
        }

        [HttpPost]
        public ActionResult Create(string stripeToken)
        {
            StripeConfiguration.ApiKey = "sk_test_51I3vwwCAVxkeCX4Q1oj0bkDbuTi8WBxxYn3GFhIgBLkV4hQN7HJsUCXb4HSIlBeGJdBuTi9PZ7bU2SAqcckIDBrL00Ccdn3QU4";
            stripeToken = "tok_1IAIlYCAVxkeCX4QZ8uoD2HT";
            // `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token
            var options = new ChargeCreateOptions
            {
                Amount = 2000,
                Currency = "usd",
                Source = stripeToken,
                Description = "Token created from 4 diffrent fields",
            };
            var service = new ChargeService();
            service.Create(options);

            return Ok();
        }
    }
}