const Chromy = require('chromy');
const SEO = require('../index');

let chromyInstance;

function isUrl(theUrl) {
	let passed = true;
	try {
		new URL(theUrl);
	} catch(e) {
		passed = false;
	}

	return passed;
}

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

describe('2. Meta Description', () => {
	let metaTags;

	beforeAll(async (done) => {
		metaTags = await chromyInstance.evaluate(SEO.meta);
		done();
	});

	test('is present on the page', () => {
		expect(metaTags).toHaveProperty('description');
	});

	test('should have a value', () => {
		expect(metaTags.description.length).toBeGreaterThan(0);
	});

	test('should be no more than 160 characters', () => {
		expect(metaTags.description.length).toBeLessThan(161);
	});
});

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
describe('9. Social meta tags', () => {
	let socialMetaTags;

	beforeAll(async (done) => {
		socialMetaTags = await chromyInstance.evaluate(SEO.socialMeta);
		done();
	});

	test('should have a twitter card tag', () => {
		expect(socialMetaTags).toHaveProperty('twitter:card');
	});

	test('should have a sensible value in the twitter card tag', () => {
		expect(socialMetaTags['twitter:card']).toMatch(/^(summary|summary_large_image|app)$/);
	});

	test('should have a twitter site tag', () => {
		expect(socialMetaTags).toHaveProperty('twitter:site');
	});

	test('should have a user name in the twitter site tag', () => {
		expect(socialMetaTags['twitter:site']).toMatch(/^@.*$/);
	});

	test('should have a twitter title tag', () => {
		expect(socialMetaTags).toHaveProperty('twitter:title');
	});

	test('should have a twitter description tag', () => {
		expect(socialMetaTags).toHaveProperty('twitter:description');
	});

	test('should have a twitter image tag', () => {
		expect(socialMetaTags).toHaveProperty('twitter:image');
	});

	test('should have valid url in the twitter image tag', () => {
		expect(isUrl(socialMetaTags['twitter:image'])).toBeTruthy();
	});

	test('should have an og title tag', () => {
		expect(socialMetaTags).toHaveProperty('og:title');
	});

	test('should have an og description tag', () => {
		expect(socialMetaTags).toHaveProperty('og:description');
	});

	test('should have an og url tag', () => {
		expect(socialMetaTags).toHaveProperty('og:url');
	});

	test('should have valid url in the og url tag', () => {
		expect(isUrl(socialMetaTags['og:url'])).toBeTruthy();
	});

	test('should have an og image tag', () => {
		expect(socialMetaTags).toHaveProperty('og:image');
	});

	test('should have valid url in the og image tag', () => {
		expect(isUrl(socialMetaTags['og:image'])).toBeTruthy();
	});
});

// 10. Robots.txt - will need a new describe block & second chromy instance or a navigation event

// 11. 404 page - Check header response

// 12. Sitemap - will need a new describe block & second chromy instance or a navigation event

// 13. Text based navigation - Very hard / impossible to test
