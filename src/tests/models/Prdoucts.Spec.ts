// import { Product, ProductStore } from "../../Models/Product";


// const modelProduct = new ProductStore();

// /* ============================== START UNIT TEST ============================== */
// describe('Test Product Model', () => {
// 	/* ==============================  BEGIN ARE CRUD FUNCTIONS DECLARED?  ============================== */
// 	describe('define curd functions', () => {
// 		// define index method
// 		it('should defined index method', async () => {
// 			expect(modelProduct.index).toBeDefined();
// 		});

// 		// define show method
// 		it('should defined show method', async () => {
// 			expect(modelProduct.show).toBeDefined();
// 		});

// 		// define create method
// 		it('should defined create method', async () => {
// 			expect(modelProduct.create).toBeDefined();
// 		});

// 		// define edit method
// 		it('should defined edit method', async () => {
// 			expect(modelProduct.update).toBeDefined();
// 		});

// 		// define delete method
// 		it('should defined delete method', async () => {
// 			expect(modelProduct.delete).toBeDefined();
// 		});
// 	});
// 	/* ==============================  END ARE CRUD FUNCTIONS DECLARED?  ============================== */

//   /* ==============================  BEGIN CURD FUNCTIONALITY  ============================== */
//   describe("Test CURD functionality", () => {

//     const productData: Product = {
//       name: 'Nokia 8.3',
//       price: 1000,
// 	  };
//     let product: Product;
    
//     // create a new product
//     it('should create new product', async () => {
//       product = await modelProduct.create(productData);
//       expect({
//         name: product.name,
//         price: product.price
//       }).toEqual({
//         name: productData.name,
//         price: productData.price
//       });
//     });

//     /* test index method functionality */
//     it('index method should return products', async () => {
//       const products = await modelProduct.index();
//       expect(products).toEqual([product]);
//     });

//   });
// 	/* ==============================  END CURD FUNCTIONALITY  ============================== */
// });


// /* ============================== END UNIT TEST ============================== */
