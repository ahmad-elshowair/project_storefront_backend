import { Product, ProductStore } from '../../Models/Product';

describe('TEST PRODUCT MODEL', () => {
  /* ==============================  BEGIN ARE CRUD FUNCTIONS DECLARED?  ============================== */

  const modelProduct = new ProductStore();

  describe('are curd functions defined', () => {
    // define index method
    it('should defined index method', async () => {
      expect(modelProduct.index).toBeDefined();
    });

    // define show method
    it('should defined show method', async () => {
      expect(modelProduct.show).toBeDefined();
    });

    // define create method
    it('should defined create method', async () => {
      expect(modelProduct.create).toBeDefined();
    });

    // define edit method
    it('should defined edit method', async () => {
      expect(modelProduct.update).toBeDefined();
    });

    // define delete method
    it('should defined delete method', async () => {
      expect(modelProduct.delete).toBeDefined();
    });
  });
  /* ==============================  END ARE CRUD FUNCTIONS DECLARED?  ============================== */

  /* ==============================  BEGIN CURD FUNCTIONALITY  ============================== */
  describe('Test CURD functionality', () => {
    const productData: Product = {
      id: 1,
      name: 'Nokia 8.3',
      price: 1000,
    };
    let product: Product;
    // create a new product
    it('should create new product', async () => {
      product = await modelProduct.create(productData);
      expect({
        name: product.name,
        price: product.price,
      }).toEqual({
        name: productData.name,
        price: productData.price,
      });
    });

    /* test index method functionality */
    it('index method should return products', async () => {
      const products = await modelProduct.index();
      expect(products).toEqual([product]);
    });

    // test show product method functionality
    it('should return a product', async () => {
      const getAProduct = await modelProduct.show(product.id as number);
      expect(getAProduct).toEqual(product);
    });

    // test update product method functionality
    it('should update a product', async () => {
      const updateData: Product = {
        id: product.id,
        name: 'iphone 13',
        price: 1200,
      };
      const updatedProduct = await modelProduct.update(updateData);
      expect(updatedProduct.name).toEqual('iphone 13');
    });

    // test deleting product
    it('should delete the product', async () => {
      await modelProduct.delete(product.id as unknown as number);
      const products = await modelProduct.index();
      expect(products).toEqual([]);
    });
  });
  /* ==============================  END CURD FUNCTIONALITY  ============================== */
});
