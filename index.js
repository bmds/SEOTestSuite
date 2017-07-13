const seo = {
	pageTitle: () => document.title,
	analytics: () => window.hasOwnProperty('ga'),
	h1Tags: () => document.querySelectorAll('h1').length,
	altText: () => {
		let images = Array.from(document.querySelectorAll('img'));
		return images.every(theImage => theImage.hasAttribute('alt'));
	},
	socialMeta: () => {
		let meta = {};
		Array.from(document.getElementsByTagName('meta')).forEach(tag => {
			if(tag.name && tag.name.startsWith('twitter')) {
				meta[tag.name] = tag.content;
			} else if(tag.attributes.property && tag.attributes.property.value.startsWith('og')) {
				meta[tag.attributes.property.value] = tag.content;
			}
		});
		return meta;
	}
};

module.exports = seo;
