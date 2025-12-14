import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const uid = req.query.uid as string;

    if (!uid) {
      return res.status(400).json({ message: 'UID is required' });
    }

    // Revalidate the specific page
    await res.revalidate(`/${uid}`);

    // Also revalidate the home page to update the list
    await res.revalidate('/');

    return res.json({ revalidated: true, uid });
  } catch (err) {
    return res.status(500).json({ message: 'Error revalidating', error: String(err) });
  }
}
