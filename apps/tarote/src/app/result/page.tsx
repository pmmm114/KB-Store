// 🔮 타로 결과 페이지
// AI 해석 결과를 확인하는 페이지 (회원가입 유도 포함)

import { Suspense } from 'react';
import { TarotResultProvider } from '../../features/tarotResult/model/provider';
import { TarotResultFlow } from '../../features/tarotResult/ui/TarotResultFlow/TarotResultFlow';

// 🔄 로딩 컴포넌트
const ResultPageLoading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto mb-4"></div>
      <p className="text-gray-600">결과를 불러오고 있습니다...</p>
    </div>
  </div>
);

export default function ResultPage() {
  return (
    <TarotResultProvider>
      <Suspense fallback={<ResultPageLoading />}>
        <TarotResultFlow />
      </Suspense>
    </TarotResultProvider>
  );
}

// 📄 페이지 메타데이터
export const metadata = {
  title: 'Tarote - 타로 해석 결과',
  description: 'AI가 분석한 당신의 타로 카드 해석 결과를 확인해보세요.',
  openGraph: {
    title: 'Tarote - 타로 해석 결과',
    description: 'AI가 분석한 당신의 타로 카드 해석 결과를 확인해보세요.',
    type: 'website',
  },
};