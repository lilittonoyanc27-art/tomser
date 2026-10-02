/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  ALL_QUESTIONS,
  THEMES,
  getStandardTickets,
  getRandomTicket,
  QuestionItem,
  ExamTicket
} from './questions.ts';
import {
  Volume2,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Search,
  CheckCircle2,
  HelpCircle,
  Clock,
  Play,
  Pause,
  Shuffle,
  Eye,
  Check,
  X,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Dices,
  Sparkles
} from 'lucide-react';

export default function App() {
  const allTickets = useMemo(() => getStandardTickets(), []);

  // Navigation mode: 'exam' (tickets), 'all' (all 80 questions with per-theme ticket draw), 'flashcards'
  const [activeTab, setActiveTab] = useState<'exam' | 'all' | 'flashcards'>('exam');

  // Exam sub-mode: 'single' (draw 1 random question) or 'ticket4' (draw 4-question full ticket)
  const [examMode, setExamMode] = useState<'single' | 'ticket4'>('single');

  // Currently drawn single random question in Exam tab
  const [currentRandomQuestion, setCurrentRandomQuestion] = useState<QuestionItem>(() => {
    const randIdx = Math.floor(Math.random() * ALL_QUESTIONS.length);
    return ALL_QUESTIONS[randIdx];
  });

  // Currently drawn 4-question ticket in Exam tab
  const [currentTicket, setCurrentTicket] = useState<ExamTicket>(() => allTickets[0]);
  const [isPullingAnim, setIsPullingAnim] = useState(false);

  // Per-question toggle state for Armenian translation visibility: questionId -> boolean
  const [visibleArmenian, setVisibleArmenian] = useState<Record<number, boolean>>({});

  // Per-question toggle state for answer visibility: questionId -> boolean
  const [visibleAnswers, setVisibleAnswers] = useState<Record<number, boolean>>({});

  // Per-theme drawn question in "All Questions" tab (themeId: 1 | 2 | 3 | 4)
  const [drawnThemeQuestion, setDrawnThemeQuestion] = useState<{
    themeId: number;
    question: QuestionItem;
  } | null>(null);

  // Learned / mastered question IDs (persisted to localStorage)
  const [masteredIds, setMasteredIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('es_exam_mastered_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save mastered IDs
  useEffect(() => {
    try {
      localStorage.setItem('es_exam_mastered_ids', JSON.stringify(masteredIds));
    } catch {
      // ignore
    }
  }, [masteredIds]);

  // Exam Preparation Timer (15 minutes)
  const [timerSeconds, setTimerSeconds] = useState(15 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(15 * 60);
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Pull a single random question (overall)
  const handlePullRandomSingleQuestion = () => {
    setIsPullingAnim(true);
    setTimeout(() => {
      let nextQ: QuestionItem;
      do {
        const randIdx = Math.floor(Math.random() * ALL_QUESTIONS.length);
        nextQ = ALL_QUESTIONS[randIdx];
      } while (nextQ.id === currentRandomQuestion.id && ALL_QUESTIONS.length > 1);

      setCurrentRandomQuestion(nextQ);
      setVisibleArmenian(prev => ({ ...prev, [nextQ.id]: false }));
      setVisibleAnswers(prev => ({ ...prev, [nextQ.id]: false }));
      setIsPullingAnim(false);
      resetTimer();
    }, 350);
  };

  // Pull a ticket specifically for ONE theme (the requested feature: "для каждого вида отдельно тянуть билет")
  const handlePullTicketForTheme = (themeId: number) => {
    const themeQuestions = ALL_QUESTIONS.filter(q => q.themeId === themeId);
    let nextQ: QuestionItem;
    do {
      const randIdx = Math.floor(Math.random() * themeQuestions.length);
      nextQ = themeQuestions[randIdx];
    } while (
      drawnThemeQuestion &&
      drawnThemeQuestion.themeId === themeId &&
      drawnThemeQuestion.question.id === nextQ.id &&
      themeQuestions.length > 1
    );

    setDrawnThemeQuestion({ themeId, question: nextQ });
    // Reset visibility for this question
    setVisibleArmenian(prev => ({ ...prev, [nextQ.id]: false }));
    setVisibleAnswers(prev => ({ ...prev, [nextQ.id]: false }));
  };

  // Pull a 4-question random ticket
  const handlePullRandomTicket = () => {
    setIsPullingAnim(true);
    setTimeout(() => {
      const random = getRandomTicket(allTickets);
      setCurrentTicket(random);
      setIsPullingAnim(false);
      resetTimer();
    }, 400);
  };

  // Select a specific 4-question ticket
  const handleSelectTicket = (ticketNum: number) => {
    const found = allTickets.find(t => t.ticketNumber === ticketNum);
    if (found) {
      setCurrentTicket(found);
      resetTimer();
    }
  };

  // Toggle Armenian translation for a question
  const toggleArmenian = (qId: number) => {
    setVisibleArmenian(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  // Toggle answer for a question
  const toggleAnswer = (qId: number) => {
    setVisibleAnswers(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  // Toggle mastered status
  const toggleMastered = (qId: number) => {
    setMasteredIds(prev =>
      prev.includes(qId) ? prev.filter(id => id !== qId) : [...prev, qId]
    );
  };

  // Bulk actions for current ticket
  const showAllTranslationsOnTicket = () => {
    const updates: Record<number, boolean> = {};
    currentTicket.questions.forEach(q => {
      updates[q.id] = true;
    });
    setVisibleArmenian(prev => ({ ...prev, ...updates }));
  };

  const showAllAnswersOnTicket = () => {
    const updates: Record<number, boolean> = {};
    currentTicket.questions.forEach(q => {
      updates[q.id] = true;
    });
    setVisibleAnswers(prev => ({ ...prev, ...updates }));
  };

  // Text-to-speech for Spanish pronunciation
  const speakSpanish = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.92;
      window.speechSynthesis.speak(utterance);
    }
  };

  // State for "All Questions" tab
  const [selectedThemeFilter, setSelectedThemeFilter] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [masteredFilter, setMasteredFilter] = useState<'all' | 'mastered' | 'unmastered'>('all');

  const filteredQuestions = useMemo(() => {
    return ALL_QUESTIONS.filter(q => {
      if (selectedThemeFilter !== 'all' && q.themeId !== selectedThemeFilter) {
        return false;
      }
      if (masteredFilter === 'mastered' && !masteredIds.includes(q.id)) {
        return false;
      }
      if (masteredFilter === 'unmastered' && masteredIds.includes(q.id)) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const inEs = q.questionEs.toLowerCase().includes(query) || q.answerEs.toLowerCase().includes(query);
        const inHy = q.questionHy.toLowerCase().includes(query) || q.answerHy.toLowerCase().includes(query);
        const inNum = q.id.toString() === query || q.numberInTheme.toString() === query;
        return inEs || inHy || inNum;
      }
      return true;
    });
  }, [selectedThemeFilter, masteredFilter, searchQuery, masteredIds]);

  // Flashcards state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);
  const [flashcardTheme, setFlashcardTheme] = useState<number | 'all'>('all');

  const flashcardDeck = useMemo(() => {
    if (flashcardTheme === 'all') return ALL_QUESTIONS;
    return ALL_QUESTIONS.filter(q => q.themeId === flashcardTheme);
  }, [flashcardTheme]);

  const currentFlashcard = flashcardDeck[flashcardIndex] || flashcardDeck[0];

  const nextFlashcard = () => {
    setFlashcardFlipped(false);
    setFlashcardIndex(prev => (prev + 1) % flashcardDeck.length);
  };

  const prevFlashcard = () => {
    setFlashcardFlipped(false);
    setFlashcardIndex(prev => (prev - 1 + flashcardDeck.length) % flashcardDeck.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-blue-50/40 text-slate-900 flex flex-col">
      {/* 1. Header: Sky Blue, Deep Blue, Orange accents */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-3">
          {/* Brand */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-500 text-white font-extrabold flex items-center justify-center text-lg shadow-md modern-glow-blue shrink-0">
              ES
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-blue-950 text-lg sm:text-2xl tracking-tight leading-none">
                  Examen de Español
                </h1>
                <span className="hidden sm:inline-block px-2.5 py-0.5 text-xs font-bold bg-amber-100 text-amber-900 rounded-full border border-amber-300">
                  80 հարց · 20 տոմս
                </span>
              </div>
              <p className="text-xs sm:text-sm text-sky-700 font-medium mt-1">
                Իսպաներենի քննական համակարգ · Հայերեն թարգմանությամբ
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center bg-sky-100/70 p-1.5 rounded-xl border border-sky-200">
            <button
              onClick={() => setActiveTab('exam')}
              className={`px-3.5 sm:px-5 py-2 text-xs sm:text-base font-bold rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'exam'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-blue-900 hover:text-blue-700 hover:bg-sky-200/60'
              }`}
            >
              Քաշել տոմս
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 sm:px-5 py-2 text-xs sm:text-base font-bold rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-blue-900 hover:text-blue-700 hover:bg-sky-200/60'
              }`}
            >
              Բոլոր հարցերը (80)
            </button>
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`px-3.5 sm:px-5 py-2 text-xs sm:text-base font-bold rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'flashcards'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-blue-900 hover:text-blue-700 hover:bg-sky-200/60'
              }`}
            >
              Քարտեր
            </button>
          </nav>

          {/* Right progress indicator */}
          <div className="hidden lg:flex items-center gap-3 pl-2">
            <div className="text-right">
              <span className="text-xs text-sky-800 font-semibold block">Յուրացված</span>
              <span className="text-sm font-extrabold text-blue-950 tabular-nums">
                {masteredIds.length} / 80
              </span>
            </div>
            <div className="w-20 bg-sky-200 rounded-full h-3 overflow-hidden p-0.5">
              <div
                className="bg-gradient-to-r from-amber-400 via-orange-500 to-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${(masteredIds.length / 80) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* ===================== TAB 1: EXAM TICKET & RANDOM QUESTION MODE ===================== */}
        {activeTab === 'exam' && (
          <div className="space-y-6">
            {/* Top Interactive Banner: Draw Ticket & Timer */}
            <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 rounded-2xl p-5 sm:p-7 text-white shadow-lg relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute right-1/3 -top-10 w-48 h-48 bg-orange-500/20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="px-3 py-1 bg-amber-400 text-blue-950 font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-sm">
                      Քննական սիմուլյատոր
                    </span>

                    {/* Mode Switcher: 1 random question vs 4-question ticket */}
                    <div className="flex items-center bg-blue-950/40 p-1 rounded-xl border border-blue-400/40">
                      <button
                        onClick={() => setExamMode('single')}
                        className={`px-3 py-1 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                          examMode === 'single'
                            ? 'bg-amber-400 text-blue-950 shadow-sm'
                            : 'text-sky-200 hover:text-white'
                        }`}
                      >
                        1 Պատահական հարց
                      </button>
                      <button
                        onClick={() => setExamMode('ticket4')}
                        className={`px-3 py-1 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                          examMode === 'ticket4'
                            ? 'bg-amber-400 text-blue-950 shadow-sm'
                            : 'text-sky-200 hover:text-white'
                        }`}
                      >
                        Լրիվ տոմս (4 հարց)
                      </button>
                    </div>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    {examMode === 'single'
                      ? 'Քաշեք պատահական հարցով տոմս'
                      : `Քննական տոմս № ${currentTicket.ticketNumber}`}
                  </h2>
                  <p className="text-sky-100 text-sm sm:text-base mt-1 max-w-xl">
                    {examMode === 'single'
                      ? 'Սեղմեք կոճակը՝ 80 հարցերից պատահական մեկը քաշելու և պատասխանելու համար:'
                      : 'Ավանդական քննական տոմս՝ 4 հարցով 4 տարբեր թեմաներից:'}
                  </p>
                </div>

                {/* Right controls: Big Action Button & Timer */}
                <div className="flex flex-wrap items-center gap-3">
                  {examMode === 'single' ? (
                    <button
                      onClick={handlePullRandomSingleQuestion}
                      disabled={isPullingAnim}
                      className="cursor-pointer px-6 py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-blue-950 font-extrabold text-base sm:text-lg rounded-xl shadow-lg active:scale-95 transition-all flex items-center gap-2.5 modern-glow-orange border-2 border-amber-300"
                    >
                      <Dices className={`w-6 h-6 ${isPullingAnim ? 'animate-spin' : ''}`} />
                      <span>Քաշել պատահական հարց</span>
                    </button>
                  ) : (
                    <button
                      onClick={handlePullRandomTicket}
                      disabled={isPullingAnim}
                      className="cursor-pointer px-6 py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-blue-950 font-extrabold text-base sm:text-lg rounded-xl shadow-lg active:scale-95 transition-all flex items-center gap-2.5 modern-glow-orange border-2 border-amber-300"
                    >
                      <Shuffle className={`w-5 h-5 ${isPullingAnim ? 'animate-spin' : ''}`} />
                      <span>Քաշել պատահական տոմս</span>
                    </button>
                  )}

                  {/* Timer widget */}
                  <div className="flex items-center gap-3 bg-blue-950/40 backdrop-blur border border-blue-400/40 px-4 py-2.5 rounded-xl">
                    <Clock className="w-5 h-5 text-amber-300" />
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-sky-200 font-bold block">
                        Ժամանակ
                      </span>
                      <span className="font-mono text-lg font-extrabold tabular-nums text-white">
                        {formatTimer(timerSeconds)}
                      </span>
                    </div>
                    <button
                      onClick={() => setIsTimerRunning(prev => !prev)}
                      className="p-1.5 text-sky-200 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-lg"
                      title={isTimerRunning ? 'Դադարեցնել' : 'Սկսել'}
                    >
                      {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={resetTimer}
                      className="p-1.5 text-sky-300 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-lg"
                      title="Վերակայել"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 20 Tickets Selector Bar (Visible when in 4-question mode) */}
              {examMode === 'ticket4' && (
                <div className="mt-6 pt-5 border-t border-blue-400/30">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-200">
                      Ընտրել տոմս (1 - 20)
                    </span>
                    <span className="text-xs text-amber-300 font-bold">
                      Ընթացիկ՝ Տոմս {currentTicket.ticketNumber}
                    </span>
                  </div>
                  <div className="grid grid-cols-10 sm:grid-cols-20 gap-1.5">
                    {allTickets.map(ticket => {
                      const isSelected = ticket.ticketNumber === currentTicket.ticketNumber;
                      const ticketMasteredCount = ticket.questions.filter(q =>
                        masteredIds.includes(q.id)
                      ).length;

                      return (
                        <button
                          key={ticket.ticketNumber}
                          onClick={() => handleSelectTicket(ticket.ticketNumber)}
                          className={`h-10 rounded-xl font-bold text-sm transition-all relative flex flex-col items-center justify-center ${
                            isSelected
                              ? 'bg-amber-400 text-blue-950 shadow-md ring-2 ring-white scale-105'
                              : 'bg-blue-800/60 hover:bg-blue-800 text-white border border-blue-500/30'
                          }`}
                          title={`Տոմս N ${ticket.ticketNumber} (Յուրացված: ${ticketMasteredCount}/4)`}
                        >
                          <span>{ticket.ticketNumber}</span>
                          {ticketMasteredCount === 4 && (
                            <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-emerald-300" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* ================= MODE A: SINGLE RANDOM QUESTION CARD ================= */}
            {examMode === 'single' && (
              <div
                className={`bg-white border-2 border-sky-200 rounded-3xl p-6 sm:p-10 ticket-shadow transition-all duration-300 relative ${
                  isPullingAnim ? 'opacity-40 scale-95' : 'opacity-100 scale-100'
                }`}
              >
                <div className="border-b-2 border-sky-100 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-orange-600">
                      <GraduationCap className="w-5 h-5 text-orange-500" />
                      <span>ՔԱՇՎԱԾ ՔՆՆԱԿԱՆ ՏՈՄՍ · BILLETE DE EXAMEN</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-950 tracking-tight mt-1">
                      Հարց № {currentRandomQuestion.id} (80-ից)
                    </h2>
                    <p className="text-base sm:text-lg text-sky-800 font-semibold mt-1">
                      Թեմա {currentRandomQuestion.themeId} · {currentRandomQuestion.themeTitleEs} ({currentRandomQuestion.themeTitleHy})
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <button
                      onClick={() => toggleMastered(currentRandomQuestion.id)}
                      className={`px-4 py-2 text-sm font-bold rounded-xl flex items-center gap-2 transition-all ${
                        masteredIds.includes(currentRandomQuestion.id)
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-sky-100 text-blue-900 hover:bg-sky-200 border border-sky-300'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                      <span>
                        {masteredIds.includes(currentRandomQuestion.id)
                          ? 'Յուրացված է'
                          : 'Նշել իմացած'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Instructions banner */}
                <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-4 mb-7 text-sm sm:text-base text-sky-950 flex items-start gap-3">
                  <span className="text-xl shrink-0">💡</span>
                  <div className="leading-relaxed">
                    Սեղմեք <strong>իսպաներեն հարցի վրա</strong>՝ բացելու համար հայերեն թարգմանությունը (🇦🇲)։
                    Կողքի <strong>«Պատասխան · Sí»</strong> կոճակը ցույց է տալիս ճիշտ պատասխանը։
                  </div>
                </div>

                {/* The Single Question Display */}
                <ModernQuestionCard
                  question={currentRandomQuestion}
                  indexNumber={currentRandomQuestion.numberInTheme}
                  isArmenianVisible={!!visibleArmenian[currentRandomQuestion.id]}
                  isAnswerVisible={!!visibleAnswers[currentRandomQuestion.id]}
                  isMastered={masteredIds.includes(currentRandomQuestion.id)}
                  onToggleArmenian={() => toggleArmenian(currentRandomQuestion.id)}
                  onToggleAnswer={() => toggleAnswer(currentRandomQuestion.id)}
                  onToggleMastered={() => toggleMastered(currentRandomQuestion.id)}
                  onSpeakSpanish={() => speakSpanish(currentRandomQuestion.questionEs)}
                  showThemeBadge={false}
                />

                {/* Single Ticket Bottom Controls */}
                <div className="mt-8 pt-6 border-t-2 border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    onClick={handlePullRandomSingleQuestion}
                    className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-blue-950 font-extrabold text-base sm:text-lg rounded-2xl shadow-md transition-all flex items-center justify-center gap-2.5 border border-amber-300 active:scale-95"
                  >
                    <Dices className="w-5 h-5" />
                    <span>Քաշել հաջորդ պատահական հարցը</span>
                  </button>

                  <div className="text-sm font-semibold text-sky-800">
                    Պատահական ընտրություն բոլոր 80 հարցերից
                  </div>
                </div>
              </div>
            )}

            {/* ================= MODE B: FULL 4-QUESTION TICKET ================= */}
            {examMode === 'ticket4' && (
              <div
                className={`bg-white border-2 border-sky-200 rounded-3xl p-6 sm:p-9 ticket-shadow transition-all duration-300 relative ${
                  isPullingAnim ? 'opacity-40 scale-98' : 'opacity-100 scale-100'
                }`}
              >
                {/* Ticket Top Decorative Header */}
                <div className="border-b-2 border-sky-100 pb-6 mb-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-orange-600">
                      <GraduationCap className="w-4 h-4 text-orange-500" />
                      <span>EXAMEN OFICIAL · FILOLOGÍA ESPAÑOLA</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-950 tracking-tight mt-1.5">
                      BILLETE DE EXAMEN Nº {currentTicket.ticketNumber}
                    </h2>
                    <p className="text-base sm:text-lg text-sky-800 font-semibold mt-1">
                      Քննական տոմս № {currentTicket.ticketNumber} · 4 հարց (4 տարբեր թեմաներից)
                    </p>
                  </div>

                  {/* Batch toggles */}
                  <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-center">
                    <button
                      onClick={showAllTranslationsOnTicket}
                      className="px-4 py-2 text-sm font-bold text-blue-900 bg-sky-100 hover:bg-sky-200 rounded-xl transition-colors flex items-center gap-2 border border-sky-300"
                      title="Բացել բոլոր թարգմանությունները"
                    >
                      <Eye className="w-4 h-4 text-blue-700" />
                      <span>Բոլոր թարգմանությունները</span>
                    </button>
                    <button
                      onClick={showAllAnswersOnTicket}
                      className="px-4 py-2 text-sm font-bold text-orange-950 bg-gradient-to-r from-amber-200 to-orange-200 hover:from-amber-300 hover:to-orange-300 rounded-xl transition-colors flex items-center gap-2 border border-amber-300"
                      title="Բացել բոլոր պատասխանները"
                    >
                      <CheckCircle2 className="w-4 h-4 text-orange-600" />
                      <span>Բոլոր պատասխանները</span>
                    </button>
                  </div>
                </div>

                {/* Instructions banner */}
                <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-4 mb-7 text-sm sm:text-base text-sky-950 flex items-start gap-3">
                  <span className="text-xl shrink-0">💡</span>
                  <div className="leading-relaxed">
                    Սեղմեք <strong>իսպաներեն հարցի վրա</strong>՝ բացելու համար հայերեն թարգմանությունը (🇦🇲)։
                    Կողքի <strong>«Պատասխան · Sí»</strong> կոճակը ցույց է տալիս ճիշտ պատասխանը։
                  </div>
                </div>

                {/* The 4 Questions on this Ticket */}
                <div className="space-y-6">
                  {currentTicket.questions.map((q, idx) => (
                    <ModernQuestionCard
                      key={q.id}
                      question={q}
                      indexNumber={idx + 1}
                      isArmenianVisible={!!visibleArmenian[q.id]}
                      isAnswerVisible={!!visibleAnswers[q.id]}
                      isMastered={masteredIds.includes(q.id)}
                      onToggleArmenian={() => toggleArmenian(q.id)}
                      onToggleAnswer={() => toggleAnswer(q.id)}
                      onToggleMastered={() => toggleMastered(q.id)}
                      onSpeakSpanish={() => speakSpanish(q.questionEs)}
                    />
                  ))}
                </div>

                {/* Ticket Footer Navigation */}
                <div className="mt-9 pt-6 border-t-2 border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    onClick={() =>
                      handleSelectTicket(
                        currentTicket.ticketNumber > 1 ? currentTicket.ticketNumber - 1 : 20
                      )
                    }
                    className="w-full sm:w-auto px-5 py-3 text-base font-bold text-blue-900 bg-sky-50 hover:bg-sky-100 rounded-xl transition-colors border border-sky-200 flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Նախորդ տոմսը ({currentTicket.ticketNumber > 1 ? currentTicket.ticketNumber - 1 : 20})</span>
                  </button>

                  <button
                    onClick={handlePullRandomTicket}
                    className="w-full sm:w-auto px-6 py-3 text-base font-extrabold text-blue-950 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 border border-amber-300"
                  >
                    <Shuffle className="w-4 h-4" />
                    <span>Քաշել նոր տոմս</span>
                  </button>

                  <button
                    onClick={() =>
                      handleSelectTicket(
                        currentTicket.ticketNumber < 20 ? currentTicket.ticketNumber + 1 : 1
                      )
                    }
                    className="w-full sm:w-auto px-5 py-3 text-base font-bold text-blue-900 bg-sky-50 hover:bg-sky-100 rounded-xl transition-colors border border-sky-200 flex items-center justify-center gap-2"
                  >
                    <span>Հաջորդ տոմսը ({currentTicket.ticketNumber < 20 ? currentTicket.ticketNumber + 1 : 1})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===================== TAB 2: ALL 80 QUESTIONS WITH PER-THEME TICKET PULLING ===================== */}
        {activeTab === 'all' && (
          <div className="space-y-6">
            {/* Top Overview: 4 Distinct Topic Cards with Individual "Քաշել տոմս" Buttons */}
            <div className="bg-white border-2 border-sky-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-orange-600 mb-1">
                    <Sparkles className="w-4 h-4 text-orange-500" />
                    <span>4 ԹԵՄԱՆԵՐ · ԱՌԱՆՁԻՆ ՏՈՄՍԵՐԻ ՔԱՇՈՒՄ</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950">
                    Բոլոր 80 քննական հարցերը (ըստ 4 թեմաների)
                  </h2>
                  <p className="text-sm sm:text-base text-sky-800 font-medium mt-1">
                    Յուրաքանչյուր թեմայի համար կարող եք առանձին քաշել պատահական տոմս՝ տվյալ բաժնի 20 հարցերից:
                  </p>
                </div>

                {/* Search bar */}
                <div className="relative w-full md:w-80 shrink-0">
                  <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-sky-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Որոնել բոլոր 80 հարցերում..."
                    className="w-full pl-11 pr-10 py-3 text-base bg-sky-50/70 border-2 border-sky-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 placeholder:text-slate-500 transition-all font-medium"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* 4 Cards: Each represents 1 kind/theme with its own "Քաշել տոմս այս թեմայից" button */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {THEMES.map(theme => {
                  const themeMastered = ALL_QUESTIONS.filter(
                    q => q.themeId === theme.id && masteredIds.includes(q.id)
                  ).length;
                  const isCurrentDrawnTheme = drawnThemeQuestion?.themeId === theme.id;

                  return (
                    <div
                      key={theme.id}
                      className={`rounded-2xl p-5 border-2 transition-all flex flex-col justify-between ${
                        isCurrentDrawnTheme
                          ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-400 shadow-md ring-2 ring-amber-300'
                          : 'bg-sky-50/60 hover:bg-sky-50 border-sky-200 hover:border-sky-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-900 bg-sky-200/80 px-2.5 py-1 rounded-lg">
                            Թեմա {theme.id} (20 հարց)
                          </span>
                          <span className="text-xs font-bold text-sky-800">
                            Յուրացված՝ {themeMastered}/20
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-extrabold text-blue-950 leading-snug">
                          {theme.titleEs}
                        </h3>
                        <p className="text-sm sm:text-base font-semibold text-sky-900 mt-0.5">
                          {theme.titleHy}
                        </p>
                      </div>

                      {/* Action buttons for this specific theme */}
                      <div className="mt-4 pt-3 border-t border-sky-200/60 flex items-center justify-between gap-3">
                        <button
                          onClick={() => {
                            setSelectedThemeFilter(theme.id);
                          }}
                          className={`text-xs sm:text-sm font-bold underline underline-offset-4 ${
                            selectedThemeFilter === theme.id
                              ? 'text-blue-950 font-extrabold'
                              : 'text-sky-700 hover:text-blue-950'
                          }`}
                        >
                          Դիտել 20 հարցերը →
                        </button>

                        <button
                          onClick={() => handlePullTicketForTheme(theme.id)}
                          className="px-4 py-2.5 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-blue-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center gap-2 border border-amber-300 active:scale-95 shrink-0"
                          title={`Քաշել պատահական հարց՝ ${theme.titleEs} թեմայից`}
                        >
                          <Dices className="w-4 h-4" />
                          <span>Քաշել տոմս այս թեմայից</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Filter bar for all 80 list */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-sky-100 text-sm">
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <button
                    onClick={() => setSelectedThemeFilter('all')}
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
                      selectedThemeFilter === 'all'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-blue-900 hover:text-blue-700 bg-sky-50 border border-sky-200'
                    }`}
                  >
                    Բոլոր թեմաները (80)
                  </button>
                  {THEMES.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedThemeFilter(t.id)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
                        selectedThemeFilter === t.id
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-blue-900 hover:text-blue-700 bg-sky-50 border border-sky-200'
                      }`}
                    >
                      {t.id}. {t.titleEs}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sky-900 font-bold text-xs">Կարգավիճակ՝</span>
                  <button
                    onClick={() => setMasteredFilter('all')}
                    className={`px-2.5 py-1 rounded-lg font-semibold text-xs ${
                      masteredFilter === 'all'
                        ? 'bg-blue-900 text-white'
                        : 'text-sky-900 bg-sky-50 hover:bg-sky-100'
                    }`}
                  >
                    Բոլորը ({ALL_QUESTIONS.length})
                  </button>
                  <button
                    onClick={() => setMasteredFilter('mastered')}
                    className={`px-2.5 py-1 rounded-lg font-semibold text-xs ${
                      masteredFilter === 'mastered'
                        ? 'bg-emerald-600 text-white'
                        : 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100'
                    }`}
                  >
                    Յուրացված ({masteredIds.length})
                  </button>
                  <button
                    onClick={() => setMasteredFilter('unmastered')}
                    className={`px-2.5 py-1 rounded-lg font-semibold text-xs ${
                      masteredFilter === 'unmastered'
                        ? 'bg-orange-500 text-white'
                        : 'text-orange-800 bg-orange-50 hover:bg-orange-100'
                    }`}
                  >
                    Սովորելու ({80 - masteredIds.length})
                  </button>
                </div>
              </div>
            </div>

            {/* ================= SPOTLIGHT: TICKET DRAWN FOR SPECIFIC THEME ================= */}
            {drawnThemeQuestion && (
              <div className="bg-gradient-to-br from-amber-50 via-white to-sky-50 border-3 border-amber-400 rounded-3xl p-6 sm:p-9 shadow-lg relative animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-amber-200 pb-5 mb-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-orange-600">
                      <GraduationCap className="w-5 h-5 text-orange-500" />
                      <span>ՔԱՇՎԱԾ ՏՈՄՍ · ԹԵՄԱ {drawnThemeQuestion.themeId}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-950 mt-1">
                      {drawnThemeQuestion.question.themeTitleEs} (Հարց № {drawnThemeQuestion.question.numberInTheme} / 20)
                    </h3>
                    <p className="text-base text-sky-900 font-semibold mt-0.5">
                      {drawnThemeQuestion.question.themeTitleHy}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <button
                      onClick={() => handlePullTicketForTheme(drawnThemeQuestion.themeId)}
                      className="px-4 sm:px-5 py-2.5 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-blue-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center gap-2 border border-amber-300"
                    >
                      <Dices className="w-4 h-4" />
                      <span>Քաշել նոր տոմս այս թեմայից</span>
                    </button>
                    <button
                      onClick={() => setDrawnThemeQuestion(null)}
                      className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
                      title="Փակել քաշված տոմսը"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Instructions banner */}
                <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-4 mb-6 text-sm sm:text-base text-sky-950 flex items-start gap-3">
                  <span className="text-xl shrink-0">💡</span>
                  <div className="leading-relaxed">
                    Սեղմեք <strong>իսպաներեն հարցի վրա</strong>՝ բացելու համար հայերեն թարգմանությունը (🇦🇲)։
                    Կողքի <strong>«Պատասխան · Sí»</strong> կոճակը ցույց է տալիս ճիշտ պատասխանը։
                  </div>
                </div>

                {/* Question Display Card */}
                <ModernQuestionCard
                  question={drawnThemeQuestion.question}
                  indexNumber={drawnThemeQuestion.question.numberInTheme}
                  isArmenianVisible={!!visibleArmenian[drawnThemeQuestion.question.id]}
                  isAnswerVisible={!!visibleAnswers[drawnThemeQuestion.question.id]}
                  isMastered={masteredIds.includes(drawnThemeQuestion.question.id)}
                  onToggleArmenian={() => toggleArmenian(drawnThemeQuestion.question.id)}
                  onToggleAnswer={() => toggleAnswer(drawnThemeQuestion.question.id)}
                  onToggleMastered={() => toggleMastered(drawnThemeQuestion.question.id)}
                  onSpeakSpanish={() => speakSpanish(drawnThemeQuestion.question.questionEs)}
                  showThemeBadge={false}
                />
              </div>
            )}

            {/* List of Questions */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm px-1">
                <span className="font-extrabold text-blue-950">
                  Ցուցադրված է {filteredQuestions.length} հարց
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const allVisible: Record<number, boolean> = {};
                      filteredQuestions.forEach(q => (allVisible[q.id] = true));
                      setVisibleArmenian(prev => ({ ...prev, ...allVisible }));
                    }}
                    className="text-blue-700 hover:text-blue-900 font-bold underline underline-offset-4 text-xs sm:text-sm"
                  >
                    Բացել բոլոր թարգմանությունները
                  </button>
                  <span className="text-sky-300">·</span>
                  <button
                    onClick={() => {
                      const allVisible: Record<number, boolean> = {};
                      filteredQuestions.forEach(q => (allVisible[q.id] = true));
                      setVisibleAnswers(prev => ({ ...prev, ...allVisible }));
                    }}
                    className="text-orange-600 hover:text-orange-800 font-bold underline underline-offset-4 text-xs sm:text-sm"
                  >
                    Բացել բոլոր պատասխանները
                  </button>
                </div>
              </div>

              {filteredQuestions.length === 0 ? (
                <div className="bg-white border-2 border-sky-100 rounded-2xl p-12 text-center">
                  <HelpCircle className="w-12 h-12 text-sky-300 mx-auto mb-3" />
                  <h3 className="font-bold text-xl text-blue-950">Ոչ մի հարց չգտնվեց</h3>
                  <p className="text-base text-sky-800 mt-1">
                    Փորձեք փոխել որոնման բառը կամ ֆիլտրերը
                  </p>
                </div>
              ) : (
                filteredQuestions.map((q, idx) => (
                  <ModernQuestionCard
                    key={q.id}
                    question={q}
                    indexNumber={q.numberInTheme}
                    isArmenianVisible={!!visibleArmenian[q.id]}
                    isAnswerVisible={!!visibleAnswers[q.id]}
                    isMastered={masteredIds.includes(q.id)}
                    onToggleArmenian={() => toggleArmenian(q.id)}
                    onToggleAnswer={() => toggleAnswer(q.id)}
                    onToggleMastered={() => toggleMastered(q.id)}
                    onSpeakSpanish={() => speakSpanish(q.questionEs)}
                    showThemeBadge={selectedThemeFilter === 'all'}
                  />
                ))
              )}
            </div>
          </div>
        )}

        {/* ===================== TAB 3: FLASHCARDS ===================== */}
        {activeTab === 'flashcards' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950">
                  Ինքնաստուգման քարտեր
                </h2>
                <span className="text-sm font-semibold text-sky-800">
                  Հարց {flashcardIndex + 1} / {flashcardDeck.length}
                </span>
              </div>

              {/* Theme selector */}
              <select
                value={flashcardTheme}
                onChange={e => {
                  const val = e.target.value === 'all' ? 'all' : Number(e.target.value);
                  setFlashcardTheme(val as any);
                  setFlashcardIndex(0);
                  setFlashcardFlipped(false);
                }}
                className="text-sm font-bold bg-white border-2 border-sky-200 rounded-xl px-4 py-2 text-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              >
                <option value="all">Բոլոր թեմաները (80)</option>
                {THEMES.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.id}. {t.titleEs}
                  </option>
                ))}
              </select>
            </div>

            {/* Flashcard Component */}
            <div className="bg-white border-2 border-sky-200 rounded-3xl p-6 sm:p-9 min-h-[380px] flex flex-col justify-between ticket-shadow">
              <div className="flex items-center justify-between text-xs sm:text-sm text-sky-800 border-b border-sky-100 pb-4">
                <span className="font-extrabold text-orange-600">
                  Թեմա {currentFlashcard.themeId} · {currentFlashcard.themeTitleEs}
                </span>
                <span className="tabular-nums font-mono font-bold">
                  #{currentFlashcard.id} (Հարց {currentFlashcard.numberInTheme}/20)
                </span>
              </div>

              <div className="my-auto py-6 space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-900 flex items-center gap-1.5">
                      <span>🇪🇸 Español (Սեղմեք՝ թարգմանելու համար)</span>
                    </span>
                    <button
                      onClick={() => speakSpanish(currentFlashcard.questionEs)}
                      className="p-1.5 text-sky-500 hover:text-blue-700 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors"
                      title="Լսել իսպաներեն արտասանությունը"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                  <button
                    onClick={() => toggleArmenian(currentFlashcard.id)}
                    className="w-full text-left p-4 sm:p-5 bg-gradient-to-r from-amber-50 to-orange-50/60 hover:from-amber-100 hover:to-orange-100 border-2 border-amber-200 rounded-2xl transition-all"
                  >
                    <p className="text-xl sm:text-2xl font-extrabold text-blue-950 leading-snug">
                      {currentFlashcard.questionEs}
                    </p>
                    <span className="text-xs sm:text-sm text-orange-700 font-bold mt-2 inline-block">
                      {visibleArmenian[currentFlashcard.id]
                        ? '▲ Թաքցնել հայերենը'
                        : '▼ Սեղմեք՝ տեսնելու հայերեն թարգմանությունը (🇦🇲)'}
                    </span>
                  </button>
                </div>

                {visibleArmenian[currentFlashcard.id] && (
                  <div className="p-4 bg-sky-50 border-2 border-sky-200 rounded-2xl animate-fadeIn">
                    <span className="text-xs font-bold text-sky-800 uppercase tracking-wider block mb-1">
                      🇦🇲 Հայերեն թարգմանություն՝
                    </span>
                    <p className="text-lg sm:text-xl font-bold text-blue-950 leading-relaxed">
                      {currentFlashcard.questionHy}
                    </p>
                  </div>
                )}

                {flashcardFlipped ? (
                  <div className="p-5 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100/60 border-2 border-orange-300 rounded-2xl animate-fadeIn space-y-3">
                    <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-orange-900 block">
                      ✅ Ճիշտ պատասխանը (Respuesta oficial):
                    </span>
                    <div className="text-base sm:text-lg font-bold text-blue-950 flex items-start gap-2.5">
                      <span className="text-lg shrink-0">🇪🇸</span>
                      <span className="flex-1">{currentFlashcard.answerEs}</span>
                      <button
                        onClick={() => speakSpanish(currentFlashcard.answerEs)}
                        className="p-1 text-sky-600 hover:text-blue-800"
                        title="Լսել պատասխանը"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="text-base sm:text-lg text-slate-800 flex items-start gap-2.5 pt-2 border-t border-orange-200 font-semibold">
                      <span className="text-lg shrink-0">🇦🇲</span>
                      <span className="flex-1">{currentFlashcard.answerHy}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center pt-2">
                    <button
                      onClick={() => setFlashcardFlipped(true)}
                      className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-blue-950 font-extrabold text-base sm:text-lg rounded-xl shadow-md transition-all border border-amber-300"
                    >
                      Պատասխան · Sí (Ցույց տալ պատասխանը)
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-sky-100">
                <button
                  onClick={prevFlashcard}
                  className="px-5 py-2.5 text-base font-bold text-blue-900 hover:bg-sky-50 rounded-xl transition-colors border border-sky-200"
                >
                  ← Նախորդը
                </button>

                <button
                  onClick={() => toggleMastered(currentFlashcard.id)}
                  className={`px-4 py-2.5 text-sm sm:text-base font-bold rounded-xl flex items-center gap-2 transition-all ${
                    masteredIds.includes(currentFlashcard.id)
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-sky-100 text-blue-900 hover:bg-sky-200 border border-sky-300'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>
                    {masteredIds.includes(currentFlashcard.id) ? 'Յուրացված է' : 'Նշել իմացած'}
                  </span>
                </button>

                <button
                  onClick={nextFlashcard}
                  className="px-5 py-2.5 text-base font-bold text-blue-900 hover:bg-sky-50 rounded-xl transition-colors border border-sky-200"
                >
                  Հաջորդը →
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-sky-100 bg-white py-6 text-center text-xs sm:text-sm text-sky-800">
        <div className="max-w-6xl mx-auto px-4 space-y-1 font-medium">
          <p className="font-bold text-blue-950 text-sm sm:text-base">
            Examen Oficial de Lengua Española · Իսպաներենի Քննական Համակարգ
          </p>
          <p className="text-sky-700">
            80 քննական հարց հայերեն թարգմանությամբ և պատասխաններով · 20 տոմս (4 թեմաներ)
          </p>
        </div>
      </footer>
    </div>
  );
}

/**
 * Modern Question Card Component
 * Highlights:
 * 1. Spanish question displayed in large bold font
 * 2. Clicking on Spanish question toggles Armenian translation
 * 3. Beside it: button "Պատասխան · Sí" with bright yellow/orange/blue accents
 * 4. Larger typography for optimal readability
 */
interface ModernQuestionCardProps {
  question: QuestionItem;
  indexNumber: number;
  isArmenianVisible: boolean;
  isAnswerVisible: boolean;
  isMastered: boolean;
  onToggleArmenian: () => void;
  onToggleAnswer: () => void;
  onToggleMastered: () => void;
  onSpeakSpanish: () => void;
  showThemeBadge?: boolean;
}

function ModernQuestionCard({
  question,
  indexNumber,
  isArmenianVisible,
  isAnswerVisible,
  isMastered,
  onToggleArmenian,
  onToggleAnswer,
  onToggleMastered,
  onSpeakSpanish,
  showThemeBadge = true
}: ModernQuestionCardProps) {
  return (
    <div
      className={`border-2 rounded-2xl p-5 sm:p-7 transition-all ${
        isMastered
          ? 'bg-emerald-50/30 border-emerald-300'
          : 'bg-white border-sky-100 hover:border-sky-300 shadow-sm'
      }`}
    >
      {/* Top Header of Question Card */}
      <div className="flex items-center justify-between gap-3 mb-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="font-extrabold text-blue-950 bg-sky-100 px-3 py-1 rounded-lg text-xs sm:text-sm border border-sky-200">
            Հարց {indexNumber}
          </span>
          {showThemeBadge && (
            <span className="text-sky-800 font-bold">
              Թեմա {question.themeId} · {question.themeTitleEs} ({question.themeTitleHy})
            </span>
          )}
        </div>

        {/* Mastered toggle */}
        <button
          onClick={onToggleMastered}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-colors ${
            isMastered
              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
              : 'text-sky-700 hover:text-blue-950 hover:bg-sky-100 border border-sky-200'
          }`}
          title={isMastered ? 'Հանել իմացածների ցանկից' : 'Նշել որպես յուրացված'}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{isMastered ? 'Գիտեմ' : 'Նշել իմացած'}</span>
        </button>
      </div>

      {/* Primary Interaction Area: Spanish Question (Clickable to reveal Armenian) + Answer button beside it */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pt-1">
        {/* Spanish Question Area - Click to open Armenian translation */}
        <div
          onClick={onToggleArmenian}
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onToggleArmenian();
            }
          }}
          className="flex-1 cursor-pointer group rounded-xl p-3.5 -m-1 hover:bg-gradient-to-r hover:from-sky-50 hover:to-amber-50/60 border border-transparent hover:border-sky-300 transition-all text-left"
          title="Սեղմեք՝ հայերեն թարգմանությունը (🇦🇲) տեսնելու համար"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl sm:text-3xl shrink-0 select-none">🇪🇸</span>
            <div className="flex-1">
              <p className="text-xl sm:text-2xl font-extrabold text-blue-950 leading-snug group-hover:text-blue-800">
                {question.questionEs}
              </p>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-orange-600 font-bold mt-2">
                <span>
                  {isArmenianVisible
                    ? '▲ Թաքցնել թարգմանությունը'
                    : '▼ Սեղմեք՝ բացելու թարգմանությունը (🇦🇲 Հայերեն)'}
                </span>
              </div>
            </div>
            {/* Audio button */}
            <button
              onClick={e => {
                e.stopPropagation();
                onSpeakSpanish();
              }}
              className="p-2 text-sky-500 hover:text-blue-700 bg-sky-50 hover:bg-sky-100 rounded-xl transition-colors shrink-0"
              title="Լսել իսպաներեն արտասանությունը"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Answer Button beside it: "Պատասխան · Sí" */}
        <div className="shrink-0 flex items-center gap-2 self-start sm:self-center pt-1 sm:pt-0">
          <button
            onClick={onToggleAnswer}
            className={`cursor-pointer px-5 sm:px-6 py-3.5 rounded-xl text-sm sm:text-base font-extrabold transition-all shadow-md flex items-center gap-2 border ${
              isAnswerVisible
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-400'
                : 'bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-blue-950 border-amber-300 active:scale-95'
            }`}
            title="Տեսնել ճիշտ պատասխանը"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Պատասխան · Sí</span>
            {isAnswerVisible ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Armenian Translation Section (Revealed when Spanish question is clicked) */}
      {isArmenianVisible && (
        <div className="mt-4 pt-4 border-t-2 border-sky-100 flex items-start gap-3 text-slate-800 animate-fadeIn bg-sky-50/70 p-4 rounded-xl border border-sky-200">
          <span className="text-xl sm:text-2xl shrink-0 select-none">🇦🇲</span>
          <div className="flex-1">
            <span className="text-xs font-extrabold text-sky-800 uppercase tracking-wider block mb-1">
              Հայերեն թարգմանություն՝
            </span>
            <p className="text-lg sm:text-xl font-bold text-blue-950 leading-relaxed">
              {question.questionHy}
            </p>
          </div>
        </div>
      )}

      {/* Answer Section (Revealed when "Պատասխան · Sí" is clicked) */}
      {isAnswerVisible && (
        <div className="mt-4 p-5 sm:p-6 bg-gradient-to-br from-amber-50 via-orange-50/70 to-sky-50 border-2 border-amber-300 rounded-2xl space-y-3.5 animate-fadeIn shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-orange-950 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
              <span>Ճիշտ պատասխանը (Respuesta oficial)</span>
            </span>
            <button
              onClick={onToggleAnswer}
              className="text-xs sm:text-sm font-bold text-orange-700 hover:text-orange-950 underline"
            >
              Փակել
            </button>
          </div>

          {/* Spanish Answer */}
          <div className="flex items-start gap-3 text-blue-950">
            <span className="text-lg shrink-0 select-none">🇪🇸</span>
            <p className="text-base sm:text-lg font-bold leading-relaxed flex-1">
              {question.answerEs}
            </p>
          </div>

          {/* Armenian Answer */}
          <div className="flex items-start gap-3 text-slate-900 pt-3 border-t border-amber-200">
            <span className="text-lg shrink-0 select-none">🇦🇲</span>
            <p className="text-base sm:text-lg font-semibold leading-relaxed flex-1 text-slate-800">
              {question.answerHy}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
