import { useState, useEffect, useRef } from 'react';
import { usePet, getLevel, getNextLevel, getMoodConfig, getMessage, getGreeting, calculateMood } from '../store/PetStore';
import { useData } from '../store/DataContext';
import { useLang } from '../i18n';
import { MessageCircle, Zap, Star } from 'lucide-react';

const B = import.meta.env.BASE_URL;
const ACTION_VIDEOS = {
  feed: B + 'Pet-1-feed.mp4',
  hi: B + 'Pet-1-Hi.mp4',
};

export default function PetWidget() {
  const { pet, dispatch } = usePet();
  const { children } = useData();
  const { lang } = useLang();
  const [showMessage, setShowMessage] = useState(null);
  const [activeAction, setActiveAction] = useState(null); // null | 'feed' | 'hi'
  const moodVideoRef = useRef(null);
  const actionVideoRef = useRef(null);

  useEffect(() => {
    const mood = calculateMood(children);
    dispatch({ type: 'SET_MOOD', payload: mood });
  }, [children, dispatch]);

  const level = getLevel(pet.xp);
  const nextLvl = getNextLevel(pet.xp);
  const moodCfg = getMoodConfig(pet.mood);
  const xpInLevel = pet.xp - level.xpNeeded;
  const xpToNext = nextLvl.xpNeeded - level.xpNeeded;
  const xpPct = xpToNext > 0 ? Math.min((xpInLevel / xpToNext) * 100, 100) : 100;

  const statusMsg = getMessage(pet.mood, lang);
  const moodLabel = moodCfg.label[lang] || moodCfg.label.en;
  const levelName = level.name[lang] || level.name.en;
  const isPlaying = activeAction !== null;

  // Play action video when activeAction changes
  useEffect(() => {
    if (activeAction && actionVideoRef.current) {
      actionVideoRef.current.src = ACTION_VIDEOS[activeAction];
      actionVideoRef.current.currentTime = 0;
      actionVideoRef.current.play().catch(() => {});
    }
  }, [activeAction]);

  // Resume mood video when action ends
  useEffect(() => {
    if (!activeAction && moodVideoRef.current) {
      moodVideoRef.current.play().catch(() => {});
    }
  }, [activeAction]);

  const handleActionEnd = () => {
    // If celebrating check-in, play Hi a second time
    if (celebrateCount.current > 0) {
      celebrateCount.current--;
      setActiveAction('hi');
      return;
    }
    setActiveAction(null);
  };

  // Listen for check-in celebration events (play Hi twice)
  const celebrateCount = useRef(0);
  useEffect(() => {
    const handler = () => {
      celebrateCount.current = 1; // will play once more after first ends
      setShowMessage(lang === 'zh' ? '🎉 小哈为你欢呼！打卡成功！' : '🎉 Hachi is cheering for you! Great job!');
      setActiveAction('hi');
      setTimeout(() => setShowMessage(null), 5000);
    };
    window.addEventListener('pet-checkin-celebrate', handler);
    return () => window.removeEventListener('pet-checkin-celebrate', handler);
  }, [lang]);

  const handleGreet = () => {
    if (isPlaying) return;
    dispatch({ type: 'GREET' });
    setShowMessage(getGreeting(lang));
    setActiveAction('hi');
    setTimeout(() => setShowMessage(null), 4000);
  };

  const handleFeed = () => {
    if (isPlaying) return;
    dispatch({ type: 'FEED' });
    setShowMessage(lang === 'zh' ? '小哈收到了能量星！+3 XP ⭐' : 'Hachi got an energy star! +3 XP ⭐');
    setActiveAction('feed');
    setTimeout(() => setShowMessage(null), 3000);
  };

  const handleAdvice = () => {
    setShowMessage(statusMsg);
    setTimeout(() => setShowMessage(null), 5000);
  };

  const actionBadge = activeAction === 'feed' ? '⭐ Yum!' : activeAction === 'hi' ? '👋 Hi!' : null;

  return (
    <div className="p-3">
      <div className="bg-navy-light/50 rounded-xl p-3 border border-cream-light/10">
        {/* Pet Video */}
        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-navy-light mb-2">
          {/* Mood loop video */}
          <video ref={moodVideoRef} src={moodCfg.video}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
            loop muted autoPlay playsInline />
          {/* Action one-shot video */}
          <video ref={actionVideoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
            muted playsInline onEnded={handleActionEnd} />

          <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-mustard text-navy rounded text-[8px] font-black z-10">
            Lv.{level.level}
          </div>
          <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-navy/80 text-cream-light rounded text-[8px] font-bold z-10">
            {actionBadge || `${moodCfg.emoji} ${moodLabel}`}
          </div>
        </div>

        {/* Name + Level */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-bold text-cream-light">{lang === 'zh' ? pet.nameZh : pet.name}</span>
          <span className="text-[9px] text-cream-light/60">{levelName}</span>
        </div>

        {/* XP Bar */}
        <div className="mb-2">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[8px] text-cream-light/50 font-semibold">XP</span>
            <span className="text-[8px] text-cream-light/50">{pet.xp}/{nextLvl.xpNeeded}</span>
          </div>
          <div className="w-full h-1.5 bg-navy-light rounded-full overflow-hidden">
            <div className="h-full bg-mustard rounded-full transition-all duration-500" style={{ width: `${xpPct}%` }} />
          </div>
        </div>

        {/* Message bubble */}
        {showMessage && (
          <div className="mb-2 p-2 bg-cream-light/10 rounded-lg border border-cream-light/10">
            <p className="text-[9px] text-cream-light leading-relaxed">{showMessage}</p>
          </div>
        )}

        {/* Status message */}
        {!showMessage && (
          <p className="text-[9px] text-cream-light/60 leading-relaxed mb-2 line-clamp-2">{statusMsg}</p>
        )}

        {/* Action buttons */}
        <div className="grid grid-cols-3 gap-1">
          <button onClick={handleGreet} disabled={isPlaying}
            className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg transition-colors group ${isPlaying ? 'opacity-50 cursor-wait' : 'bg-navy-light/60 hover:bg-teal/30'}`}>
            <MessageCircle className="w-3.5 h-3.5 text-teal-light group-hover:text-teal" />
            <span className="text-[7px] text-cream-light/60 group-hover:text-cream-light">{lang === 'zh' ? '打招呼' : 'Hi!'}</span>
          </button>
          <button onClick={handleFeed} disabled={isPlaying}
            className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg transition-colors group ${isPlaying ? 'opacity-50 cursor-wait' : 'bg-navy-light/60 hover:bg-mustard/30'}`}>
            <Star className="w-3.5 h-3.5 text-mustard group-hover:text-mustard" />
            <span className="text-[7px] text-cream-light/60 group-hover:text-cream-light">{lang === 'zh' ? '能量星' : 'Feed'}</span>
          </button>
          <button onClick={handleAdvice}
            className="flex flex-col items-center gap-0.5 p-1.5 rounded-lg bg-navy-light/60 hover:bg-coral/30 transition-colors group">
            <Zap className="w-3.5 h-3.5 text-coral group-hover:text-coral" />
            <span className="text-[7px] text-cream-light/60 group-hover:text-cream-light">{lang === 'zh' ? '建议' : 'Tip'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
