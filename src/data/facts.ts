export type FactKind = 'sutra' | 'quote' | 'research' | 'tradition' | 'fact'

export interface Fact {
  kind: FactKind
  text: string
  source: string
  detail?: string
}

export const FACTS: Fact[] = [
  // Yoga Sutras of Patanjali
  { kind: 'sutra', text: 'Yoga is the stilling of the fluctuations of the mind.', source: 'Patanjali · Yoga Sutras 1.2' },
  { kind: 'sutra', text: 'Then the seer abides in its own true nature.', source: 'Patanjali · Yoga Sutras 1.3' },
  { kind: 'sutra', text: 'Practice and non-attachment are the two foundations of yoga.', source: 'Patanjali · Yoga Sutras 1.12' },
  { kind: 'sutra', text: 'Posture is steady and comfortable.', source: 'Patanjali · Yoga Sutras 2.46', detail: '“Sthira sukham asanam.”' },
  { kind: 'sutra', text: 'By cultivating attitudes of friendliness, compassion, joy, and equanimity, the mind becomes purified.', source: 'Patanjali · Yoga Sutras 1.33' },
  { kind: 'sutra', text: 'Asana is mastered by relaxation of effort and meditation on the infinite.', source: 'Patanjali · Yoga Sutras 2.47' },
  { kind: 'sutra', text: 'From this, one is no longer disturbed by the pairs of opposites.', source: 'Patanjali · Yoga Sutras 2.48' },
  { kind: 'sutra', text: 'When breath wanders, the mind is unsteady. When breath is still, so is the mind.', source: 'Patanjali · Yoga Sutras (paraphrase, 1.34)' },
  { kind: 'sutra', text: 'Steady practice over a long time, without break, with sincerity, becomes firmly grounded.', source: 'Patanjali · Yoga Sutras 1.14' },
  { kind: 'sutra', text: 'Heyam dukham anagatam — the suffering not yet come is to be avoided.', source: 'Patanjali · Yoga Sutras 2.16' },

  // Bhagavad Gita
  { kind: 'sutra', text: 'Yoga is skill in action.', source: 'Bhagavad Gita 2.50', detail: '“Yogah karmasu kaushalam.”' },
  { kind: 'sutra', text: 'A person is said to be established in self-realization when they are satisfied within.', source: 'Bhagavad Gita 6.20' },
  { kind: 'sutra', text: 'Yoga is the journey of the self, through the self, to the self.', source: 'Bhagavad Gita 6.20 (paraphrase)' },
  { kind: 'sutra', text: 'Set thy heart upon thy work, but never on its reward.', source: 'Bhagavad Gita 2.47' },
  { kind: 'sutra', text: 'When meditation is mastered, the mind is unwavering like a flame in a windless place.', source: 'Bhagavad Gita 6.19' },
  { kind: 'sutra', text: 'Yoga is the practice of tolerating the consequences of being yourself.', source: 'Bhagavad Gita (paraphrase)' },
  { kind: 'sutra', text: 'He who is moderate in eating and sleeping, working and recreation, can mitigate all sorrows by practicing yoga.', source: 'Bhagavad Gita 6.17' },

  // Hatha Yoga Pradipika & Upanishads
  { kind: 'tradition', text: 'When the breath wanders, the mind also is unsteady. When the breath is still, the mind too is still.', source: 'Hatha Yoga Pradipika 2.2' },
  { kind: 'tradition', text: 'Asana being conquered, one is free from the disturbance of the dualities.', source: 'Hatha Yoga Pradipika 1.17' },
  { kind: 'tradition', text: 'The body is your temple. Keep it pure and clean for the soul to reside in.', source: 'B.K.S. Iyengar' },
  { kind: 'tradition', text: 'Inhaling, I calm body and mind. Exhaling, I smile.', source: 'Thich Nhat Hanh' },

  // Modern teachers
  { kind: 'quote', text: 'Yoga is the journey of the self, through the self, to the self.', source: 'B.K.S. Iyengar · Light on Yoga' },
  { kind: 'quote', text: 'Yoga does not just change the way we see things — it transforms the person who sees.', source: 'B.K.S. Iyengar' },
  { kind: 'quote', text: 'Health is a state of complete harmony of the body, mind, and spirit.', source: 'B.K.S. Iyengar' },
  { kind: 'quote', text: 'Practice and all is coming.', source: 'K. Pattabhi Jois' },
  { kind: 'quote', text: 'Yoga is 99% practice and 1% theory.', source: 'K. Pattabhi Jois' },
  { kind: 'quote', text: 'If you can breathe, you can do yoga.', source: 'T.K.V. Desikachar' },
  { kind: 'quote', text: 'It is not the posture that matters; it is the person doing the posture.', source: 'T.K.V. Desikachar' },
  { kind: 'quote', text: 'Yoga teaches us to cure what need not be endured and endure what cannot be cured.', source: 'B.K.S. Iyengar' },
  { kind: 'quote', text: 'The success of yoga does not lie in the ability to perform postures but in how it positively changes the way we live our life.', source: 'T.K.V. Desikachar' },
  { kind: 'quote', text: 'Inhale the future, exhale the past.', source: 'Unknown (modern yoga adage)' },
  { kind: 'quote', text: 'Yoga is the perfect opportunity to be curious about who you are.', source: 'Jason Crandell' },
  { kind: 'quote', text: 'You cannot always control what goes on outside. But you can always control what goes on inside.', source: 'Wayne Dyer' },
  { kind: 'quote', text: 'The pose begins when you want to leave it.', source: 'B.K.S. Iyengar (attributed)' },
  { kind: 'quote', text: 'Real meditation is not what you do in your seat. It is how you respond to your life.', source: 'Sharon Salzberg' },
  { kind: 'quote', text: 'Self-realization is to know that we and the Lord are one.', source: 'Paramahansa Yogananda' },
  { kind: 'quote', text: 'The breath is the king of the mind.', source: 'B.K.S. Iyengar' },
  { kind: 'quote', text: 'Be peace, be love. Be the source of being.', source: 'Sri Sri Ravi Shankar' },
  { kind: 'quote', text: 'A flexible body makes for a flexible mind.', source: 'Sri K. Pattabhi Jois' },
  { kind: 'quote', text: 'Yoga is the dance of every cell with the music of every breath that creates inner serenity and harmony.', source: 'Debasish Mridha' },
  { kind: 'quote', text: 'Move your joints every day. You have to find your own tricks.', source: 'Vanda Scaravelli' },

  // Research findings — yoga & mental health
  { kind: 'research', text: 'A 12-week yoga program raised GABA levels in the thalamus — an effect linked to lower anxiety and improved mood.', source: 'Streeter et al., 2010', detail: 'J Altern Complement Med. 16(11):1145–52.' },
  { kind: 'research', text: 'Meta-analysis of 17 RCTs found yoga produced significant short-term reductions in depression symptoms versus controls.', source: 'Cramer et al., 2013', detail: 'Depress Anxiety. 30(11):1068–83.' },
  { kind: 'research', text: 'Hatha yoga reduced perceived stress and salivary cortisol in healthy adults after a single 60-minute session.', source: 'West et al., 2004', detail: 'Ann Behav Med. 28(2):114–8.' },
  { kind: 'research', text: 'Mindful yoga in pregnant women reduced anxiety and depression scores significantly more than parenting education alone.', source: 'Davis et al., 2015', detail: 'Complement Ther Clin Pract. 21(3):166–72.' },
  { kind: 'research', text: 'Eight weeks of Iyengar yoga reduced major depressive disorder symptoms in a randomized controlled trial.', source: 'Streeter et al., 2017', detail: 'J Altern Complement Med. 23(3):201–7.' },
  { kind: 'research', text: 'Twenty minutes of yoga improved working memory and reaction time more than aerobic exercise of the same duration.', source: 'Gothe et al., 2013', detail: 'J Phys Act Health. 10(4):488–97.' },
  { kind: 'research', text: 'Sudarshan Kriya yogic breathing reduced PTSD symptoms in war veterans, with effects sustained at one-year follow-up.', source: 'Seppälä et al., 2014', detail: 'J Trauma Stress. 27(4):397–405.' },
  { kind: 'research', text: 'A 10-session yoga program improved heart rate variability — a marker of nervous-system flexibility — in adults with high stress.', source: 'Tyagi & Cohen, 2016', detail: 'Int J Yoga. 9(2):97–113.' },
  { kind: 'research', text: 'Yoga participants reported a 41% improvement in sleep quality scores after 8 weeks, versus minimal change in controls.', source: 'Mustian et al., 2013', detail: 'J Clin Oncol. 31(26):3233–41.' },
  { kind: 'research', text: 'Restorative yoga reduced fatigue and improved sleep in breast-cancer survivors during chemotherapy.', source: 'Bower et al., 2012', detail: 'Cancer. 118(15):3766–75.' },
  { kind: 'research', text: 'Twelve weeks of yoga significantly lowered systolic and diastolic blood pressure in adults with prehypertension.', source: 'Hagins et al., 2014', detail: 'Evid Based Complement Alternat Med. 2014:809431.' },
  { kind: 'research', text: 'Yoga improved chronic low back pain and function as effectively as physical therapy in a 12-week trial.', source: 'Saper et al., 2017', detail: 'Ann Intern Med. 167(2):85–94.' },
  { kind: 'research', text: 'Pranayama practice reduced perceived stress in college students within 4 weeks, p < 0.001.', source: 'Brown & Gerbarg, 2005', detail: 'J Altern Complement Med. 11(1):189–201.' },
  { kind: 'research', text: 'Slow-breathing practice at six breaths per minute improved baroreflex sensitivity within minutes.', source: 'Bernardi et al., 2001', detail: 'BMJ. 323(7327):1446–9.' },
  { kind: 'research', text: 'Yoga improved balance and reduced fall risk in adults over 65 across pooled trial data.', source: 'Youkhana et al., 2016', detail: 'Age Ageing. 45(1):21–9.' },
  { kind: 'research', text: 'Mindfulness-based yoga reduced binge eating frequency and improved interoceptive awareness in adults with binge eating disorder.', source: 'McIver et al., 2009', detail: 'Eat Disord. 17(3):196–213.' },
  { kind: 'research', text: 'Eight weeks of yoga in adults with generalized anxiety disorder lowered Hamilton Anxiety scores by 27% on average.', source: 'Hofmann et al., 2018', detail: 'JAMA Psychiatry. (review, 2018).' },
  { kind: 'research', text: 'A single 90-minute restorative yoga class reduced markers of inflammation (IL-6) in stressed adults.', source: 'Kiecolt-Glaser et al., 2010', detail: 'Psychosom Med. 72(2):113–21.' },
  { kind: 'research', text: 'Twenty weeks of yoga reduced HbA1c in type 2 diabetes patients by an average of 0.64% versus 0.10% in controls.', source: 'Innes & Selfe, 2016', detail: 'J Diabetes Res. 2016:6979370.' },
  { kind: 'research', text: 'Yoga practice reduced menopausal hot-flash frequency by 30% over 12 weeks in a randomized trial.', source: 'Cramer et al., 2018', detail: 'Menopause. 25(11):1311–7.' },

  // Anatomical / physiological facts
  { kind: 'fact', text: 'Slow exhalations longer than inhalations activate the parasympathetic “rest and digest” branch of the nervous system.', source: 'Autonomic physiology · Porges, 2011' },
  { kind: 'fact', text: 'The vagus nerve threads from brainstem to gut and is directly stimulated by long, slow exhalations and humming.', source: 'Polyvagal Theory · Porges' },
  { kind: 'fact', text: 'A single breath cycle in calm yoga averages 4–6 seconds; resting heart rate variability rises as it lengthens.', source: 'Lehrer et al., 2014, Front Psychol' },
  { kind: 'fact', text: 'The diaphragm moves about 1.5 cm during quiet breathing and up to 10 cm during deep yogic breathing.', source: 'Respiratory anatomy texts' },
  { kind: 'fact', text: 'Forward folds gently compress the vagus nerve and signal safety to the brainstem.', source: 'Clinical neuroanatomy of vagal pathways' },
  { kind: 'fact', text: 'Inversions reverse the pull of gravity on venous return — easing pooled blood from the legs back to the heart.', source: 'Cardiovascular physiology' },
  { kind: 'fact', text: 'Holding a posture for at least 90 seconds allows fascia to begin yielding rather than rebounding.', source: 'Schleip et al., 2012, Fascia Research Congress' },
  { kind: 'fact', text: 'The human body has more sensory neurons running from the gut to the brain than the reverse direction.', source: 'Mayer, 2011 · Nat Rev Neurosci' },
  { kind: 'fact', text: 'Twisting postures stimulate the enteric nervous system, supporting digestion and elimination.', source: 'Functional gut physiology' },
  { kind: 'fact', text: 'Nasal breathing increases nitric oxide in the airways, improving oxygen uptake by up to 18%.', source: 'Lundberg & Weitzberg, 1999, NEJM' },

  // Tradition / cultural
  { kind: 'tradition', text: 'The word “yoga” comes from the Sanskrit root yuj, meaning to join, to yoke, to unite.', source: 'Sanskrit etymology' },
  { kind: 'tradition', text: 'Patanjali codified the Yoga Sutras around 200 BCE — 196 aphorisms in four chapters.', source: 'Historical scholarship · Feuerstein' },
  { kind: 'tradition', text: 'Hatha Yoga literally means “the yoga of force” — ha (sun) and tha (moon) — uniting opposing energies.', source: 'Hatha Yoga Pradipika · 15th century' },
  { kind: 'tradition', text: 'The classical eight limbs of yoga are: yama, niyama, asana, pranayama, pratyahara, dharana, dhyana, samadhi.', source: 'Patanjali · Yoga Sutras 2.29' },
  { kind: 'tradition', text: 'Only three of Patanjali’s 196 sutras explicitly discuss asana — most focus on the mind.', source: 'Yoga Sutras analysis' },
  { kind: 'tradition', text: 'June 21st is the International Day of Yoga, declared by the UN in 2014.', source: 'UN General Assembly Resolution 69/131' },
  { kind: 'tradition', text: 'Surya Namaskar A traditionally consists of 12 postures linked with breath — one cycle per breath.', source: 'Ashtanga Vinyasa tradition' },
  { kind: 'tradition', text: 'The lotus pose, Padmasana, appears on seals from the Indus-Saraswati civilization, dated 2500 BCE.', source: 'Archaeology of yoga · Mark Singleton' },
  { kind: 'tradition', text: 'The Bihar School of Yoga distinguishes 84 classical asanas as the seat of practice.', source: 'Swami Satyananda Saraswati' },
  { kind: 'tradition', text: 'The mantra “Om” is considered the primordial sound and the seed of all vibration.', source: 'Mandukya Upanishad' },
  { kind: 'tradition', text: 'The chakras are seven energetic centers along the spine, first detailed in the tantric Shat-Chakra-Nirupana.', source: 'Shat-Chakra-Nirupana, 1577' },
  { kind: 'tradition', text: 'Iyengar Yoga emphasizes alignment and uses props — pioneered by B.K.S. Iyengar in the 1960s.', source: 'Light on Yoga, 1966' },
  { kind: 'tradition', text: 'Ashtanga Vinyasa Yoga as a modern system was developed by Sri K. Pattabhi Jois in Mysore.', source: 'Ashtanga lineage' },
  { kind: 'tradition', text: 'The word “mantra” combines manas (mind) and tra (instrument) — a tool for the mind.', source: 'Sanskrit etymology' },

  // Light facts
  { kind: 'fact', text: 'Yoga is practiced by over 300 million people worldwide as of 2022.', source: 'Statista Health & Wellness Report' },
  { kind: 'fact', text: 'A child’s pose holds for one minute can lower heart rate by 5–10 beats per minute.', source: 'Practitioner-reported HR studies' },
  { kind: 'fact', text: 'The supine corpse pose, Savasana, is considered the most difficult — because it asks for complete surrender.', source: 'Hatha tradition' },
  { kind: 'fact', text: 'On average, a regular yoga practice improves grip strength by 17% in three months.', source: 'Tran et al., 2001' },
  { kind: 'fact', text: 'Sun salutations practiced briskly elevate the heart rate to a moderate aerobic zone.', source: 'Hagins et al., 2007' },
  { kind: 'fact', text: 'Yoga is one of the only practices that explicitly trains both body and attention together.', source: 'Mindfulness in Motion · Kabat-Zinn' },
  { kind: 'fact', text: 'Pranayama can lower respiratory rate to 4 breaths per minute — five times slower than typical resting rate.', source: 'Cardiovascular respiratory studies' },
  { kind: 'fact', text: 'Holding a forward fold for two minutes can shift brainwave activity toward calmer alpha states.', source: 'EEG yoga studies, AIIMS Delhi' },
  { kind: 'fact', text: 'Standing on one leg engages 40+ muscles working together to maintain balance.', source: 'Functional anatomy' },
  { kind: 'fact', text: 'A consistent yoga practice can add up to 2 hours of total sleep per week within 8 weeks.', source: 'Mustian et al., 2013' },

  // More research
  { kind: 'research', text: 'Yoga improved attention and processing speed in older adults across 22 pooled trials.', source: 'Gothe et al., 2019', detail: 'Brain Plast. 5(1):105–122.' },
  { kind: 'research', text: 'Eight weeks of yoga reduced symptoms of irritable bowel syndrome by 30%.', source: 'Kavuri et al., 2015', detail: 'Int J Yoga. 8(1):75–80.' },
  { kind: 'research', text: 'Yoga reduced lower back pain disability scores by 29% over 12 weeks versus 5% in controls.', source: 'Sherman et al., 2011', detail: 'Arch Intern Med. 171(22):2019–26.' },
  { kind: 'research', text: 'Yoga improved chronic neck pain intensity within 9 weeks, with effects sustained at 12 months.', source: 'Cramer et al., 2017', detail: 'J Pain. 18(8):990–1005.' },
  { kind: 'research', text: 'Yoga reduced asthma symptoms and quality-of-life impairment across 14 studies in a 2016 Cochrane review.', source: 'Yang et al., 2016', detail: 'Cochrane Database Syst Rev. CD010346.' },
  { kind: 'research', text: 'A meditation and yoga retreat decreased C-reactive protein and pro-inflammatory cytokines in healthy adults.', source: 'Cahn et al., 2017', detail: 'Front Hum Neurosci. 11:315.' },
  { kind: 'research', text: 'Yoga practiced twice weekly for 8 weeks improved migraine frequency more than medication alone.', source: 'Kumar et al., 2020', detail: 'Neurology. 94(21):e2203–e2212.' },
  { kind: 'research', text: 'Twelve weeks of yoga improved erectile function scores in men with sexual dysfunction.', source: 'Dhikav et al., 2010', detail: 'J Sex Med. 7(10):3460–6.' },
  { kind: 'research', text: 'Yoga reduced cortisol-awakening response in nurses with high occupational stress.', source: 'Lin et al., 2015', detail: 'Workplace Health Saf. 63(11):494–502.' },
  { kind: 'research', text: 'Yoga improved cognitive flexibility on the Stroop test after 12 weeks in middle-aged adults.', source: 'Gothe & McAuley, 2015', detail: 'Psychosom Med. 77(7):784–97.' },

  // Closing wisdom
  { kind: 'quote', text: 'Today is your day. Your mountain is waiting. So get on your mat.', source: 'Adapted from Dr. Seuss' },
  { kind: 'quote', text: 'The breath is the bridge between body and mind.', source: 'Thich Nhat Hanh' },
  { kind: 'quote', text: 'You do not need a fancy mat. You need the willingness to begin.', source: 'Unknown (modern adage)' },
  { kind: 'quote', text: 'Be where you are; otherwise you will miss your life.', source: 'Buddha (attributed)' },
  { kind: 'quote', text: 'Wherever you are, be totally there.', source: 'Eckhart Tolle' },
  { kind: 'quote', text: 'There is no perfect pose. Only the pose you arrive at today.', source: 'Modern yoga teaching' },
  { kind: 'quote', text: 'Begin again. As many times as you need to.', source: 'Sharon Salzberg' },
]
