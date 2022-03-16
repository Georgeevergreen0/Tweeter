const { TwitterApi } = require('twitter-api-v2');
const client = new TwitterApi({
  appKey: process.env.consumer_key,
  appSecret: process.env.consumer_secret,
  accessToken: process.env.access_token_key,
  accessSecret: process.env.access_token_secret
})

export default async function handler(req, res) {
  try {
    const { username } = req.query;
    const user = await client.v2.userByUsername(username);
    const tweets = await client.v2.userTimeline(user.data.id, { max_results: 10 });
    const last50 = await tweets.fetchLast(50);
    return res.status(200).json({ username: user.data.name, timeline: last50 })
  } catch (error) {
    return res.status(500).json(error)
  }
}