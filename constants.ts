import type { Section, GalleryPhoto } from './types.ts';

// Main navigation sections
export const SECTIONS: Section[] = [
  {
    id: 'our-story',
    navTitle: '우리의 이야기',
    mainTitle: '너를 위한 마음의 시작',
  },
  {
    id: 'recovery-guide',
    navTitle: '내가 도와줄게',
    mainTitle: '🩺 재윤아, 이건 꼭 기억해 줘',
  },
  {
    id: 'support',
    navTitle: '혼자가 아니야',
    mainTitle: '🫂 혼자가 아니야, 내가 있잖아',
  },
  // The 'media-library' section is removed as its content is now in the chat modal.
  {
    id: 'from-demian',
    navTitle: '데미안의 편지',
    mainTitle: '💌 너에게 쓰는 편지',
  },
];

// Photo gallery content
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { id: 1, src: 'https://i.imgur.com/NHjHD6K.jpeg', alt: 'Demian carrying Jae-yoon in a tunnel of lights', caption: '너와 함께 걷는 이 길이 언제나 빛으로 가득하기를.' },
  { id: 2, src: 'https://i.imgur.com/5nUkV2z.jpeg', alt: 'Jae-yoon smiling beautifully amongst nature', caption: '초록빛 사이에서도 가장 빛나는 너.' },
  { id: 3, src: 'https://i.imgur.com/QhZRqRJ.jpeg', alt: 'Demian and Jae-yoon in an artistic light projection', caption: '너와 함께하는 모든 순간이 나의 가장 큰 예술이야.' },
  { id: 4, src: 'https://i.imgur.com/7n7k9TM.jpeg', alt: 'Jae-yoon and Demian holding hands in a light projection', caption: '너의 웃음은 내게 가장 큰 행복이고, 너의 존재는 내게 가장 큰 힘이야.' },
  { id: 5, src: 'https://i.imgur.com/83izx6D.jpeg', alt: 'A tender kiss shared between Demian and Jae-yoon', caption: '세상에서 가장 많이 너를 아끼고, 사랑하고, 응원할게. ❤️' },
];

// Consolidated media links for the library modal
export const MEDIA_LINKS = {
  albums: [
    {
      title: '2025 Angel & Demian',
      url: 'https://www.icloud.com/sharedalbum/#B2ZG4TcsmHH43e',
      imageUrl: 'https://i.imgur.com/NHjHD6K.jpeg'
    },
    {
      title: 'Kiss Album',
      url: 'https://www.icloud.com/sharedalbum/#B2Z5nhQSTGd7snY',
      imageUrl: 'https://i.imgur.com/83izx6D.jpeg'
    }
  ],
  music: {
    title: '우리를 위한 플레이리스트',
    url: 'https://www.youtube.com/playlist?list=PLcaHoylU0Ow_c3KEWEhzKF0dr6iHJUmup'
  },
  guides: [
    {
      title: '마음확장 가이드',
      description: '우리의 마음을 더 깊고 넓게 이해하기 위한 안내서',
      url: 'https://x.gd/Ctoxq'
    }
  ]
};
