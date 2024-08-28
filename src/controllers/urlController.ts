import shortid from 'shortid';
import {URL} from '../models/urlModel';

export async function handleGenerateUrl(req: any, res: any) {
  const body = req.body || {};

  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);

  if (!body.url) {
    console.log('Missing URL in body:', body);
    return res.status(400).json({error: 'Url is required.'});
  }
  const shortId = shortid.generate();
  await URL.create({
    shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });
  return res.json({id: shortId});
}

export async function handleRedirectUrl(req: any, res: any) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {shortId},
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
  );
  return res.redirect(entry?.redirectUrl);
}

export async function handleGetAnalytics(req: any, res: any) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({shortId});
  return res.json({
    totalClicks: result?.visitHistory?.length,
    analytics: result?.visitHistory,
  });
}
