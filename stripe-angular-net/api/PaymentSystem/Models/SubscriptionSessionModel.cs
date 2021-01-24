using System.Security.AccessControl;

namespace PaymentSystem.Models
{
    public class SubscriptionSessionModel
    {
        public string PriceId { get; set; }
        public string SessionId { get; set; }
        public string CustomerId { get; set; }
    }
}
