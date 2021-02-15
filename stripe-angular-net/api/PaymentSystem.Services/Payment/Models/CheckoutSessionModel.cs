namespace PaymentSystem.Services.Payment.Models
{
    public class CheckoutSessionModel
    {
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public string ProductImageUrl { get; set; }
        public int Quantity { get; set; }
        public long? Amount { get; set; }
    }
}
