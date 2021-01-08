
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController: ControllerBase
    {
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IGenericRepository<ProductBrand> _brandRepo;
        private readonly IGenericRepository<ProductType> _productTpe;



        public ProductsController(IGenericRepository<Product> productRepo,
         IGenericRepository<ProductBrand> brandRepo,
          IGenericRepository<ProductType> productType)
        {
            _productRepo = productRepo;
            _brandRepo = brandRepo;
            _productTpe = productType;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await _productRepo.ListAllAsync();
            
            return Ok(products);
        }  
        


        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProdutc(int id)
        {

            return await _productRepo.GetByIdAsync(id);  
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            return Ok(await _brandRepo.ListAllAsync());
        }


         [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {

            return Ok(await _productTpe.ListAllAsync());
        }

    }
}