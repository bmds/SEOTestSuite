const Chromy = require('chromy');
const SEO = require('../index');

const testURL = 'https://www.codecomputerlove.com/dasdasd';

let chromyInstance;

beforeAll(async() => {
	chromyInstance = new Chromy();
	return chromyInstance.start();
});

afterAll(() => chromyInstance.close());

// 11. 404 page - Check header response

describe('10. 404 Page', () => {
	test('should return the correct header', async () => {
		let status;
		await chromyInstance.client.Network.responseReceived((payload) => {
			if (payload.response.url === testURL) {
				status = payload.response.status
			}
		})
		await chromyInstance.goto(testURL);
		expect(status).toBe(404);
	});
});

// 12. Sitemap - will need a new describe block & second chromy instance or a navigation event

// 13. Text based navigation - Very hard / impossible to test
