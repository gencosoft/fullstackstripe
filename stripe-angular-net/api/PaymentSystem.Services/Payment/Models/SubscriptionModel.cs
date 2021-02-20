namespace PaymentSystem.Services.Payment.Models
{
    public class SubscriptionModel
    {
        public string SubscriptionId { get; set; }
        public bool Canceled { get; set; }
        public string PriceId { get; set; }
        public decimal Price { get; set; }
        public long Quantity { get; set; }
    }
}
