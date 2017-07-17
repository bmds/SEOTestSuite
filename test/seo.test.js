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
describe('9. Social meta tags', () => {
	let metaTags;

	beforeAll(async (done) => {
		metaTags = await chromyInstance.evaluate(SEO.socialMeta);
		done();
	});

	test('should have a twitter card tag', () => {
		expect(metaTags).toHaveProperty('twitter:card');
	});

	test('should have a sensible value in the twitter card tag', () => {
		expect(metaTags['twitter:card']).toMatch(/^(summary|summary_large_image|app)$/);
	});

	test('should have a twitter site tag', () => {
		expect(metaTags).toHaveProperty('twitter:site');
	});

	test('should have a user name in the twitter site tag', () => {
		expect(metaTags['twitter:site']).toMatch(/^@.*$/);
	});

	test('should have a twitter title tag', () => {
		expect(metaTags).toHaveProperty('twitter:title');
	});

	test('should have a twitter description tag', () => {
		expect(metaTags).toHaveProperty('twitter:description');
	});

	test('should have a twitter image tag', () => {
		expect(metaTags).toHaveProperty('twitter:image');
	});

	test('should have valid url in the twitter image tag', () => {
		expect(isUrl(metaTags['twitter:image'])).toBeTruthy();
	});

	test('should have an og type tag', () => {
		expect(metaTags).toHaveProperty('og:type');
	});

	test('should have a sensible value in the og type tag', () => {
		const ogTypes = [
			'music.song',
			'music.album',
			'music.playlist',
			'music.radio_station',
			'video.movie',
			'video.episode',
			'video.tv_show',
			'video.other',
			'article',
			'book',
			'profile',
			'website'
		];
		expect(ogTypes.find(element => element === metaTags['og:type'])).toBeDefined();
	});

	test('should have an og title tag', () => {
		expect(metaTags).toHaveProperty('og:title');
	});

	test('should have an og description tag', () => {
		expect(metaTags).toHaveProperty('og:description');
	});

	test('should have an og url tag', () => {
		expect(metaTags).toHaveProperty('og:url');
	});

	test('should have valid url in the og url tag', () => {
		expect(isUrl(metaTags['og:url'])).toBeTruthy();
	});

	test('should have an og image tag', () => {
		expect(metaTags).toHaveProperty('og:image');
	});

	test('should have valid url in the og image tag', () => {
		expect(isUrl(metaTags['og:image'])).toBeTruthy();
	});
});

// 10. Robots.txt - will need a new describe block & second chromy instance or a navigation event

// 11. 404 page - Check header response

// 12. Sitemap - will need a new describe block & second chromy instance or a navigation event

// 13. Text based navigation - Very hard / impossible to test
