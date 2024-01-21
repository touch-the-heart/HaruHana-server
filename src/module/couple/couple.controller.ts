import { FastifyReply, FastifyRequest } from 'fastify';
import { DateTime } from 'luxon';
import { getCouple } from './couple.service';
import { createCouplePage } from './couplePage.service';
import { getCouplePage } from './couplePage.service';
import { getSignedURL } from '../../provider/s3';
import { uuid } from 'uuidv4';
import { CoupleImageType } from './couple.schema';
import mime from 'mime';

export const getCouplePageHandler = async (req: FastifyRequest, res: FastifyReply) => {
  const { date } = req.params as { date: string };
  const { id } = req.user;

  const findDateTime = date
    ? DateTime.fromFormat(date, 'yyyy-MM-dd').setZone('Asia/seoul')
    : DateTime.now().setZone('Asia/seoul');
  const findDate = findDateTime.toFormat('yyyy-MM-dd');

  const couple = await getCouple(id);
  if (!couple) {
    return res.code(404).send({ message: 'couple is not found' });
  }

  const couplePage = await getCouplePage({ coupleId: couple.id, date: findDate });
  if (!couplePage) {
    return createCouplePage({
      date: findDate,
      coupleId: couple.id,
      title: '오늘의 제목을 지어주세요',
    });
  }
  return couplePage;
};

export const getCoupleImageURL = async (req: FastifyRequest<{ Body: CoupleImageType }>) => {
  const contentType = req.body.contentType;
  const imageKey = `${uuid()}.${mime.getType(contentType)}`;
  const key = `raw/${imageKey}`;
  const { url, fields } = await getSignedURL({ key });
  return { imageKey, url, fields };
};
