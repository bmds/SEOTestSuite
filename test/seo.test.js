const Chromy = require('chromy');
const SEO = require('../index');

let chromyInstance;

beforeAll(() => {
	chromyInstance = new Chromy();
	return chromyInstance.goto('https://www.codecomputerlove.com');
});

afterAll(() => chromyInstance.close());

describe('1. Page title', () => {
	let pageTitle;

	beforeAll(async (done) => {
		pageTitle = await chromyInstance.evaluate(SEO.pageTitle);
		done();
	});

	test('To have a value', () => {
		expect(pageTitle.length).toBeGreaterThan(0);
	});

	test('To not be too long', () => {
		expect(pageTitle.length).toBeLessThan(71);
	});
});

// 2. Meta description exists

describe('3. Google analytics', () => {
	test('is present on the page', async () => {
		let gaGlobalExists = await chromyInstance.evaluate(SEO.analytics);
		expect(gaGlobalExists).toBeTruthy();
	});
});

describe('4. H1', () => {
	test('That there is 1 H1 tag in the page', async () => {
		let tagCount = await chromyInstance.evaluate(SEO.h1Tags);
		expect(tagCount).toEqual(1);
	});
});

describe('5. Images', () => {
	test('all have an alt attribute', async () => {
		let allImagesHaveAlt = await chromyInstance.evaluate(SEO.altText);
		expect(allImagesHaveAlt).toBeTruthy();
	});
});

// 6. WYSIWYG block - Not possible

// 7. URL structure (regex pattern matching?)

// 8. social links - Undesireable / not possible to test

// 9. Opengraph tags

// 10. Robots.txt - will need a new describe block & second chromy instance or a navigation event

// 11. 404 page - Check header response

// 12. Sitemap - will need a new describe block & second chromy instance or a navigation event

// 13. Text based navigation - Very hard / impossible to test
