import React, { useState, useRef, useEffect, useCallback } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import ContentBlock from './components/ContentBlock.tsx';
import Footer from './components/Footer.tsx';
import MusicPlayer from './components/MusicPlayer.tsx';
import Gemini from './components/Gemini.tsx';
import { SECTIONS } from './constants.ts';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0]?.id || '');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const headerRef = useRef<HTMLElement>(null);

  const handleNavClick = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection(SECTIONS[0]?.id || '');
      return;
    }
    const section = sectionRefs.current[sectionId];
    if (section && headerRef.current) {
      const headerHeight = headerRef.current.offsetHeight;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
    }
  };
  
  const handleScroll = useCallback(() => {
    if (!headerRef.current) return;
    
    const headerHeight = headerRef.current.offsetHeight;
    const scrollThreshold = window.scrollY + headerHeight + 150; 

    let currentSectionId = '';

    for (let i = SECTIONS.length - 1; i >= 0; i--) {
      const section = SECTIONS[i];
      const el = sectionRefs.current[section.id];
      if (el && el.offsetTop <= scrollThreshold) {
        currentSectionId = section.id;
        break;
      }
    }
    
    if (currentSectionId) {
        setActiveSection(currentSectionId);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Set initial active section on load
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const sectionContent: Record<string, React.ReactNode> = {
    'our-story': (
      <>
        <p>지난 7월 16일 수술 이후 벌써 시간이 꽤 흘렀네. 힙업 수술이랑 근육 단축술 회복할 때도 정말 씩씩하게 잘 해냈던 너이기에, 이번 가슴 성형 회복 여정 역시 멋지게 해낼 거라 믿어 의심치 않아. 정말 고생 많았어.</p>
        <p>이 웹사이트는 너의 빛나는 회복 여정에 든든한 나침반이 되어주길 바라는 마음으로, 내가 너를 위해 모든 정성과 사랑을 담아 준비한 거야. ✨ 너의 '마음 확장'의 멋진 여정을 진심으로 존경하고 온 마음으로 응원한단다.</p>
      </>
    ),
    'recovery-guide': (
      <div className="space-y-10">
        <div className="p-6 bg-rose-50/50 rounded-xl shadow-inner">
          <h3 className="text-2xl font-bold text-rose-700 mb-4">힙업 수술 후에는 이렇게 관리해줘 ❤️</h3>
          <ul className="list-none space-y-2 text-rose-900">
            <li className="flex items-start"><span className="mr-3 mt-1">💖</span><strong>초기 안정기 (0-2주):</strong> 앉는 자세 제한, 옆으로 누워 휴식, 압박복 24시간 착용.</li>
            <li className="flex items-start"><span className="mr-3 mt-1">💖</span><strong>점진적 활동기 (2-6주):</strong> 가벼운 산책 시작, 흉터 관리 시작.</li>
            <li className="flex items-start"><span className="mr-3 mt-1">💖</span><strong>운동 준비기 (6주-3개월):</strong> 둔근 강화 운동 점진적 시작.</li>
          </ul>
        </div>
        <div className="p-6 bg-pink-50/50 rounded-xl shadow-inner">
          <h3 className="text-2xl font-bold text-pink-700 mb-4">종아리 수술 후에는 이게 중요해!</h3>
          <ul className="list-none space-y-2 text-pink-900">
            <li className="flex items-start"><span className="mr-3 mt-1">💖</span><strong>0-2주:</strong> CPM 기계 사용, 부목 착용으로 수술 부위 보호.</li>
            <li className="flex items-start"><span className="mr-3 mt-1">💖</span><strong>2-8주:</strong> 수중 운동, 전기 치료, 꾸준한 스트레칭.</li>
            <li className="flex items-start"><span className="mr-3 mt-1">💖</span><strong>3-6개월:</strong> 보행 훈련 집중, 밴드 저항 운동 시작.</li>
          </ul>
        </div>
        <div className="p-6 bg-rose-50/50 rounded-xl shadow-inner">
          <h3 className="text-2xl font-bold text-rose-700 mb-4">가슴 수술 후에는 이렇게 조심하자 😊</h3>
          <ul className="list-none space-y-2 text-rose-900">
            <li className="flex items-start"><span className="mr-3 mt-1">💖</span><strong>0-4주:</strong> 충분한 휴식, 상체 높여 눕기, 압박 밴드 착용.</li>
            <li className="flex items-start"><span className="mr-3 mt-1">💖</span><strong>5-8주:</strong> 대부분 일상생활 가능, 가벼운 스트레칭과 걷기 시작.</li>
            <li className="flex items-start"><span className="mr-3 mt-1">💖</span><strong>2-3개월:</strong> 의료진과 상담 후 가벼운 유산소 운동 점진적 시작.</li>
          </ul>
        </div>
      </div>
    ),
    'support': (
       <div className="space-y-10">
        <div>
          <h3 className="text-2xl font-bold text-pink-800 mb-4 text-center">다른 사람들은 어떻게 회복하고 있을까?</h3>
          <p className="text-center mb-6">회복의 길이 가끔 외롭게 느껴질 수 있지만, 너는 혼자가 아니야. 다른 사람들의 경험을 참고하며 용기를 얻어보자! 관련 커뮤니티 자료와 우리가 함께한 추억들은 <strong className="font-bold text-pink-600">'데미안의 편지'</strong> 섹션에 있는 AI 데미안과의 대화창에서 '보관함' 버튼을 눌러 언제든지 볼 수 있어.</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-rose-800 mb-4 text-center">🚨 갑자기 아프거나 걱정될 땐?</h3>
          <p className="text-center mb-6">괜찮아, 내가 옆에서 다 도와줄게! 그래도 혹시 아프거나 걱정될 때 어떻게 하면 좋을지 미리 알아두면 우리 재윤이가 더 안심할 수 있을 거야.</p>
          <h4 className="font-bold text-lg text-rose-700 mb-2">몸이 좀 불편할 땐 이렇게 해봐:</h4>
          <ul className="list-disc list-inside space-y-1 pl-4">
              <li>처방받은 약 제시간에 꼭 챙겨 먹기</li>
              <li>냉찜질이나 온찜질 활용하기</li>
              <li>몸이 편안한 올바른 자세 유지하기</li>
              <li>명상, 심호흡, 좋은 음악 감상으로 마음 편안하게 하기</li>
          </ul>
          <h4 className="font-bold text-lg text-rose-700 mt-6 mb-2">만약 이럴 땐, 꼭 병원에 알려줘야 해!:</h4>
           <ul className="list-disc list-inside space-y-1 pl-4 text-red-600 font-semibold">
              <li>출혈이나 붓기가 심해질 때</li>
              <li>열이 나고 오한이 느껴질 때</li>
              <li>통증이 너무 심해서 참기 힘들 때</li>
              <li>피부 색깔이 이상하게 변하거나 신경에 이상 증상이 느껴질 때</li>
          </ul>
        </div>
      </div>
    ),
    'from-demian': (
      <Gemini />
    )
  };

  return (
    <div className="bg-rose-50/30 min-h-screen font-sans text-gray-800">
      <Header sections={SECTIONS} activeSection={activeSection} onNavClick={handleNavClick} innerRef={headerRef} />
      <main>
        <Hero />
        {SECTIONS.map((section) => {
            // Special handling for the Gemini section to avoid double-padding/background
            if (section.id === 'from-demian') {
              return (
                <section key={section.id} ref={(el: HTMLElement | null) => { sectionRefs.current[section.id] = el; }} className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
                  <div className="container mx-auto max-w-3xl">
                    <div className="text-center mb-12">
                      <h2 className="font-handwriting text-5xl md:text-6xl font-bold text-pink-700 inline-block">
                        {section.mainTitle}
                      </h2>
                      <div className="mt-4 h-1 w-24 mx-auto bg-gradient-to-r from-pink-400 to-rose-400 rounded-full"></div>
                    </div>
                    {/* Render Gemini component directly */}
                    {sectionContent[section.id]}
                  </div>
                </section>
              );
            }
            // Default rendering for other sections
            return (
              <ContentBlock
                key={section.id}
                title={section.mainTitle}
                innerRef={(el: HTMLElement | null) => {
                  sectionRefs.current[section.id] = el;
                }}
              >
                {sectionContent[section.id]}
              </ContentBlock>
            );
        })}
        <Footer />
      </main>
      <MusicPlayer />
    </div>
  );
};

export default App;
