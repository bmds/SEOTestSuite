const seo = {
	pageTitle: () => document.title,
	analytics: () => window.hasOwnProperty('ga'),
	h1Tags: () => document.querySelectorAll('h1').length,
	altText: () => {
		let images = Array.from(document.querySelectorAll('img'));
		return images.every(theImage => theImage.hasAttribute('alt'));
	}
};

module.exports = seo;
