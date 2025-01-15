import type { NextApiRequest, NextApiResponse } from 'next'
import { LikeManager } from '../../../utils/likeManager'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { postId, userId } = req.body
    
    if (!postId || !userId) {
      return res.status(400).json({ message: 'Missing required parameters' })
    }

    const likeManager = new LikeManager()
    const status = await likeManager.getLikeStatus(postId, userId)
    
    res.status(200).json(status)
  } catch (error) {
    console.error('Check like status error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
} 