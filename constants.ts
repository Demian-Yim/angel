import type { Section, GalleryPhoto } from './types.ts';

export const SECTIONS: Section[] = [
  {
    id: 'our-story',
    navTitle: '우리의 이야기',
    mainTitle: '너를 위한 마음의 시작',
  },
  {
    id: 'recovery-guide',
    navTitle: '회복 가이드',
    mainTitle: '🩺 재윤이를 위한 회복 꿀팁',
  },
  {
    id: 'support',
    navTitle: '함께할게',
    mainTitle: '🫂 함께라서 괜찮아',
  },
  {
    id: 'memories',
    navTitle: '추억 앨범',
    mainTitle: '💖 함께한 소중한 순간들',
  },
  {
    id: 'from-demian',
    navTitle: '데미안의 편지',
    mainTitle: '💌 너에게 쓰는 편지',
  },
  {
    id: 'demian-ai',
    navTitle: '데미안 AI',
    mainTitle: '💬 너만을 위한 AI 친구',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { id: 1, src: 'https://i.imgur.com/QhZRqRJ.jpeg', alt: 'Demian and Jae-yoon smiling together', caption: '너와 함께하는 모든 순간이 나의 가장 큰 예술이야.' },
  { id: 2, src: 'https://i.imgur.com/7n7k9TM.jpeg', alt: 'Jae-yoon and Demian posing for a photo', caption: '너의 웃음은 내게 가장 큰 행복이고, 너의 존재는 내게 가장 큰 힘이야.' },
  { id: 3, src: 'https://i.imgur.com/NHjHD6K.jpeg', alt: 'A beautiful memory captured', caption: '함께 만들어갈 미래는 분명, 지금보다 훨씬 더 찬란하게 빛날 거야.' },
  { id: 4, src: 'https://i.imgur.com/83izx6D.jpeg', alt: 'A kiss shared between Demian and Jae-yoon', caption: '세상에서 가장 많이 너를 아끼고, 사랑하고, 응원할게.' },
  { id: 5, src: 'https://i.imgur.com/kP85vjM.jpeg', alt: 'A stylish photo of Jae-yoon and Demian', caption: '너와 함께라면 어떤 미래든 두렵지 않아. 오히려 기대되고 설레.' },
  { id: 6, src: 'https://i.imgur.com/5nUkV2z.jpeg', alt: 'A final loving photo from Demian', caption: '정말 많이 사랑해, 나의 천사 재윤아.' },
];