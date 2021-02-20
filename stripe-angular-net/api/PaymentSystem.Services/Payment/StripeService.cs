using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using PaymentSystem.Services.Payment.Models;
using Stripe;
using Stripe.Checkout;

namespace PaymentSystem.Services.Payment
{
    public class StripeService
    {
        private readonly IConfigurationRoot _configuration;
        public StripeService()
        {
            var envName = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            _configuration = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("appsettings.json", optional: false)
                .AddJsonFile($"appsettings.{envName}.json", optional: false)
                .Build();

            StripeConfiguration.ApiKey = _configuration.GetSection("StripeSettings").GetSection("apiKey").Value;
        }

        public bool ChargePayment(ChargePaymentModel data)
        {
            var service = new ChargeService();
            var result = service.Create(new ChargeCreateOptions
            {
                Amount = data.Amount,
                Currency = data.Currency,
                Source = data.Token,
                Description = data.Description,
                Metadata = new Dictionary<string, string> {{ "email", data.Email }}
            });

            return result.Status != "failed";
        }

        public CheckOutSessionResult CreateCheckoutSession(CheckoutSessionModel data)
        {
            var baseUrl = _configuration.GetSection("BaseUrl").Value;
            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string> {"card"},
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
                SuccessUrl = $"{baseUrl}/prebuild-checkout/success",
                CancelUrl = $"{baseUrl}/prebuild-checkout/cancel"
            };

            var service = new SessionService();
            var session = service.Create(options);

            return new CheckOutSessionResult
            {
                Success = true,
                Id = session.Id
            };
        }

        public async Task<SubscriptionSessionResult> CreateSubscriptionSession([FromBody] SubscriptionSessionModel data)
        {
            var baseUrl = _configuration.GetSection("BaseUrl").Value;
            var options = new SessionCreateOptions
            {
                SuccessUrl = $"{baseUrl}/subscription/success?sessionId={{CHECKOUT_SESSION_ID}}",
                CancelUrl = $"{baseUrl}/subscription/cancel",
                PaymentMethodTypes = new List<string> { "card" },
                Mode = "subscription",
                Customer = data.CustomerId,
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
                
                return new SubscriptionSessionResult
                {
                    Success = true,
                    SessionId = session.Id
                };
            }
            catch (StripeException e)
            {
                return new SubscriptionSessionResult
                {
                    Success = false,
                    ErrorMessage = e.StripeError.Message
                };
            }
        }

        public async Task<SubscriptionSessionResult> GetSessionInfo(string sessionId)
        {
            var service = new SessionService();
            var session = await service.GetAsync(sessionId);

            return new SubscriptionSessionResult
            {
                Success = true,
                SessionId = sessionId,
                CustomerId = session.CustomerId
            };
        }

        public async Task<CustomerPortalResult> CustomerPortal([FromBody] CustomerPortalModel data)
        {
            var returnUrl = $"{_configuration.GetSection("BaseUrl").Value}/subscription";

            var options = new Stripe.BillingPortal.SessionCreateOptions
            {
                Customer = data.CustomerId,
                ReturnUrl = returnUrl
            };
            var service = new Stripe.BillingPortal.SessionService();
            var session = await service.CreateAsync(options);

            return new CustomerPortalResult
            {
                Success = true,
                Url = session.Url
            };
        }

        public string CreateNewCustomer(string email)
        {
            var options = new CustomerCreateOptions { Email = email };
            var service = new CustomerService();
            var customer = service.Create(options);

            return customer.Id;
        }

        public async Task<CustomerSubscriptionResult> GetSubscriptions(string customerId)
        {
            var result = new CustomerSubscriptionModel { CustomerId = customerId, Subscriptions = new List<SubscriptionModel>() };

            var options = new SubscriptionListOptions { Customer = customerId };
            var service = new SubscriptionService();
            var subscriptions = await service.ListAsync(options);

            foreach (var subscription in subscriptions)
            {
                var item = subscription.Items.First();

                result.Subscriptions.Add(new SubscriptionModel
                {
                    SubscriptionId = subscription.Id,
                    Canceled = subscription.CancelAt.HasValue,
                    Quantity = item.Quantity,
                    PriceId = item.Price.Id,
                    Price = (decimal)(item.Price.UnitAmount ?? 0) / 100
                });
            }

            return new CustomerSubscriptionResult
            {
                Success = true,
                CustomerSubscriptions = result
            };
        }
    }
}
