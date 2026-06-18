namespace DeliveryApp.Server.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string? OrderNumber { get; set; }
        public required string SenderCity { get; set; }
        public required string SenderAddress { get; set; }
        public required string RecipientCity { get; set; }
        public required string RecipientAddress { get; set; }
        public decimal Weight { get; set; }
        public DateTime PickupDate { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
