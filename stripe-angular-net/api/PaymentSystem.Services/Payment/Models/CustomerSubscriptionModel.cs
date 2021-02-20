using System.Collections.Generic;

namespace PaymentSystem.Services.Payment.Models
{
    public class CustomerSubscriptionModel
    {
        public string CustomerId { get; set; }
        public List<SubscriptionModel> Subscriptions { get; set; }
    }
}
