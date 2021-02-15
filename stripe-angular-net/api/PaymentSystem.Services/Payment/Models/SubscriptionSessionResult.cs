namespace PaymentSystem.Services.Payment.Models
{
    public class SubscriptionSessionResult
    {
        public bool Success { get; set; }
        public string SessionId { get; set; }
        public string CustomerId { get; set; }
        public string ErrorMessage { get; set; }
    }
}
