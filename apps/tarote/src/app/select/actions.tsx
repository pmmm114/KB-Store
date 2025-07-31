'use server';

import type { TAnalyzeTarot } from '../../features/cardSelection/model/types';

export const analyzeTarot: TAnalyzeTarot = async (selectedCards, question) => {
  // DB 저장, AI API 호출 등 서버에서 처리
  // 예시: const result = await callOpenAI(selectedCards, question)
  // return result
};
