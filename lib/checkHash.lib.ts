import * as crypto from "crypto";
import * as queryString from "node:querystring";

const checkHash = (
  params: string,
  key: string,
  lifetime: number = 86400
): boolean => {
  // init hash var
  let hash: string;

  // generate phrase signed by secret key and input "WebAppData"
  const secretKey = crypto
    .createHmac("sha256", "WebAppData")
    .update(key)
    .digest();

  // parse query params
  const queryParams: queryString.ParsedUrlQuery = queryString.parse(params);

  // get hash from query params
  hash = queryParams.hash as string;

  // delete hash from query params and make string from object
  const parsedQueryParams: string = Object.keys(queryParams)
    .filter((key) => key !== "hash")
    .sort()
    .map((key) => `${key}=${queryParams[key]}`)
    .join("\n");

  // check if hash or parsedQueryParams is empty
  if (!hash || !parsedQueryParams) return false;

  // check if lifetime is not expired
  if (
    lifetime !== 0 &&
    Math.floor(Date.now() / 1000) - lifetime >
      +params.split("auth_date=")[1].split("&")[0]
  )
    return false;

  // generate hash from parsedQueryParams and compare with hash from query params
  const endHash = crypto
    .createHmac("sha256", secretKey)
    .update(decodeURIComponent(parsedQueryParams))
    .digest("hex");

  // return result
  return endHash === hash;
};

export default checkHash;
