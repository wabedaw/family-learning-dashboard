// Real data extracted from Brighton College (Singapore) Junior School reports
// Y5 grading: Attainment = Advanced/Secure/Developing/Concern; Effort: 1(best)-3
// Y6 grading: Attainment = Excelling/Above/Meeting/Developing; Effort: 1(best)-3

export const lucas = {
  id: 'lucas',
  name: 'Lucas',
  chineseName: 'Yong Lucas Ying',
  school: 'Brighton College (Singapore)',
  yearGroup: 'Year 6',
  stage: 'Junior School',
  avatar: import.meta.env.BASE_URL + 'lucas-avatar.png',
  focusSubjects: ['English (Reading & Writing)', 'Maths', 'Mandarin'],
  familyConstraints: ['Both parents work full-time', 'Tuesday & Thursday evenings free for study'],

  reports: [
    // ============================================================
    // REPORT 1: Year 5 Term 1 (2024-25) — Overall comment only
    // ============================================================
    {
      id: 'lucas-y5-t1',
      academicYear: '2024-2025',
      term: 'Y5 Term 1',
      termIndex: 0,
      schoolSection: 'Junior School',
      reportDate: '2024-12',
      reportType: 'Progress Report',
      attendance: { present: 100, late: 0 },
      className: '5LH',
      subjects: [
        { name: 'Reading', group: 'Core', attainment: 'Concern', effort: 3, teacherName: 'Ms L Hutton',
          standardised: { academic: 1, effort: 3, stability: 2, independence: 2, progress: 2 } },
        { name: 'Writing', group: 'Core', attainment: 'Developing', effort: 2, teacherName: 'Ms L Hutton',
          standardised: { academic: 2, effort: 4, stability: 2, independence: 2, progress: 2 } },
        { name: 'Maths', group: 'Core', attainment: 'Developing', effort: 2, teacherName: 'Ms L Hutton',
          standardised: { academic: 2, effort: 4, stability: 2, independence: 2, progress: 2 } },
        { name: 'Science', group: 'Core', attainment: 'Secure', effort: 2, teacherName: 'Mr R Bell',
          standardised: { academic: 3, effort: 4, stability: 3, independence: 3, progress: 3 } },
        { name: 'Art and Design', group: 'Creative', attainment: 'Secure', effort: 2, teacherName: 'Ms R Ellender',
          standardised: { academic: 3, effort: 4, stability: 3, independence: 3, progress: 3 } },
        { name: 'Mandarin', group: 'Languages', attainment: 'Secure', effort: 1, teacherName: 'Mrs H Li',
          standardised: { academic: 3, effort: 5, stability: 4, independence: 3, progress: 3 } },
        { name: 'Physical Education', group: 'Other', attainment: 'Developing', effort: 1, teacherName: 'Mr L Johnson & Ms YP Neo',
          standardised: { academic: 2, effort: 5, stability: 3, independence: 3, progress: 2 } },
        { name: 'Humanities', group: 'Humanities', attainment: 'Developing', effort: 2, teacherName: 'Ms L Hutton',
          standardised: { academic: 2, effort: 4, stability: 2, independence: 2, progress: 2 } },
        { name: 'Music', group: 'Creative', attainment: 'Secure', effort: 2, teacherName: 'Mr A Stratford',
          standardised: { academic: 3, effort: 4, stability: 3, independence: 3, progress: 3 } },
        { name: 'PSHE', group: 'Other', attainment: 'Developing', effort: 2, teacherName: 'Ms L Hutton',
          standardised: { academic: 2, effort: 4, stability: 2, independence: 2, progress: 2 } },
        { name: 'French', group: 'Languages', attainment: 'Developing', effort: 3, teacherName: 'Mrs N Veronese',
          standardised: { academic: 2, effort: 3, stability: 2, independence: 2, progress: 2 } },
        { name: 'Computing', group: 'Core', attainment: 'Secure', effort: 2, teacherName: 'Mr R Bell',
          standardised: { academic: 3, effort: 4, stability: 3, independence: 3, progress: 3 } },
        { name: 'Drama', group: 'Creative', attainment: 'Secure', effort: 2, teacherName: 'Miss L Mills',
          standardised: { academic: 3, effort: 4, stability: 3, independence: 3, progress: 3 } },
      ],
      overallComment: "Lucas is a quiet and reflective pupil who works best with individual assistance. He is making noticeable improvement in keeping his books in good condition and his tray tidy. While he sometimes gets distracted and fidgets with his stationery, Lucas is becoming more mindful of staying focused during lessons. He is also improving in following directions and taking greater care in completing his classroom responsibilities. However, moving forward he should be completing his home reading log on a daily basis. Although he is generally shy with his classmates, Lucas enjoys spending time with his friends during break time. It will be rewarding to see Lucas flourish through the remainder of the year.\n\nLucas is steadily progressing in English. He has been receiving support through our intermediate language programme since the start of the academic year. As discussed in our last parent-teacher meeting, continued efforts outside of school will support his development. He is working towards meeting the Year 5 expectations in both Reading and Writing. Consistent review of his weekly spelling words is essential for him to improve his spelling skills. Recently, he wrote a one-page biography on Katherine Johnson with assistance, which was an accomplishment for him as he found it quite challenging. I encourage Lucas to keep building upon his vocabulary and to embrace all opportunities to further enhance his abilities in English.\n\nLucas is advancing in his understanding of Place Value in Maths. His growing language skills require him to focus attentively when new concepts are introduced. He is able to use and interpret visuals correctly, such as number lines and place value charts. Lucas is still working on improving his ability to order and compare numbers. He typically selects core-level tasks in class but does not always complete them. With increased concentration and a more proactive approach to asking for help when needed, Lucas will continue to progress in his Maths work.",
      nextSteps: 'To remain focused during lessons. To consistently practise weekly spelling words. To complete tasks more consistently and proactively ask for help when needed.',
    },

    // ============================================================
    // REPORT 2: Year 5 Term 2 (2024-25) — Full Report with comments
    // ============================================================
    {
      id: 'lucas-y5-t2',
      academicYear: '2024-2025',
      term: 'Y5 Term 2',
      termIndex: 1,
      schoolSection: 'Junior School',
      reportDate: '2025-03',
      reportType: 'Full Report',
      attendance: { present: 100, late: 0 },
      className: '5CD',
      subjects: [
        { name: 'Reading', group: 'Core', attainment: 'Secure', effort: 2, teacherName: 'Mr C Davidson',
          standardised: { academic: 3, effort: 4, stability: 3, independence: 3, progress: 4 },
          comment: "Lucas has made steady progress in his reading, particularly enjoying The Arrival and The Sleeping Sword. He reads with increasing fluency, using punctuation to help guide his tone and pace. Lucas is expanding his vocabulary and can understand new words in context, as well as identify and explain figurative language with guidance. He makes well-considered predictions and adjusts them as the story unfolds, supporting his ideas with evidence. His ability to retrieve information is developing, and he can effectively locate key details.",
          nextStep: 'To explore how word choice affects meaning and explain its significance.',
          commentInsight: {
            strengths: ['Steady reading progress', 'Increasing fluency', 'Expanding vocabulary', 'Well-considered predictions with evidence'],
            concerns: [],
            suggestions: ['Explore how word choice affects meaning'],
            signals: ['Reading improved from Concern to Secure — major progress'],
            familyAction: 'Continue daily reading; discuss word choices in books together'
          }
        },
        { name: 'Writing', group: 'Core', attainment: 'Developing', effort: 2, teacherName: 'Mr C Davidson',
          standardised: { academic: 2, effort: 4, stability: 3, independence: 2, progress: 3 },
          comment: "Lucas has made great strides in his writing, constructing simple sentences with correct grammar and punctuation. He organises his writing into sections and, with support, uses speech marks accurately. Lucas is beginning to use conjunctions to link ideas and add detail, and he is expanding his vocabulary by incorporating synonyms and more complex words. In his diary entry on The Arrival, Lucas successfully wrote an opening paragraph and described a chaotic scene in the immigration hall, using the senses to enrich his description. Although new to English, he is applying what he learns in class.",
          nextStep: 'To increase the volume of written work he produces in lessons.',
          commentInsight: {
            strengths: ['Great strides in writing', 'Correct grammar and punctuation', 'Organises writing into sections', 'Uses senses in descriptions'],
            concerns: ['Volume of written work needs to increase', 'Still Developing level'],
            suggestions: ['Increase volume of writing', 'Continue using conjunctions and complex words'],
            signals: ['Steady at Developing — volume is the key barrier'],
            familyAction: 'Encourage writing practice at home — short daily entries'
          }
        },
        { name: 'Maths', group: 'Core', attainment: 'Secure', effort: 2, teacherName: 'Mr C Davidson',
          standardised: { academic: 3, effort: 4, stability: 3, independence: 3, progress: 4 },
          comment: "Lucas has demonstrated a solid understanding of the topics taught, confidently recognising equivalent fractions and converting improper fractions to mixed numbers. He is able to convert mixed numbers to improper fractions with some support and is making steady progress with adding and subtracting fractions with the same denominator. In Multiplication and Division, Lucas shows a good grasp of multiples and factors. However, he could achieve even more with greater focus. When engaged, he approaches tasks with determination and continues to improve his skills.",
          nextStep: 'To independently add and subtract fractions with the same denominator.',
          commentInsight: {
            strengths: ['Solid understanding', 'Confident with equivalent fractions', 'Good grasp of multiples and factors', 'Determination when engaged'],
            concerns: ['Focus could improve', 'Needs support with some fraction conversions'],
            suggestions: ['Independent fraction work', 'Greater focus in lessons'],
            signals: ['Improved from Developing to Secure — positive trajectory'],
            familyAction: 'Practice fractions at home; celebrate improvement from Developing'
          }
        },
        { name: 'Science', group: 'Core', attainment: 'Secure', effort: 2, teacherName: 'Mr R Bell',
          standardised: { academic: 3, effort: 4, stability: 3, independence: 3, progress: 3 },
          comment: "In Science, Lucas created a selection of Keynote presentations, comparing the life cycles of mammals, amphibians, insects, and birds, recognising key differences such as metamorphosis in amphibians and insects. He actively participated in practical investigations, using hands-on activities to explore how different materials conduct heat and electricity. With support, Lucas identified objects that allow electricity to flow and those that act as insulators. He also explored how forces like friction and gravity affect motion. His confidence in using scientific vocabulary is steadily improving.",
          nextStep: 'To develop scientific vocabulary to explain observations more clearly.',
          commentInsight: {
            strengths: ['Active participation in practicals', 'Good Keynote presentations', 'Recognises key scientific differences', 'Scientific vocabulary improving'],
            concerns: ['Still needs support identifying conductors/insulators'],
            suggestions: ['Develop scientific vocabulary further'],
            signals: ['Consistent Secure — steady performer'],
            familyAction: 'Practice scientific vocabulary at home; discuss everyday science'
          }
        },
        { name: 'Art and Design', group: 'Creative', attainment: 'Secure', effort: 3, teacherName: 'Miss R Ellender',
          standardised: { academic: 3, effort: 3, stability: 3, independence: 2, progress: 3 },
          comment: "Lucas has explored different materials and processes in his sculpture but has shown some inconsistency in his application. His fish sculpture contains some interesting textural elements, though further refinement would enhance the overall finish. His sketchbook work includes relevant research, but he should develop his annotations to explain how his ideas evolve.",
          nextStep: 'To engage more actively with refining surface details and documenting his creative decisions in more depth.',
          commentInsight: {
            strengths: ['Explores different materials', 'Interesting textural elements', 'Relevant research in sketchbook'],
            concerns: ['Inconsistency in application', 'Needs more refinement', 'Annotations need development'],
            suggestions: ['Refine surface details', 'Document creative decisions in depth'],
            signals: ['Effort dropped to 3 — needs re-engagement'],
            familyAction: 'Encourage art at home; discuss creative process'
          }
        },
        { name: 'Mandarin', group: 'Languages', attainment: 'Secure', effort: 1, teacherName: 'Mrs H Li',
          standardised: { academic: 3, effort: 5, stability: 4, independence: 3, progress: 3 },
          comment: "Lucas is a hard-working pupil who consistently demonstrates effort, as shown in his weekly vocabulary test results. His reading skills are strong, and he shows a good understanding during listening tasks. He engages in class discussions but would benefit from participating more actively to express himself more effectively. In writing, Lucas should focus on improving character accuracy and incorporating similes to add depth and creativity to his work. With continued dedication, he will be able to enhance both his speaking and writing skills.",
          nextStep: 'To actively engage in class discussions and focus on refining writing skills.',
          commentInsight: {
            strengths: ['Hard-working', 'Consistently demonstrates effort', 'Strong reading skills', 'Good listening understanding'],
            concerns: ['Could participate more actively in discussions', 'Character accuracy needs improvement'],
            suggestions: ['More active class participation', 'Improve character accuracy', 'Use similes in writing'],
            signals: ['Best effort grade (1) — Mandarin brings out his best work ethic'],
            familyAction: 'Practice character writing at home; encourage speaking confidence'
          }
        },
        { name: 'Physical Education', group: 'Other', attainment: 'Secure', effort: 1, teacherName: 'Mr L Johnson & Mr D Crush',
          standardised: { academic: 3, effort: 5, stability: 4, independence: 3, progress: 4 },
          comment: "Lucas is a quiet yet attentive member of the class, consistently demonstrating focus and putting in great effort during group activities. He approaches each task with dedication, showing a willingness to try his best and improve his skills, even if he finds certain activities more challenging. Lucas is always respectful of others and works well in team settings, offering support when needed. While Lucas is not always the most confident in physical activities, his determination and hard work help him make steady progress. In Games, Lucas has developed his Striking and Fielding skills.",
          nextStep: 'To improve accuracy when striking a stationary ball, focusing on hitting the ball in the centre of the bat to ensure a clean and precise shot.',
          commentInsight: {
            strengths: ['Attentive and focused', 'Great effort', 'Respectful and works well in teams', 'Determination and hard work'],
            concerns: ['Not always most confident in physical activities'],
            suggestions: ['Improve striking accuracy'],
            signals: ['Improved from Developing to Secure with best effort (1)'],
            familyAction: 'PE is going well — effort is outstanding'
          }
        },
        { name: 'Humanities', group: 'Humanities', attainment: 'Secure', effort: 2, teacherName: 'Mr C Davidson',
          standardised: { academic: 3, effort: 4, stability: 3, independence: 3, progress: 4 },
          comment: "Lucas has shown a growing understanding of geographical skills, such as locating countries on atlases and using four- and six-digit grid references. He is able to plan routes on a map but requires some support to build his confidence and accuracy in these areas. While Lucas has a growing interest in Geography, further practice and guidance will help him strengthen his map-reading skills and fully grasp the concepts.",
          nextStep: 'To use the eight compass points to describe routes on a map with greater confidence and precision.',
          commentInsight: {
            strengths: ['Growing geographical understanding', 'Can locate countries and use grid references', 'Growing interest'],
            concerns: ['Needs support with confidence and accuracy'],
            suggestions: ['Practice compass points and route description'],
            signals: ['Improved from Developing to Secure'],
            familyAction: 'Use maps and atlases at home for fun geography activities'
          }
        },
        { name: 'Music', group: 'Creative', attainment: 'Secure', effort: 2, teacherName: 'Mr A Stratford',
          standardised: { academic: 3, effort: 4, stability: 3, independence: 3, progress: 3 },
          comment: "Lucas is an engaged and enthusiastic pupil who brings a lot of energy to class. He approaches both practical and theoretical aspects of music with curiosity and commitment. Whether it's exploring topics like Mars, the Bringer of War in the Battle music unit or working on the recent adverts project, Lucas has shown great creativity and determination. His positive attitude and willingness to learn make him a pleasure to teach. As he continues to develop his musical skills, I look forward to seeing him tackle even more complex tasks with confidence.",
          nextStep: 'To gain confidence and become more familiar in using the musical vocabulary associated with MR D FITH — our elements of music: Melody, Rhythm, Dynamics, Form, Instrumentation, Texture, and Harmony.',
          commentInsight: {
            strengths: ['Engaged and enthusiastic', 'Great creativity and determination', 'Positive attitude', 'Curious and committed'],
            concerns: [],
            suggestions: ['Learn MR D FITH musical vocabulary'],
            signals: ['Stable Secure — positive attitude'],
            familyAction: 'Help learn MR D FITH elements — make it a game'
          }
        },
        { name: 'PSHE', group: 'Other', attainment: 'Secure', effort: 3, teacherName: 'Mr C Davidson',
          standardised: { academic: 3, effort: 3, stability: 3, independence: 2, progress: 4 },
          comment: "Lucas has demonstrated a thoughtful understanding of Human Rights and their role in protecting individuals. He recognises that feelings can change over time and has considered how everyday experiences can influence emotions. During Kindness Month, Lucas reflected on the importance of kindness, displaying empathy in his interactions with others. He listens attentively and, when prompted, contributes valuable ideas to class discussions, approaching PSHE topics with maturity.",
          nextStep: 'To deepen his understanding of online scams and how to protect himself and others from them.',
          commentInsight: {
            strengths: ['Thoughtful understanding of Human Rights', 'Empathy in interactions', 'Listens attentively', 'Approaches topics with maturity'],
            concerns: ['Only contributes when prompted'],
            suggestions: ['Learn about online safety'],
            signals: ['Improved from Developing to Secure'],
            familyAction: 'Discuss online safety at home'
          }
        },
        { name: 'French', group: 'Languages', attainment: 'Developing', effort: 3, teacherName: 'Mrs N Veronese',
          standardised: { academic: 2, effort: 3, stability: 2, independence: 2, progress: 2 },
          comment: "Lucas has a sound grasp of key French vocabulary and grammar but sometimes lacks focus in class. When engaged, he started producing well-structured sentences using je fais, j'aime, and il y a, demonstrating a sound understanding of sentence structure. However, he needs to ensure consistency in his written work and participation in class discussions. With more regular effort, Lucas has the potential to make good progress.",
          nextStep: 'To improve continuity by applying his knowledge in both spoken and written tasks.',
          commentInsight: {
            strengths: ['Sound grasp of vocabulary and grammar', 'Can produce well-structured sentences when engaged'],
            concerns: ['Sometimes lacks focus', 'Inconsistent written work', 'Needs more participation'],
            suggestions: ['More consistent effort', 'Apply knowledge in spoken and written tasks'],
            signals: ['Steady at Developing with effort 3 — focus is the barrier'],
            familyAction: 'French needs more focus — consider short daily practice'
          }
        },
        { name: 'Computing', group: 'Core', attainment: 'Secure', effort: 1, teacherName: 'Mr R Bell',
          standardised: { academic: 3, effort: 5, stability: 4, independence: 4, progress: 3 },
          comment: "In the Unit of Work titled Systems and Searching, Lucas demonstrated a solid understanding of computer systems and critically examined the way search engines retrieve information. He effectively sourced reliable content and justified his choices. In Video Production, Lucas used a variety of filming techniques and collaborated successfully to enhance his project with meaningful transitions. His vector graphics design showcased careful planning in combining shapes, colours, and layering techniques to create a well-balanced digital drawing. His coding work involved writing and debugging conditional statements on the micro:bit, demonstrating problem-solving skills.",
          nextStep: 'To investigate relational databases, exploring how linked datasets can be used to manage and retrieve information effectively.',
          commentInsight: {
            strengths: ['Solid understanding of systems', 'Good filming techniques', 'Careful planning in design', 'Problem-solving in coding'],
            concerns: [],
            suggestions: ['Explore relational databases'],
            signals: ['Strong with best effort (1) — computing could be a strength'],
            familyAction: 'Computing is going very well — support coding interest'
          }
        },
        { name: 'Drama', group: 'Creative', attainment: 'Developing', effort: 2, teacherName: 'Miss L Mills',
          standardised: { academic: 2, effort: 4, stability: 2, independence: 2, progress: 2 },
          comment: "Lucas is beginning to explore physical theatre and the jungle theme in Drama this year. He has shown effort in participating during lessons, using body movements to represent characters and settings. While Lucas is starting to develop an understanding of how tone, pitch, and intonation can enhance his performance, he is encouraged to practice projecting his voice with more clarity and confidence. His monologue demonstrated an emerging understanding of character and showed promise. However, Lucas' behaviour at times can distract from his progress, and he is reminded to stay focused and work collaboratively with others. With consistent effort and improved focus, Lucas has the potential to make significant progress in Drama.",
          nextStep: 'To focus more and reduce distractions during activities.',
          commentInsight: {
            strengths: ['Effort in participating', 'Emerging understanding of character', 'Monologue showed promise'],
            concerns: ['Behaviour can distract from progress', 'Voice projection needs work', 'Needs to stay focused'],
            suggestions: ['Project voice with clarity', 'Stay focused and collaborative'],
            signals: ['Focus and behaviour issues specific to Drama'],
            familyAction: 'Practice voice projection at home; discuss focus strategies'
          }
        },
        { name: 'Dance', group: 'Creative', attainment: 'Secure', effort: 2, teacherName: 'Ms F Goh',
          standardised: { academic: 3, effort: 4, stability: 3, independence: 4, progress: 3 },
          comment: "Lucas excels in synchronising movements with music, delivering powerful and expressive performances. His ability to lead and inspire in group formations is commendable. Lucas' charisma and strong technique ensure that his performances are both technically advanced and emotionally rich. His clear understanding of musical dynamics allows him to adjust his movements to match the mood of the music, making his performances both compelling and dynamic. His leadership in group routines is a key strength.",
          nextStep: 'To explore deeper character work to enhance emotional storytelling.',
          commentInsight: {
            strengths: ['Excels in synchronising with music', 'Powerful and expressive', 'Leadership in group formations', 'Charisma and strong technique'],
            concerns: [],
            suggestions: ['Deeper character work for emotional storytelling'],
            signals: ['Strong performer — leadership qualities emerge in Dance'],
            familyAction: 'Dance is a hidden strength — consider supporting this interest'
          }
        },
      ],
      overallComment: "Lucas is an independent and open-minded learner who approaches tasks with a thoughtful and honest attitude. He is a kind and respectful member of the class, always treating others with consideration. His integrity and willingness to do the right thing make him a valued part of the school community. He should take pride in the effort he has put into his homework this term. Lucas would benefit from being more actively involved in lessons by sharing his ideas and engaging more with class discussions. With increased participation, Lucas will continue to grow in confidence and make even greater progress. Well done, Lucas.",
    },

    // ============================================================
    // REPORT 3: End of Year 5 (2024-25) — Overall comment with progress
    // ============================================================
    {
      id: 'lucas-y5-eoy',
      academicYear: '2024-2025',
      term: 'Y5 End of Year',
      termIndex: 2,
      schoolSection: 'Junior School',
      reportDate: '2025-06',
      reportType: 'End of Year Report',
      attendance: { present: 100, late: 0 },
      className: '5CD',
      subjects: [
        { name: 'Reading', group: 'Core', attainment: 'Developing', progress: 'Above', effort: 2, teacherName: 'Mr C Davidson',
          standardised: { academic: 2, effort: 4, stability: 3, independence: 3, progress: 5 } },
        { name: 'Writing', group: 'Core', attainment: 'Developing', progress: 'Expected', effort: 2, teacherName: 'Mr C Davidson',
          standardised: { academic: 2, effort: 4, stability: 3, independence: 2, progress: 3 } },
        { name: 'Maths', group: 'Core', attainment: 'Secure', progress: 'Above', effort: 2, teacherName: 'Mr C Davidson',
          standardised: { academic: 3, effort: 4, stability: 3, independence: 3, progress: 5 } },
        { name: 'Science', group: 'Core', attainment: 'Secure', progress: 'Expected', effort: 2, teacherName: 'Mr R Bell',
          standardised: { academic: 3, effort: 4, stability: 3, independence: 3, progress: 3 } },
        { name: 'Art and Design', group: 'Creative', attainment: 'Secure', progress: 'Expected', effort: 2, teacherName: 'Ms R Ellender',
          standardised: { academic: 3, effort: 4, stability: 3, independence: 3, progress: 3 } },
        { name: 'Mandarin', group: 'Languages', attainment: 'Secure', progress: 'Expected', effort: 1, teacherName: 'Mrs H Li',
          standardised: { academic: 3, effort: 5, stability: 4, independence: 3, progress: 3 } },
        { name: 'Physical Education', group: 'Other', attainment: 'Developing', progress: 'Expected', effort: 1, teacherName: 'Mr L Johnson & Mr D Crush',
          standardised: { academic: 2, effort: 5, stability: 3, independence: 3, progress: 3 } },
        { name: 'Humanities', group: 'Humanities', attainment: 'Secure', progress: 'Above', effort: 2, teacherName: 'Mr C Davidson',
          standardised: { academic: 3, effort: 4, stability: 3, independence: 3, progress: 5 } },
        { name: 'Music', group: 'Creative', attainment: 'Secure', progress: 'Expected', effort: 2, teacherName: 'Mr A Stratford',
          standardised: { academic: 3, effort: 4, stability: 3, independence: 3, progress: 3 } },
        { name: 'PSHE', group: 'Other', attainment: 'Secure', progress: 'Above', effort: 1, teacherName: 'Mr C Davidson',
          standardised: { academic: 3, effort: 5, stability: 4, independence: 4, progress: 5 } },
        { name: 'French', group: 'Languages', attainment: 'Developing', progress: 'Expected', effort: 2, teacherName: 'Mrs N Veronese',
          standardised: { academic: 2, effort: 4, stability: 2, independence: 2, progress: 3 } },
        { name: 'Computing', group: 'Core', attainment: 'Secure', progress: 'Expected', effort: 1, teacherName: 'Mr R Bell',
          standardised: { academic: 3, effort: 5, stability: 4, independence: 4, progress: 3 } },
        { name: 'Drama', group: 'Creative', attainment: 'Developing', progress: 'Below', effort: 2, teacherName: 'Miss L Mills',
          standardised: { academic: 2, effort: 4, stability: 2, independence: 2, progress: 1 } },
        { name: 'Dance', group: 'Creative', attainment: 'Developing', progress: 'Below', effort: 2, teacherName: 'Mr J Cerda',
          standardised: { academic: 2, effort: 4, stability: 2, independence: 2, progress: 1 } },
      ],
      overallComment: "Lucas has had a great term, showing great perseverance and a strong desire to improve in his learning. He approaches tasks with growing confidence and demonstrates creativity. Lucas takes feedback on board, and is becoming more independent in his learning. A standout moment this term was his achievement in LAMDA, where his expressive performance and hard work really shone. Lucas should be proud of the progress he has made. Well done, Lucas -- keep up the excellent effort.\n\nLucas has made good progress this term in English. He has strengthened his reading skills, expanding his vocabulary and improving his ability to retrieve information and explain his ideas clearly. While exploring Skellig, Lucas discussed what the story might be about from its cover and blurb, listened attentively, and summarised the plot with support. He is developing his writing skills by practising vivid setting descriptions, drawing inferences with evidence, and beginning to write internal monologues.\n\nLucas has had a good term in Maths, showing steady progress across various topics. He confidently draws and interprets line graphs, reads tables accurately, and applies these skills well in Statistics. In Position and Direction, Lucas reads and plots coordinates with increasing confidence and understands lines of symmetry, as well as reflections in horizontal and vertical lines. In Shape, he classifies and estimates angles effectively. His quick recall of all times tables supports his fluency and calculation speed.",
      nextSteps: 'To continue developing confidence and fluency in speaking by sharing ideas more frequently during class discussions. To read over his work to check for missing words and errors. To improve accuracy when estimating angles to deepen his understanding.',
    },

    // ============================================================
    // REPORT 4: Year 6 Term 1 (2025-26) — Progress Report
    // ============================================================
    {
      id: 'lucas-y6-t1',
      academicYear: '2025-2026',
      term: 'Y6 Term 1',
      termIndex: 3,
      schoolSection: 'Junior School',
      reportDate: '2025-12',
      reportType: 'Progress Report',
      className: '6AS',
      subjects: [
        { name: 'Reading', group: 'Core', attainment: 'Developing', effort: 3, teacherName: "Ms O'Connell and Mrs Little",
          standardised: { academic: 2, effort: 3, stability: 2, independence: 2, progress: 2 } },
        { name: 'Writing', group: 'Core', attainment: 'Developing', effort: 3, teacherName: "Ms O'Connell and Mrs Little",
          standardised: { academic: 2, effort: 3, stability: 2, independence: 2, progress: 2 } },
        { name: 'Maths', group: 'Core', attainment: 'Developing', effort: 3, teacherName: 'Ms S Lill',
          standardised: { academic: 2, effort: 3, stability: 2, independence: 2, progress: 2 } },
        { name: 'Science', group: 'Core', attainment: 'Meeting', effort: 1, teacherName: 'Mr C Metcalfe',
          standardised: { academic: 3, effort: 5, stability: 4, independence: 4, progress: 3 } },
        { name: 'Art and Design', group: 'Creative', attainment: 'Above', effort: 2, teacherName: 'Mr S Binning',
          standardised: { academic: 4, effort: 4, stability: 4, independence: 4, progress: 4 } },
        { name: 'Games', group: 'Other', attainment: 'Developing', effort: 2, teacherName: 'Mr L Johnson',
          standardised: { academic: 2, effort: 4, stability: 3, independence: 3, progress: 2 } },
        { name: 'Humanities', group: 'Humanities', attainment: 'Meeting', effort: 2, teacherName: 'Ms N Feaver',
          standardised: { academic: 3, effort: 4, stability: 3, independence: 3, progress: 3 } },
        { name: 'Music', group: 'Creative', attainment: 'Meeting', effort: 2, teacherName: 'Mr A Stratford',
          standardised: { academic: 3, effort: 4, stability: 3, independence: 3, progress: 3 } },
        { name: 'PSHE', group: 'Other', attainment: 'Meeting', effort: 2, teacherName: 'Mr T Handley',
          standardised: { academic: 3, effort: 4, stability: 3, independence: 3, progress: 3 } },
        { name: 'Computing', group: 'Core', attainment: 'Meeting', effort: 1, teacherName: 'Mr J Snell',
          standardised: { academic: 3, effort: 5, stability: 4, independence: 4, progress: 3 } },
        { name: 'Drama', group: 'Creative', attainment: 'Meeting', effort: 1, teacherName: 'Mrs C Snell',
          standardised: { academic: 3, effort: 5, stability: 4, independence: 4, progress: 4 } },
        { name: 'Swimming', group: 'Other', attainment: 'Developing', effort: 1, teacherName: 'Mr L Johnson',
          standardised: { academic: 2, effort: 5, stability: 3, independence: 3, progress: 2 } },
      ],
      overallComment: "Lucas has had a positive start to Year 6 and has shown genuine enthusiasm in his learning, particularly in Science, where he enjoyed exploring microorganisms and learning more about plants. He demonstrates curiosity and interest in classroom discussions and is proud of his growing confidence. Lucas has also taken part in a range of CCAs this term, including football, sustainability club, homework club, and 3D printing, showing a good balance of academic and creative interests.\n\nLucas is a kind and polite pupil who approaches school life with a positive attitude. However, he sometimes finds organisation challenging and can struggle to manage his belongings, occasionally misplacing items around school or leaving them at home. Meeting homework deadlines, particularly in Maths, has also been an area of difficulty this term. With continued encouragement and support, Lucas has the potential to make excellent progress in all areas next term.\n\nLucas has made steady progress this term and shows genuine enthusiasm for reading and creative writing. He can need refocusing during tasks, but he responds well to support for reading comprehension work. Lucas engaged thoughtfully with our class novels, 'Journey to Jo'burg' and 'Stormbreaker' and demonstrated good understanding of characters' emotions and motivations through class discussions. His creative writing reveals a developing imagination and willingness to experiment with different writing styles. Lucas's grammar and syntax structure is developing as he learns to formulate his ideas using correct punctuation.\n\nEnglish Language Support (ELS): Lucas is making progress, although is occasionally needs reminders to stay focused. He speaks confidently and supports peers in discussions. His reading comprehension has reached Year 5 level, and he engages thoughtfully with texts. Writing strategies are at Year 4/5 level, and grammar is also at Year 4/5 level. Lucas has written diary entries with varied structures, including compound sentences and his vocabulary is approaching Year 6 level. To maximise progress, Lucas should complete around 60 minutes of IXL and 60 minutes of Clear Fluency per week. Lucas will stay on ELS next term to continue developing his English language skills.\n\nLucas is a mixed bag in Maths; when he applies himself, he works really hard and has the potential to achieve high scores. However, his attitude is sometimes too relaxed, and he can be distracted by others, which affects his progress. He performed well on the place value unit, but the unit on the four number operations proved more challenging, and he needs to focus carefully on what the questions are asking. This was reflected in his end-of-unit assessment, which showed a similar pattern. I have been pleased to see an improved attitude towards his homework, although since the half-term it has been a little less consistent. With continued effort, I am confident he can make strong progress.",
      nextSteps: "To build on his positive attitude, Lucas should focus on improving his organisation and time management skills. Establishing simple routines, such as checking his bag and planner each morning and afternoon, will help him stay prepared for learning and meet deadlines more consistently. To use compound sentences and a wider range of vocabulary more consistently in written work. To focus in class and read questions carefully to improve accuracy and confidence. To proofread and edit his work for syntax and tense errors.",
    },
  ],

  goals: [
    {
      id: 'lg1',
      term: 'Y6 Term 2 2025-2026',
      type: 'academic',
      title: 'English: Close the gap before Senior School',
      reason: 'Reading at Y5 level, Writing at Y4/5 level — still 1-2 years behind. Effort dropped to 3 in Y6T1. ELS continuing. Senior School (Y7) English expects PEEL paragraphs, inference, creative writing. Must reach Y6 level by end of year.',
      priority: 'High',
      timeBudget: '60 min IXL + 60 min Clear Fluency per week + 15 min daily reading',
      owner: 'Lucas + Parents',
      status: 'in-progress',
      observations: ['Reading comprehension reached Y5 level', 'Vocabulary approaching Y6', 'Speaks confidently and supports peers', 'Engaged with Journey to Jo\'burg and Stormbreaker', 'Grammar/syntax at Y4/5 — needs compound sentences practice', 'Proofread work for missing words and tense errors']
    },
    {
      id: 'lg2',
      term: 'Y6 Term 2 2025-2026',
      type: 'academic',
      title: 'Maths: Recover from Developing, master four operations',
      reason: 'Dropped from Secure(Y5) to Developing(Y6T1) with effort 3. Teacher says "mixed bag" — high potential when focused. Four number operations challenging. Senior School Maths requires fluent calculation.',
      priority: 'High',
      timeBudget: '15 min daily maths practice (IXL or workbook)',
      owner: 'Lucas + Parents',
      status: 'in-progress',
      observations: ['Place value unit went well', 'Four operations unit was harder', 'Needs to read questions carefully', 'Times tables recall is good — build on this', 'Homework consistency dropped after half-term', 'Teacher confident he can make strong progress']
    },
    {
      id: 'lg3',
      term: 'Y6 Term 2 2025-2026',
      type: 'habit',
      title: 'Organisation routine: bag check + planner + homework',
      reason: 'Organisation is a cross-cutting concern — misplaces belongings, homework deadlines missed, effort grades dropped to 3 in core subjects. Senior School demands much more independence.',
      priority: 'High',
      timeBudget: '5 min morning + 5 min afternoon routine',
      owner: 'Lucas + Parents',
      status: 'in-progress',
      observations: ['Improved attitude initially but less consistent after half-term', 'Morning routine: check bag, planner, homework', 'Afternoon routine: pack bag, check planner for next day', 'Parents to spot-check 3x/week initially', 'Homework club CCA helps — continue attending']
    },
    {
      id: 'lg4',
      term: 'Y6 Term 2 2025-2026',
      type: 'habit',
      title: 'Focus in lessons: reduce distractions',
      reason: 'Multiple teachers note refocusing needed. Effort grade dropped to 3 in Reading/Writing/Maths in Y6T1. Drama teacher noted behaviour distractions in Y5. When engaged, produces excellent work.',
      priority: 'Medium',
      timeBudget: 'Daily practice: set timer for focused work blocks',
      owner: 'Lucas',
      status: 'in-progress',
      observations: ['Responds well to support and reminders', 'Science (effort 1) and Computing (effort 1) show he CAN focus when interested', 'Drama effort improved from 2 to 1 in Y6T1', 'Try Pomodoro technique: 15-min focus blocks at home']
    },
    {
      id: 'lg5',
      term: 'Y6 Term 2 2025-2026',
      type: 'strength',
      title: 'Art, Science & Computing: invest in strengths',
      reason: 'Art is Above (highest grade in Y6). Science and Computing both have effort 1. Drama improved to effort 1. These subjects show Lucas at his best — genuine interest drives excellent effort.',
      priority: 'Medium',
      timeBudget: 'CCAs (sustainability, 3D printing) + home projects',
      owner: 'Lucas',
      status: 'on-track',
      observations: ['Art: Above grade — only subject above Meeting', 'Science: effort 1, enjoys microorganisms and plants', 'Computing: effort 1, strong coding with micro:bit', 'Drama: effort 1, improved confidence', 'LAMDA achievement in Y5 — performance strength', 'CCAs: sustainability club, 3D printing']
    },
    {
      id: 'lg6',
      term: 'Y6 Term 2 2025-2026',
      type: 'academic',
      title: 'Senior School transition preparation',
      reason: 'Lucas moves to Senior School (Y7) next year. Must be prepared for: independent homework system, PEEL writing, multiple subject teachers, higher academic expectations. Use Y6 to build foundations.',
      priority: 'Medium',
      timeBudget: 'Ongoing — build habits gradually',
      owner: 'Lucas + Family',
      status: 'in-progress',
      observations: ['Speaking confidence has grown significantly since Y5', 'Independence improving (was 2 in Y5T1, now 3)', 'Perseverance is a strength (5/5)', 'Takes feedback on board — great asset for transition', 'Practice writing PEEL paragraphs to prepare for Senior School English']
    }
  ],

  behaviorIndicators: {
    speakingConfidence: { current: 3, trend: 'improving', history: [2, 3, 3, 3] },
    focusInLessons: { current: 3, trend: 'stable', history: [2, 3, 3, 3] },
    independence: { current: 3, trend: 'improving', history: [2, 3, 3, 3] },
    organisation: { current: 2, trend: 'declining', history: [2, 3, 3, 2] },
    perseverance: { current: 4, trend: 'improving', history: [3, 3, 4, 4] }
  },

  warnings: [
    {
      type: 'recurring',
      subject: 'English (Reading & Writing)',
      message: 'Both Reading and Writing remain at Developing with effort grade dropped to 3. ELS programme continuing. Reading comprehension at Y5 level, writing at Y4/5. Needs 60 min IXL + 60 min Clear Fluency weekly.',
      severity: 'high'
    },
    {
      type: 'declining',
      subject: 'Maths',
      message: 'Dropped from Secure (Y5) to Developing (Y6T1) with effort grade 3. Focus and homework consistency are concerns. Teacher notes "mixed bag" — potential is there when he applies himself.',
      severity: 'high'
    },
    {
      type: 'recurring',
      subject: 'Organisation',
      message: 'Organisation is a cross-cutting concern — misplaces belongings, homework deadlines missed. Need to establish morning/afternoon bag check routine.',
      severity: 'medium'
    }
  ],

  strengths: [
    {
      subject: 'Art and Design',
      evidence: ['Above attainment in Y6T1 — highest grade', 'Consistent Secure throughout Y5', 'Shows creativity and willingness to experiment'],
      recommendation: "Art is Lucas's strongest academic area. The Above grade in Y6 shows genuine talent. Support with art materials at home and consider art enrichment activities.",
      investmentLevel: 'high'
    },
    {
      subject: 'Science & Computing',
      evidence: ['Science: best effort (1) in Y6T1', 'Computing: effort 1 across multiple terms', 'Enjoys microorganisms, plants', 'Good problem-solving in coding'],
      recommendation: "Science and Computing consistently bring out Lucas's best effort (grade 1). These subjects show intrinsic motivation. Support with STEM activities and coding.",
      investmentLevel: 'medium'
    },
    {
      subject: 'Dance & Performance',
      evidence: ['Excels in synchronising with music', 'Leadership in group formations', 'Charisma and strong technique', 'LAMDA achievement in Y5'],
      recommendation: "Dance and performance are hidden strengths where Lucas shows leadership, charisma, and confidence not seen elsewhere. LAMDA was a standout achievement.",
      investmentLevel: 'medium'
    }
  ]
};
