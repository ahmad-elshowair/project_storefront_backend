import { Order, OrderModel } from '../../Models/Order';
import { User, UserModel } from '../../Models/User';


const modelOrder = new OrderModel();
const modelUser = new UserModel();
const userData: User = {
	id: 1,
	first_name: 'Thuy',
	last_name: 'Pham',
	email: 'thuy@email.com',
	password_digest: 'password',
};
const orderData: Order = {
	status: 'active',
	user_id: userData.id as number,
};
let order: Order;
/* ============================== START UNIT TEST ============================== */
describe('Test Order Model', () => {
	
	/* ==============================  BEGIN ARE CRUD FUNCTIONS DECLARED?  ============================== */
	describe('check crud functions', () => {
	
		it('index method should be declared', () => {
			expect(modelOrder.index).toBeDefined();
		});

		it('show method should be declared', () => {
			expect(modelOrder.show).toBeDefined();
		});

		it('create method should be declared', () => {
			expect(modelOrder.create).toBeDefined();
		});

		it('update method should be declared', () => {
			expect(modelOrder.update).toBeDefined();
		});

		it('delete method should be declared', () => {
			expect(modelOrder.delete).toBeDefined();
		});
	});
	/* ==============================  END ARE CRUD FUNCTIONS DECLARED?  ============================== */

	/* ==============================  BEGIN CRUD FUNCTIONALITY ============================== */
	/* create a user before all  */
	
	
	describe('Test CRUD functionality', () => {
		beforeAll(async () => {
			await modelUser.create(userData);
		});

		/* test create order method functionality*/
		it('should create a new order', async () => {
			order = await modelOrder.create(orderData);
			expect({
				status: order.status,
				user_id: order.user_id,
			}).toEqual({
				status: orderData.status,
				user_id: orderData.user_id,
			});
		});

		/* test order index method functionality */
		it('index method should return orders', async () => {
			const orders = await modelOrder.index();
			expect(orders).toEqual([order]);
		});

		/* delete the order */
		afterEach(async () => {
			await modelOrder.delete(orderData.id as unknown as number);
		});
	});
	/* ==============================  END CRUD FUNCTIONALITY  ============================== */
});
/* ============================== END SUITE TEST ============================== */

