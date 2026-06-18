using DeliveryApp.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace DeliveryApp.Server.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Order> Orders { get; set; }
    }
}
