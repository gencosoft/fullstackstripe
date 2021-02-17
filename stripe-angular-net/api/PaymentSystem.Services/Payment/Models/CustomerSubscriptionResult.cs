namespace PaymentSystem.Services.Payment.Models
{
    public class CustomerSubscriptionResult
    {
        public bool Success { get; set; }
        public string ErrorMessage { get; set; }
        public CustomerSubscriptionModel CustomerSubscriptions { get; set; }
    }
}
