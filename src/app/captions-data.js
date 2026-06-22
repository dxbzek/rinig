// Simulated live-transcript script + saved sessions for the Rinig app.
// Each segment streams in word-by-word to mimic real-time captioning.
export const RINIG_SCRIPT = [
  {
    speaker: 'Ana', lang: 'en',
    words: 'Good morning everyone, thanks so much for being here today.'.split(' '),
    translation: 'Magandang umaga sa lahat, salamat sa pagpunta ngayon.',
  },
  {
    speaker: 'Ana', lang: 'en',
    words: 'So the meeting will start at ten in the morning.'.split(' '),
    translation: 'Magsisimula ang miting nang alas-diyes ng umaga.',
  },
  {
    speaker: 'Marco', lang: 'en',
    words: 'Can everyone see the slides on the screen okay?'.split(' '),
    translation: 'Nakikita ba ng lahat ang slides sa screen?',
  },
  {
    speaker: 'Ana', lang: 'en',
    words: 'We will keep captions running for the whole session.'.split(' '),
    translation: 'Patuloy na tatakbo ang captions sa buong sesyon.',
  },
]

export const RINIG_RECENTS = [
  {
    id: 'standup', title: 'Team standup', meta: 'English → Tagalog · 14 min', when: 'Today, 9:02 AM',
    tags: ['work', 'meeting'],
    lines: [
      { speaker: 'Ana',   text: 'Good morning everyone, thanks so much for being here today.' },
      { speaker: 'Ana',   text: 'So the meeting will start at ten in the morning.' },
      { speaker: 'Marco', text: 'Can everyone see the slides on the screen okay?' },
      { speaker: 'Ana',   text: 'We will keep captions running for the whole session.' },
    ],
  },
  {
    id: 'clinic', title: 'Clinic visit', meta: 'Tagalog → English · 32 min', when: 'Yesterday',
    tags: ['health'],
    lines: [
      { speaker: 'Doktor', text: 'Kumusta po kayo ngayong umaga?' },
      { speaker: 'Ikaw',   text: 'Mabuti naman po, salamat.' },
      { speaker: 'Doktor', text: 'Inumin po ang gamot dalawang beses sa isang araw.' },
    ],
  },
  {
    id: 'service', title: 'Sunday service', meta: 'English · 1 hr 6 min', when: 'Mar 16',
    tags: ['family'],
    lines: [
      { speaker: 'Pastor', text: 'Let us begin this morning with a moment of quiet.' },
      { speaker: 'Pastor', text: 'Thank you all for coming, near and far.' },
    ],
  },
  {
    id: 'lecture', title: 'History lecture', meta: 'English → Tagalog · 48 min', when: 'Mar 14',
    tags: ['school'],
    lines: [
      { speaker: 'Prof. Cruz', text: 'Today we look at the revolution and the years that followed.' },
      { speaker: 'Prof. Cruz', text: 'Please hold your questions until the end of the hour.' },
    ],
  },
  {
    id: 'market', title: 'Market errands', meta: 'Tagalog · 8 min', when: 'Mar 11',
    tags: ['family'],
    lines: [
      { speaker: 'Tindera', text: 'Magkano po ang isang kilo ng mangga?' },
      { speaker: 'Ikaw',    text: 'Bigyan mo ako ng dalawang kilo, salamat.' },
    ],
  },
  {
    id: 'callkids', title: 'Call with the kids', meta: 'English · 22 min', when: 'Mar 9',
    tags: ['family'],
    lines: [
      { speaker: 'Liam', text: 'We made it to the cabin, the drive was long but fun.' },
      { speaker: 'Mom',  text: 'Send me a photo when you get to the top of the hill.' },
    ],
  },
]

// Quick-filter chips for the history search screen.
export const RINIG_FILTERS = ['All', 'Work', 'Family', 'Health', 'School']
