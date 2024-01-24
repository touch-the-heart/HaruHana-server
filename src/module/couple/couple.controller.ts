import { FastifyReply, FastifyRequest } from 'fastify';
import { DateTime } from 'luxon';
import { getCouple } from './service/couple.service';
import { createCouplePage, getCouplePageById, getCouplePages } from './service/couplePage.service';
import { getCouplePage } from './service/couplePage.service';
import { getSignedURL } from '../../provider/s3';
import { uuid } from 'uuidv4';
import { CoupleImageInputURLType } from './schema/couple.schema';
import mime from 'mime-types';
import { CoupleImageInputType } from './schema/coupleImage.schma';
import { createCoupleImage } from './service/coupleImage.service';

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
  console.log(couplePage);
  if (!couplePage) {
    return createCouplePage({
      date: findDate,
      coupleId: couple.id,
      title: '오늘의 제목을 지어주세요',
    });
  }
  return couplePage;
};

export const getCoupleCalendarHandler = async (req: FastifyRequest, res: FastifyReply) => {
  const { date } = req.params as { date: string };
  const { id } = req.user;

  const findDateTime = date
    ? DateTime.fromFormat(date, 'yyyy-MM-dd').setZone('Asia/seoul')
    : DateTime.now().setZone('Asia/seoul');

  const gtDate = findDateTime.startOf('month').toFormat('yyyy-MM-dd');
  const lteDate = findDateTime.endOf('month').toFormat('yyyy-MM-dd');

  const couple = await getCouple(id);
  if (!couple) {
    return res.code(404).send({ message: 'couple is not found' });
  }
  return getCouplePages({ coupleId: couple.id, lteDate, gtDate });
};

export const getCoupleImageURL = async (req: FastifyRequest<{ Body: CoupleImageInputURLType }>) => {
  const contentType = req.body.contentType;
  const imageKey = `${uuid()}.${mime.extension(contentType)}`;
  const key = `raw/${imageKey}`;
  const { url, fields } = await getSignedURL({ key });
  return { imageKey, url, fields };
};

export const uploadCoupleImage = async (req: FastifyRequest<{ Body: CoupleImageInputType }>) => {
  const { couplePageId, src } = req.body;
  const { id } = req.user;

  const couplePage = await getCouplePageById(couplePageId);
  if (!couplePage) {
    return { result: false, data: null, message: '커플페이지가 존재하지 않습니다.' };
  }
  return createCoupleImage({
    src,
    userId: id,
    couplePageId: couplePage.id,
  });
};
