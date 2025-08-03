'use client';

import { useTarotReading } from '../../model';
import { QuestionStep } from '../QuestionStep';
import { SelectStep } from '../SelectStep';

export const TarotReadingFlow = () => {
  const { currentStep, nextStep, prevStep } = useTarotReading();

  switch (currentStep) {
    case 'question':
      return <QuestionStep onNextAction={nextStep} />;
    case 'select':
      return <SelectStep onPrevAction={prevStep} />;
    default:
      return <QuestionStep onNextAction={nextStep} />;
  }
};
