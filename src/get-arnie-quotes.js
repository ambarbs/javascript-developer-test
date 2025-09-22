const { httpGet } = require('./mock-http-interface');

/**
 * Fetch quotes from URLs and normalize results:
 * If 200 then:  { "Arnie Quote": message }, else: { "FAILURE": message }
 */
const getArnieQuotes = async (urls = []) => {
  const results = await Promise.all(urls.map(httpGet));
  return results.map(({ status, body }) => {
    // body is a JSON string like '{"message":"..."}'
    const { message } = JSON.parse(body);
    return { [status === 200 ? 'Arnie Quote' : 'FAILURE']: message };
  });
};

module.exports = {
  getArnieQuotes,
};
