import * as crypto from "node:crypto";
import * as queryString from "node:querystring";

/**
 * Checks the validity of the hash in the provided query parameters.
 *
 * @param {string} params - The query parameters as a string.
 * @param {string} key - The secret key used for generating the hash.
 * @returns {boolean} - Returns true if the hash is valid, otherwise false.
 */
const checkHash = (params: string, key: string): boolean => {
	// generate phrase signed by secret key and input "WebAppData"
	const secretKey = crypto
		.createHmac("sha256", "WebAppData")
		.update(key)
		.digest();

	// parse query params
	const queryParams: queryString.ParsedUrlQuery = queryString.parse(params);

	// get hash from query params
	const hash = queryParams.hash as string;

	// delete hash from query params and make string from object
	const parsedQueryParams: string = Object.keys(queryParams)
		.filter((key) => key !== "hash")
		.sort()
		.map((key) => `${key}=${queryParams[key]}`)
		.join("\n");

	// check if hash or parsedQueryParams is empty
	if (!hash || !parsedQueryParams) return false;

	// generate hash from parsedQueryParams and compare with hash from query params
	const endHash = crypto
		.createHmac("sha256", secretKey)
		.update(decodeURIComponent(parsedQueryParams))
		.digest("hex");

	// return result
	return endHash === hash;
};

export default checkHash;
