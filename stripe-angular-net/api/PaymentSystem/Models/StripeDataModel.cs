namespace PaymentSystem.Models
{
    public class StripeDataModel
    {
        public string Token { get; set; }
        public string Description { get; set; }
        public long? Amount { get; set; }
        public string Currency { get; set; }
        public string Email { get; set; }
    }
}
