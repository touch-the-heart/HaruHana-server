import { S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';

import { env } from '../../config/env';

const s3Config = {
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY,
    secretAccessKey: env.AWS_SECRET_KEY,
  },
};
export const S3 = new S3Client(s3Config);

export const getSignedURL = async ({ key }: { key: string }) => {
  const { url, fields } = await createPresignedPost(S3, {
    Bucket: 'haruhana',
    Key: key,
    Conditions: [
      ['content-length-range', 0, 50 * 1000 * 1000],
      ['starts-with', '$Content-Type', 'image/'],
    ],
    Fields: {
      acl: 'public-read',
    },
    Expires: 600, //Seconds before the presigned post expires. 3600 by default.
  });
  return { url, fields };
};
