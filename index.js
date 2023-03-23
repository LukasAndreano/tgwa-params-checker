const crypto = require("crypto");

module.exports = (params, key, lifetime = 7200) => {
  let hash;

  let queryParams = [];

  const secretKey = crypto
    .createHmac("sha256", "WebAppData")
    .update(key)
    .digest();

  const processQueryParam = (key, value) => {
    if (typeof value === "string") {
      if (key === "hash") {
        hash = value;
      } else {
        queryParams.push({ key, value });
      }
    }
  };

  if (typeof params === "string") {
    const formattedSearch = params.startsWith("?") ? params.slice(1) : params;
    for (const param of formattedSearch.split("&")) {
      const [key, value] = param.split("=");
      processQueryParam(key, value);
    }
  } else {
    for (const key of Object.keys(searchOrParsedUrlQuery)) {
      const value = searchOrParsedUrlQuery[key];
      processQueryParam(key, value);
    }
  }

  queryParams = queryParams
    .sort((a, b) => a.key.localeCompare(b.key))
    .map((item) => `${item.key}=${item.value}`)
    .join("\n");

  if (!hash || !queryParams) return false;

  if (
    lifetime !== 0 &&
    Math.floor(Date.now() / 1000) - lifetime >
      params.split("auth_date=")[1].split("&")[0]
  )
    return false;

  const endHash = crypto
    .createHmac("sha256", secretKey)
    .update(decodeURIComponent(queryParams))
    .digest("hex");

  return endHash === hash;
};
