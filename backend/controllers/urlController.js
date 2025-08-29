const URL = require("../models/urlModel");
const shortid = require("shortid");

function createShortUrl(req, res) {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: "Original URL is required" });
  }

  try {
    const shortUrl = shortid.generate();
    const newUrl = new URL({ originalUrl, shortUrl });
    newUrl.save();
    res.status(201).json(newUrl);
  } catch (error) {
    res.status(500).json({ error: "Error creating short URL" });
  }
}
async function findOriginalUrl(req, res) {
  const { shortId } = req.params;

  try {
    const urlDoc = await URL.findOneAndUpdate(
      { shortUrl: shortId },
      { $push: { visitedHistory: { date: Date.now() } } },
      { new: true }
    );

    if (!urlDoc) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // Redirect to original URL
    res.redirect(urlDoc.originalUrl);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

async function findUrlAnalytics(req, res) {
    const { shortId } = req.params;

    try {
        const urlDoc = await URL.findOne({ shortUrl: shortId });

        if (!urlDoc) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        res.status(200).json({
            originalUrl: urlDoc.originalUrl,
            shortUrl: urlDoc.shortUrl,
            createdAt: urlDoc.createdAt,
            visitedHistory: urlDoc.visitedHistory
        });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
}

module.exports = {
  createShortUrl,
  findOriginalUrl,
  findUrlAnalytics,
};
