'use strict';

const {pathToRegexp} = require('path-to-regexp');
const errorPage = require('./pages/errorPage');
const indexPage = require('./pages/index');
const querystring = require("querystring");
const r2 = require("r2");
const url = require('url');

const CAT_API_URL = "https://api.thecatapi.com/";
const CAT_API_KEY = "c719095c-b407-4ae0-982a-3b041adebcc4";

/**
 * Called whenever a message is posted into the same channel as the Bot
 */
async function messageReceived(message) {
  try {
	const images = await loadImage(message);

	const image = images[0];

	const breed = image.breeds[0];

	return (
		{
			...breed,
			imageUrl: image.url
		}
	);

	} catch (error) {
		console.error(error);
	}
}
/**
 * Makes a request to theCATApi.com for a random dog image with breed info attached.
 */
async function loadImage(sub_id) {
	const headers = {
		"X-API-KEY": CAT_API_KEY,
	};

	const query_params = {
		has_breeds: true, // we only want images with at least one breed data object - name, temperament etc
		mime_types: "jpg,png", // mimetypes of images
		size: "small", // get the small images
		sub_id: sub_id, // pass the message senders username so you can see how many images each user has asked for in the stats
		limit: 1, // only need one
	};

	let queryString = querystring.stringify(query_params);

	try {
		let _url = CAT_API_URL + `v1/images/search?${queryString}`;

		var response = await r2.get(_url, { headers }).json;

	} catch (e) {
		console.error(e);
	}

	return response;
}

const URL_REGEX = pathToRegexp("/:message");

module.exports = async (req, res) => {
	const q = url.parse(req.url, true);

	const [_, message] = URL_REGEX.exec(q.pathname);

	const data = await messageReceived(message);

	if (data && data !== {}) {
		return res.type('text/html').status(200).send(indexPage(data));
	} else {
		return res.type('text/html').status(404).send(errorPage());
	}
};
