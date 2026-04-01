import { useState, useRef } from 'react';
import { X, Upload, CheckCircle, Camera, FileText } from 'lucide-react';
import { useTasks } from '../store/TaskStore';
import { usePet } from '../store/PetStore';
import { useLang } from '../i18n';

export default function CheckInModal({ task, onClose }) {
  const { dispatch: taskDispatch } = useTasks();
  const { dispatch: petDispatch } = usePet();
  const { lang } = useLang();
  const [proof, setProof] = useState(null);
  const [proofName, setProofName] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProofName(file.name);
      // Store as data URL for localStorage persistence
      const reader = new FileReader();
      reader.onload = () => setProof(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // Save check-in
    taskDispatch({
      type: 'CHECK_IN',
      payload: {
        taskId: task.id,
        proof: { fileName: proofName, note, dataUrl: proof, timestamp: new Date().toISOString() },
      },
    });

    // Give Pet XP
    petDispatch({ type: 'ADD_XP', payload: 5 });

    // Trigger Pet Hi animation twice via custom event
    window.dispatchEvent(new CustomEvent('pet-checkin-celebrate'));

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-navy/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-cream-light rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
          <div className="w-16 h-16 bg-teal rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-cream-light" />
          </div>
          <h3 className="text-lg font-black text-navy font-[family-name:var(--font-display)] mb-2">
            {lang === 'zh' ? '打卡成功！🎉' : 'Check-in Complete! 🎉'}
          </h3>
          <p className="text-sm text-brown-light mb-1">
            {lang === 'zh' ? `${task.childName} 完成了今日任务` : `${task.childName} completed today's task`}
          </p>
          <p className="text-[12px] text-teal font-bold mb-4">+5 XP → Hachi {lang === 'zh' ? '很开心！' : 'is happy!'} 🐕</p>
          <button onClick={onClose} className="retro-btn px-6 py-2 bg-teal text-cream-light border-teal text-sm">
            {lang === 'zh' ? '关闭' : 'Close'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-navy/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-cream-light rounded-2xl p-6 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-navy font-[family-name:var(--font-display)]">
            {lang === 'zh' ? '📝 任务打卡' : '📝 Task Check-in'}
          </h3>
          <button onClick={onClose} className="w-7 h-7 rounded-lg bg-cream-dark/50 flex items-center justify-center hover:bg-cream-dark">
            <X className="w-4 h-4 text-brown" />
          </button>
        </div>

        {/* Task Info */}
        <div className="p-3 bg-cream rounded-xl border border-cream-dark mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm">{task.childName === 'Michael' ? '👦' : '🧒'}</span>
            <span className="text-[12px] font-bold text-navy">{task.childName}</span>
            {task.priority === 'High' && <span className="text-[7px] px-1.5 py-0.5 bg-coral text-cream-light rounded font-bold">HIGH</span>}
          </div>
          <p className="text-[13px] text-navy font-semibold">{task.title}</p>
          <p className="text-[11px] text-brown-light mt-0.5">{task.timeBudget}</p>
        </div>

        {/* Upload Proof */}
        <div className="mb-4">
          <p className="text-[11px] text-navy font-bold uppercase tracking-wider mb-2">
            {lang === 'zh' ? '上传打卡证明（可选）' : 'Upload Proof (Optional)'}
          </p>
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-cream-dark rounded-xl p-4 text-center cursor-pointer hover:border-teal hover:bg-teal-light/20 transition-colors"
          >
            <input ref={fileRef} type="file" accept="image/*,.pdf,.txt,.doc,.docx" className="hidden" onChange={handleFileChange} />
            {proofName ? (
              <div className="flex items-center justify-center gap-2">
                <FileText className="w-5 h-5 text-teal" />
                <span className="text-[12px] text-navy font-semibold">{proofName}</span>
                <CheckCircle className="w-4 h-4 text-teal" />
              </div>
            ) : (
              <>
                <Camera className="w-8 h-8 text-cream-dark mx-auto mb-1" />
                <p className="text-[11px] text-brown-light">{lang === 'zh' ? '拍照、截图或上传文件' : 'Photo, screenshot, or file'}</p>
              </>
            )}
          </div>
        </div>

        {/* Note */}
        <div className="mb-4">
          <p className="text-[11px] text-navy font-bold uppercase tracking-wider mb-1">
            {lang === 'zh' ? '备注（可选）' : 'Note (Optional)'}
          </p>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            className="w-full p-2 text-sm border-2 border-cream-dark rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-teal text-navy resize-none"
            rows={2}
            placeholder={lang === 'zh' ? '今天学了什么？感觉如何？' : "What did you learn? How did it go?"}
          />
        </div>

        {/* Submit */}
        <button onClick={handleSubmit}
          className="retro-btn w-full py-2.5 bg-teal text-cream-light border-teal text-sm flex items-center justify-center gap-2">
          <CheckCircle className="w-4 h-4" />
          {lang === 'zh' ? '完成打卡' : 'Complete Check-in'}
        </button>

        <p className="text-[9px] text-brown-light text-center mt-2">
          {lang === 'zh' ? '打卡后 Hachi 会获得 +5 XP 🐕' : 'Hachi gets +5 XP after check-in 🐕'}
        </p>
      </div>
    </div>
  );
}
