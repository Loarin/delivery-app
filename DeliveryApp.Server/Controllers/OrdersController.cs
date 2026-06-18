using DeliveryApp.Server.Data;
using DeliveryApp.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DeliveryApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController: ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Получить все заказы
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            var orders = await _context.Orders
                .OrderByDescending(i => i.CreatedAt)
                .ToListAsync();

            return Ok(orders);
        }

        /// <summary>
        /// Получить заказ по id
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
                return NotFound();

            return Ok(order);
        }

        /// <summary>
        /// Создать новый заказ
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody]Order order)
        {
            order.OrderNumber = GenerateOrderNumber();
            order.CreatedAt = DateTime.Now;

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateOrder), new { id = order.Id }, order);
        }

        /// <summary>
        /// Генерация номера для нового заказа
        /// </summary>
        private string GenerateOrderNumber()
        {
            var date = DateTime.Now.ToString("ddMMyyyy");
            var count =+ _context.Orders.Count();
            return $"{date}-{count:D4}";
        }
    }
}
