import { FastifyReply, FastifyRequest } from 'fastify';
import { DateTime } from 'luxon';
import { getCouple } from './couple.service';
import { createCouplePage } from './couplePage.service';
import { getCouplePage } from './couplePage.service';

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
