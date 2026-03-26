import { useState, useEffect } from 'react';
import { SimpleInput } from '@/pages/SimpleInput';
import { AdvancedMode } from '@/pages/AdvancedMode';
import { ResultPage } from '@/pages/ResultPage';
import type { JobInfo, AssessmentResult } from '@/types/assessment';
import { performAssessment } from '@/utils/assessmentEngine';
import { initAnalytics, trackPageView } from '@/utils/analytics';
import './App.css';

type AppState = 'simple' | 'advanced' | 'result';
type InputMethod = 'voice' | 'text' | 'quick-select' | 'resume';

function App() {
  const [appState, setAppState] = useState<AppState>('simple');
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [inputMethod, setInputMethod] = useState<InputMethod>('text');

  // 初始化分析
  useEffect(() => {
    initAnalytics();
  }, []);

  // 页面切换追踪
  useEffect(() => {
    trackPageView(appState);
  }, [appState]);

  const handleSimpleSubmit = (jobInfo: JobInfo, method: InputMethod) => {
    const result = performAssessment(jobInfo);
    setAssessmentResult(result);
    setInputMethod(method);
    setAppState('result');
  };

  const handleAdvancedSubmit = (jobInfo: JobInfo, method: InputMethod) => {
    const result = performAssessment(jobInfo);
    setAssessmentResult(result);
    setInputMethod(method);
    setAppState('result');
  };

  const handleBackToSimple = () => {
    setAppState('simple');
  };

  const handleGoToAdvanced = () => {
    setAppState('advanced');
  };

  const handleReset = () => {
    setAssessmentResult(null);
    setAppState('simple');
  };

  const handleSelectRelatedJob = (job: { title: string; industry: string }) => {
    // 快速评估相关岗位
    const jobInfo: JobInfo = {
      jobTitle: job.title,
      industry: job.industry,
      experience: '3-5',
      mainResponsibilities: [],
      skills: [],
      tools: [],
      education: 'bachelor',
      salary: '10-20',
    };
    const result = performAssessment(jobInfo);
    setAssessmentResult(result);
    setInputMethod('quick-select');
    setAppState('result');
    window.scrollTo(0, 0);
  };

  switch (appState) {
    case 'simple':
      return (
        <SimpleInput 
          onSubmit={(jobInfo) => handleSimpleSubmit(jobInfo, 'text')}
          onAdvancedMode={handleGoToAdvanced}
        />
      );
    
    case 'advanced':
      return (
        <AdvancedMode
          onSubmit={(jobInfo, method) => handleAdvancedSubmit(jobInfo, method)}
          onBack={handleBackToSimple}
        />
      );
    
    case 'result':
      return assessmentResult ? (
        <ResultPage
          result={assessmentResult}
          onReset={handleReset}
          inputMethod={inputMethod}
          onSelectRelatedJob={handleSelectRelatedJob}
        />
      ) : null;
    
    default:
      return null;
  }
}

export default App;
