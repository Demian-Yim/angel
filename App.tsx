import React, { useState, useRef, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ContentBlock from './components/ContentBlock';
import Footer from './components/Footer';
import { SECTIONS } from './constants';

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
          <h3 className="text-2xl font-bold text-rose-700 mb-4">힙업 거상술 회복 가이드라인</h3>
          <ul className="list-none space-y-2 text-rose-900">
            <li className="flex items-start"><span className="mr-3 mt-1">💖</span><strong>초기 안정기 (0-2주):</strong> 앉는 자세 제한, 옆으로 누워 휴식, 압박복 24시간 착용.</li>
            <li className="flex items-start"><span className="mr-3 mt-1">💖</span><strong>점진적 활동기 (2-6주):</strong> 가벼운 산책 시작, 흉터 관리 시작.</li>
            <li className="flex items-start"><span className="mr-3 mt-1">💖</span><strong>운동 준비기 (6주-3개월):</strong> 둔근 강화 운동 점진적 시작.</li>
          </ul>
        </div>
        <div className="p-6 bg-pink-50/50 rounded-xl shadow-inner">
          <h3 className="text-2xl font-bold text-pink-700 mb-4">근육단축술 회복 가이드라인</h3>
          <ul className="list-none space-y-2 text-pink-900">
            <li className="flex items-start"><span className="mr-3 mt-1">💖</span><strong>0-2주:</strong> CPM 기계 사용, 부목 착용으로 수술 부위 보호.</li>
            <li className="flex items-start"><span className="mr-3 mt-1">💖</span><strong>2-8주:</strong> 수중 운동, 전기 치료, 꾸준한 스트레칭.</li>
            <li className="flex items-start"><span className="mr-3 mt-1">💖</span><strong>3-6개월:</strong> 보행 훈련 집중, 밴드 저항 운동 시작.</li>
          </ul>
        </div>
        <div className="p-6 bg-rose-50/50 rounded-xl shadow-inner">
          <h3 className="text-2xl font-bold text-rose-700 mb-4">가슴 성형 회복 가이드라인</h3>
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
          <h3 className="text-2xl font-bold text-pink-800 mb-4 text-center">커뮤니티 & 지지</h3>
          <p className="text-center mb-6">회복의 길은 때로 외롭게 느껴질 수 있지만, 너는 혼자가 아니야. 데미안이 언제나 곁에 있을게!</p>
          <div className="grid md:grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-rose-50 rounded-lg"><strong>힙업 거상술:</strong> 성예사, 디닥터스 카페</div>
            <div className="p-4 bg-pink-50 rounded-lg"><strong>근육단축술:</strong> 뇌성마비 환우 모임, 재활의학과 카페</div>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-rose-800 mb-4 text-center">🚨 응급 & 통증 관리</h3>
          <p className="text-center mb-6">돌발 상황이나 통증에 대한 현명한 대처 방법을 미리 알아두는 것은 매우 중요해.</p>
          <h4 className="font-bold text-lg text-rose-700 mb-2">통증 대응 방법:</h4>
          <ul className="list-disc list-inside space-y-1 pl-4">
              <li>처방 약 제시간에 복용하기</li>
              <li>냉찜질 / 온찜질 활용하기</li>
              <li>올바른 자세 유지하기</li>
              <li>명상, 심호흡, 음악 감상으로 심리적 이완하기</li>
          </ul>
          <h4 className="font-bold text-lg text-rose-700 mt-6 mb-2">꼭 병원에 연락해야 할 때:</h4>
           <ul className="list-disc list-inside space-y-1 pl-4 text-red-600 font-semibold">
              <li>심한 출혈 또는 부기</li>
              <li>고열 및 오한</li>
              <li>극심한 통증</li>
              <li>피부 색깔 변화 또는 신경 증상</li>
          </ul>
        </div>
      </div>
    ),
    'memories': (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
          <a 
            href="https://www.icloud.com/sharedalbum/#B2ZG4TcsmHH43e" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group text-center"
          >
            <div className="bg-white p-3 rounded-lg shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
              <img src="https://i.imgur.com/NHjHD6K.jpeg" alt="Album cover for 2025 Angel & Demian" className="w-64 h-64 object-cover rounded-md" />
            </div>
            <p className="mt-4 font-semibold text-rose-700 text-lg">2025 Angel & Demian</p>
          </a>
          <a 
            href="https://www.icloud.com/sharedalbum/#B2Z5nhQSTGd7snY" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group text-center"
          >
            <div className="bg-white p-3 rounded-lg shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
              <img src="https://i.imgur.com/83izx6D.jpeg" alt="Album cover for Kiss" className="w-64 h-64 object-cover rounded-md" />
            </div>
            <p className="mt-4 font-semibold text-pink-700 text-lg">Kiss Album</p>
          </a>
        </div>
    ),
    'from-demian': (
      <>
        <p>재윤아, 내 세상이 되어줘서 정말 고마워. 너를 만나고 내 삶은 온통 너로 물들었어. 너의 웃음은 내게 가장 큰 행복이고, 너의 존재는 내게 가장 큰 힘이야.</p>
        <p>부족한 점도 많고, 서툰 부분도 많은 나지만, 너에게만큼은 항상 최고의 사람이 되어주고 싶어. 세상에서 가장 많이 너를 아끼고, 사랑하고, 응원할게. 언제나 너의 곁에서 든든한 버팀목이 되어줄게.</p>
        <p>너와 함께라면 어떤 미래든 두렵지 않아. 오히려 기대되고 설레. 같이 하고 싶은 것도, 가고 싶은 곳도 너무 많아. 너와 함께 만들어갈 미래는 분명, 지금보다 훨씬 더 찬란하게 빛날 거야. ✨</p>
        <p>정말 많이 사랑해, 나의 천사 재윤아.</p>
      </>
    ),
  };

  return (
    <div className="bg-gradient-to-b from-rose-50 to-[#fffaf0]">
      <Header innerRef={headerRef} sections={SECTIONS} activeSection={activeSection} onNavClick={handleNavClick} />
      <main>
        <Hero />
        {SECTIONS.map((section) => (
          <ContentBlock
            key={section.id}
            innerRef={(el) => {
              sectionRefs.current[section.id] = el;
            }}
            title={section.mainTitle}
          >
            {sectionContent[section.id]}
          </ContentBlock>
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default App;