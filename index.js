const seo = {
	pageTitle: () => document.title,
	analytics: () => window.hasOwnProperty('ga'),
	h1Tags: () => document.querySelectorAll('h1').length,
	altText: () => {
		let images = Array.from(document.querySelectorAll('img'));
		return images.every(theImage => theImage.hasAttribute('alt'));
	},
	socialMeta: () => {
		let socialMeta = {};
		Array.from(document.getElementsByTagName('meta')).forEach(tag => {
			if(tag.name && tag.name.startsWith('twitter')) {
				socialMeta[tag.name] = tag.content;
			} else if(tag.attributes.property && tag.attributes.property.value.startsWith('og')) {
				socialMeta[tag.attributes.property.value] = tag.content;
			}
		});
		return socialMeta;
	},
	meta: () => {
		let meta = {};

		Array.from(document.getElementsByTagName('meta')).forEach(tag => {
			if(tag.name && (tag.name.startsWith('twitter') === false) && (tag.attributes.property.value.startsWith('og') === false)) {
				meta[tag.name] = tag.content;
			}
		});

		return meta;
	}
};

module.exports = seo;
