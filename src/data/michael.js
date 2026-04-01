// Real data extracted from Brighton College (Singapore) reports
// Grading: Attainment = Excelling/Above/Meeting/Below
// Classwork/Homework/Organisation: 1 (best) to 4 (worst)

const attainmentToScore = { 'Excelling': 5, 'Above': 4, 'Meeting': 3, 'Below': 2 };
const invertScore = v => v ? ({ 1: 5, 2: 4, 3: 3, 4: 2 })[v] || 3 : 3;

export const michael = {
  id: 'michael',
  name: 'Michael',
  chineseName: 'Yu Sun',
  school: 'Brighton College (Singapore)',
  yearGroup: 'Year 8',
  stage: 'Senior School',
  avatar: '/michael-avatar.png',
  focusSubjects: ['English', 'Science', 'Mathematics'],
  familyConstraints: ['Both parents work full-time', 'Tuesday & Thursday evenings free for study'],

  reports: [
    // ============================================================
    // REPORT 1: Y7 Term 1 (2024-25) — Progress Report (grades only)
    // ============================================================
    {
      id: 'michael-y7-t1',
      academicYear: '2024-2025',
      term: 'Y7 Term 1',
      termIndex: 0,
      schoolSection: 'Senior School',
      reportDate: '2024-12',
      reportType: 'Progress Report',
      subjects: [
        { name: 'Art', group: 'Creative', attainment: 'Meeting', classwork: 2, homework: 3, organisation: 3, teacherName: 'Miss Ellender',
          standardised: { academic: 3, effort: 4, stability: 3, independence: 3, progress: 3 } },
        { name: 'Computing', group: 'Core', attainment: 'Meeting', classwork: 1, homework: 3, organisation: 3, teacherName: 'Mr Bell',
          standardised: { academic: 3, effort: 5, stability: 3, independence: 3, progress: 3 } },
        { name: 'Design and Technology', group: 'Other', attainment: 'Below', classwork: 2, homework: 3, organisation: 3, teacherName: 'Mr Handley',
          standardised: { academic: 2, effort: 4, stability: 3, independence: 3, progress: 2 } },
        { name: 'Drama', group: 'Creative', attainment: 'Meeting', classwork: 2, homework: 'N/A', organisation: 2, teacherName: 'Ms Poh',
          standardised: { academic: 3, effort: 4, stability: 4, independence: 4, progress: 3 } },
        { name: 'English', group: 'Core', attainment: 'Below', classwork: 3, homework: 4, organisation: 4, teacherName: 'Miss Denholm',
          standardised: { academic: 2, effort: 3, stability: 2, independence: 2, progress: 2 } },
        { name: 'French', group: 'Languages', attainment: 'Meeting', classwork: 3, homework: 3, organisation: 3, teacherName: 'Mrs Veronese',
          standardised: { academic: 3, effort: 3, stability: 3, independence: 3, progress: 3 } },
        { name: 'Mandarin First Language', group: 'Languages', attainment: 'Meeting', classwork: 2, homework: 2, organisation: 3, teacherName: 'Ms Wong',
          standardised: { academic: 3, effort: 4, stability: 3, independence: 3, progress: 3 } },
        { name: 'Mathematics', group: 'Core', attainment: 'Meeting', classwork: 3, homework: 3, organisation: 3, teacherName: 'Mr Singh',
          standardised: { academic: 3, effort: 3, stability: 3, independence: 3, progress: 3 } },
        { name: 'Music', group: 'Creative', attainment: 'Meeting', classwork: 2, homework: 2, organisation: 1, teacherName: 'Mr Stratford',
          standardised: { academic: 3, effort: 4, stability: 5, independence: 5, progress: 3 } },
        { name: 'Physical Education', group: 'Other', attainment: 'Below', classwork: 3, homework: 'N/A', organisation: 3, teacherName: 'Mr Crush',
          standardised: { academic: 2, effort: 3, stability: 3, independence: 3, progress: 2 } },
        { name: 'Science', group: 'Core', attainment: 'Meeting', classwork: 2, homework: 2, organisation: 2, teacherName: 'Mr Holton',
          standardised: { academic: 3, effort: 4, stability: 4, independence: 4, progress: 3 } },
        { name: 'Spanish', group: 'Languages', attainment: 'Meeting', classwork: 3, homework: 3, organisation: 3, teacherName: 'Mrs Veronese',
          standardised: { academic: 3, effort: 3, stability: 3, independence: 3, progress: 3 } },
        { name: 'Story of Our Land', group: 'Humanities', attainment: 'Meeting', classwork: 2, homework: 3, organisation: 2, teacherName: 'Mrs Feaver',
          standardised: { academic: 3, effort: 4, stability: 4, independence: 4, progress: 3 } },
      ],
      overallComment: "Michael is a cheerful, kind and polite pupil who is a joy to have in 7RE. His report reflects his consistent approach to his academic studies, with particular success in Music and Science. While this has been a positive start to the year, organisation is an area for Michael to focus on next term. This has been especially evident in English and Story of Our Land, where his homework has not always been punctual. Encouragingly, Michael's recent self-reflection also highlighted organisation as a key target for improvement, demonstrating his awareness and willingness to grow. He has made valuable contributions to the school's CCA provision, participating in Football, Cross Country, and Hands-On Science. His role as a Science Subject Ambassador has allowed him to share his enthusiasm for the subject, a responsibility he has undertaken with great pride and dedication. Michael's positive attitude to school life are commendable, and I look forward to seeing his continued progress next term.",
      pupilReflection: "Science went well for me because we get to do a lot of fun activities. I feel I have improved in class work because I am now working at a faster pace. I particularly enjoy Science because of the experiments we do, such as heating iron and sulphur together. I would like to improve my performance in PE and English because I received a below-expected grade in these subjects, I plan to practise my English more outside of lessons and I will continue to read. Additionally, I need to work on completing and handing in my homework on time. This term, I have shown a values-focused approach by asking lots of questions and making new friends. Next term, I want to focus more on my co-curricular activities and I am looking forward to being involved in hands on science.",
    },

    // ============================================================
    // REPORT 2: Y7 Term 2 (2024-25) — Full Report (with comments)
    // ============================================================
    {
      id: 'michael-y7-t2',
      academicYear: '2024-2025',
      term: 'Y7 Term 2',
      termIndex: 1,
      schoolSection: 'Senior School',
      reportDate: '2025-03',
      reportType: 'Full Report',
      subjects: [
        { name: 'Art', group: 'Creative', attainment: 'Meeting', classwork: 2, homework: 2, organisation: 2, teacherName: 'Miss Ellender',
          standardised: { academic: 3, effort: 4, stability: 4, independence: 4, progress: 3 },
          comment: "Yu has consistently shown effort and focus in Art this term. He engages well in class discussions, clearly demonstrating his understanding of lino printing techniques inspired by architecture. His prints successfully illustrate key ideas, showing competent carving and compositional awareness. Homework tasks are completed on time to a good standard, reflecting careful attention to detail. To further enhance his outcomes, Yu should focus on refining carving techniques for greater precision and detail. Additionally, experimenting with varied mark-making styles and ink application methods, such as reduction printing, will enrich his prints, enabling him to achieve more complex textures and tonal contrasts.",
          commentInsight: {
            strengths: ['Consistent effort and focus', 'Engages well in discussions', 'Good compositional awareness', 'Homework on time to good standard'],
            concerns: [],
            suggestions: ['Refine carving techniques for precision', 'Experiment with varied mark-making and reduction printing'],
            signals: ['Stable performer — homework has improved from T1'],
            familyAction: 'Art is going well — no specific intervention needed'
          }
        },
        { name: 'Computing', group: 'Core', attainment: 'Meeting', classwork: 2, homework: 2, organisation: 2, teacherName: 'Mr Bell',
          standardised: { academic: 3, effort: 4, stability: 4, independence: 4, progress: 3 },
          comment: "Yu is highly engaged by Computing and consistently applies himself well. His practical work has been a real highlight of the year, from using Scratch to designing presentations about environmental charities. During the latter, he maintained a consistent colour scheme, added an appropriate logo, and ensured his text was easy to read. Yu's learning about artificial intelligence demonstrated accurate explanations and a critical evaluation of AI and AI ethics. When coding, he effectively sequenced subroutines, applied debugging techniques, and used count-controlled iteration to good effect. To develop further, Yu should continue enhancing his understanding of how AI learns. When coding, he should focus on evaluating conditions with AND/OR, further refining selection statements, strengthening his grasp of condition evaluation, and improving his understanding of loop execution.",
          commentInsight: {
            strengths: ['Highly engaged', 'Strong practical work', 'Good AI understanding', 'Effective coding with subroutines and debugging'],
            concerns: [],
            suggestions: ['Enhance understanding of AI learning', 'Focus on AND/OR conditions and selection statements'],
            signals: ['Clear strength and interest area'],
            familyAction: 'Computing aligns well with Science interest — consider coding enrichment'
          }
        },
        { name: 'Design and Technology', group: 'Other', attainment: 'Meeting', classwork: 2, homework: 2, organisation: 2, teacherName: 'Mr Handley',
          standardised: { academic: 3, effort: 4, stability: 4, independence: 4, progress: 4 },
          comment: "Yu has started to approach Design Technology with more confidence and enthusiasm. In graphic design, he has demonstrated a relatively sound understanding of the design brief and was able to produce an end product that met some elements of the design specification. In the Sustainable Cities unit, Yu worked increasingly effectively with his group and was able to explain several aspects of the group's design when producing a rationale for their city. Finally, he has been increasingly involved in whole-class discussions, contributing some good ideas and answers from time to time. In order to develop further in Design Technology, Yu should periodically review the design brief to stay focused and on track. Additionally, he should look to improve the way in which he collaborates with his peers by critically discussing his products.",
          commentInsight: {
            strengths: ['Growing confidence and enthusiasm', 'Sound design brief understanding', 'Effective group work', 'Increasingly involved in discussions'],
            concerns: [],
            suggestions: ['Review design briefs periodically', 'Improve peer collaboration and critical discussion'],
            signals: ['Improved from Below to Meeting — positive trajectory'],
            familyAction: 'DT has improved significantly — acknowledge this progress'
          }
        },
        { name: 'Drama', group: 'Creative', attainment: 'Meeting', classwork: 2, homework: 'N/A', organisation: 2, teacherName: 'Miss Snell',
          standardised: { academic: 3, effort: 4, stability: 4, independence: 4, progress: 3 },
          comment: "Yu is conscientious and hardworking. Although quiet in nature, he is eager to discuss his learning and can clearly explain and justify his decisions. He works well with others and is becoming more confident in sharing his ideas. His thoroughness has been particularly evident in the topic of Mime this term, where he has shown great reflection on his actions and effectively applied any feedback he received. I am very impressed with Yu's focus, effort, and dedication in these lessons, and I look forward to seeing his continued growth and progress in Drama. To improve further, Yu should focus on speaking clearly and loudly enough for the audience to hear and work on maintaining his focus throughout a performance, ensuring he stays in role.",
          commentInsight: {
            strengths: ['Conscientious and hardworking', 'Can explain and justify decisions', 'Great reflection', 'Effectively applies feedback'],
            concerns: ['Quiet in nature — needs to speak clearly and loudly', 'Maintaining focus in performance'],
            suggestions: ['Speak more clearly and loudly', 'Stay in role throughout performance'],
            signals: ['Growing confidence — responds well to feedback'],
            familyAction: 'Encourage speaking confidence — practice at home presentations'
          }
        },
        { name: 'English', group: 'Core', attainment: 'Meeting', classwork: 2, homework: 2, organisation: 3, teacherName: 'Miss Denholm',
          standardised: { academic: 3, effort: 4, stability: 3, independence: 3, progress: 4 },
          comment: "In recent English lessons, Yu has shown an improved pace in completing work, and I encourage him to maintain this. He is creative and imaginative, as demonstrated in his writing tasks. He can comprehend a text, making inferences about character and setting, and is beginning to critically engage with literature by suggesting deeper meanings. Yu's homework is inconsistent, and he would benefit from more regular effort. His reading age has increased this year, though it remains slightly below his actual age. Reading daily for pleasure will help him improve further and access the wider curriculum. To progress, Yu should develop his organisational skills, ensuring he is fully equipped and ready to learn, and that classwork and homework are completed on time and to a high standard. He should also focus on paragraphing his written work more carefully and using the correct tense.",
          commentInsight: {
            strengths: ['Improved pace', 'Creative and imaginative writing', 'Good comprehension and inference', 'Beginning critical engagement with literature'],
            concerns: ['Homework inconsistent', 'Reading age slightly below actual age', 'Organisation needs improvement', 'Paragraphing and tense usage'],
            suggestions: ['Read daily for pleasure', 'Develop organisational skills', 'Focus on paragraphing and tense'],
            signals: ['Improved from Below to Meeting — but homework remains inconsistent'],
            familyAction: 'Establish daily reading habit (15-20 min); check homework completion regularly'
          }
        },
        { name: 'English Language Support', group: 'Core', attainment: 'SLATE 5', classwork: 2, homework: 3, organisation: 3, teacherName: 'Mrs Little',
          standardised: { academic: 3, effort: 4, stability: 3, independence: 3, progress: 4 },
          comment: "Yu is cheerful and polite with a great sense of humour. He has made excellent progress and has met the criteria to exit the Intermediate English Language Support Programme. He is thoughtful and able to explore ideas from different perspectives when engaged. Yu has sometimes taken his time to start tasks, although this has improved recently. However, he shows an empathetic and analytical approach to English literature. His SLATE iTEP results confirm his upper intermediate (B2) ability; he demonstrates particular strengths in listening and reading (6.0, advanced). His writing (5.0, upper intermediate) is structured but requires greater grammatical accuracy. Additionally, his speaking and grammar (4.0, intermediate) show room for fluency and precision. To progress further, Yu can refine grammatical accuracy in writing and speaking while expanding his ability to start tasks more promptly.",
          commentInsight: {
            strengths: ['Excellent progress — exiting ELS programme', 'Upper intermediate B2 level', 'Advanced listening and reading (6.0)', 'Empathetic and analytical approach'],
            concerns: ['Slow to start tasks', 'Speaking and grammar at intermediate level', 'Writing needs grammatical accuracy'],
            suggestions: ['Refine grammatical accuracy', 'Start tasks more promptly'],
            signals: ['Major milestone — exiting ELS programme'],
            familyAction: 'Celebrate ELS exit! Continue supporting English at home with reading'
          }
        },
        { name: 'Mandarin First Language', group: 'Languages', attainment: 'Meeting', classwork: 2, homework: 3, organisation: 3, teacherName: 'Ms Wong',
          standardised: { academic: 3, effort: 4, stability: 3, independence: 3, progress: 3 },
          comment: "Yu is a thoughtful learner who takes time to process new concepts. He listens attentively and contributes when encouraged. While he works at a slower pace, his careful thinking and attention to detail benefit his writing. Improving time-management will help him complete tasks more efficiently. This term, we were focusing on descriptive reading and writing. Yu understands how to structure descriptions and is beginning to apply rhetorical devices. His creativity is evident, and when he refines his work, his ideas shine through. He has made progress in organising thoughts more clearly, though completing work on time remains an area for growth. Yu's target is to manage time effectively and submit work on time to develop stronger writing consistency and clarity.",
          commentInsight: {
            strengths: ['Thoughtful learner', 'Attentive listener', 'Careful thinking and attention to detail', 'Creativity evident in writing'],
            concerns: ['Slower pace', 'Time management', 'Completing work on time'],
            suggestions: ['Manage time effectively', 'Submit work on time'],
            signals: ['Consistent Meeting — needs pace improvement'],
            familyAction: 'Help with time management strategies for Mandarin homework'
          }
        },
        { name: 'Mathematics', group: 'Core', attainment: 'Meeting', classwork: 3, homework: 3, organisation: 2, teacherName: 'Ms Hah',
          standardised: { academic: 3, effort: 3, stability: 4, independence: 4, progress: 3 },
          comment: "Yu has demonstrated an understanding of basic single-step equations, and he has made progress in his understanding of perimeter and area. He can calculate the perimeter and area for basic shapes, and his ability to apply the relevant formula is improving. He is also developing the ability to apply the formulae correctly. He also understands the basic concepts of factors, multiples, and prime numbers and is applying these concepts to solve problems. Yu can create a personal Maths glossary containing key terms and definitions. He would benefit from additional practise with simpler problems, focusing on building confidence in solving basic equations before progressing to more complex multi-step problems.",
          commentInsight: {
            strengths: ['Understands basic equations', 'Progress in perimeter and area', 'Grasps factors, multiples, primes'],
            concerns: ['Needs more practice with simpler problems', 'Classwork effort could improve'],
            suggestions: ['Additional practice with basic equations', 'Build confidence before complex problems', 'Create personal Maths glossary'],
            signals: ['Stable but needs to push harder'],
            familyAction: 'Daily maths practice on basic skills; use glossary approach'
          }
        },
        { name: 'Music', group: 'Creative', attainment: 'Meeting', classwork: 2, homework: 2, organisation: 1, teacherName: 'Mr Stratford',
          standardised: { academic: 3, effort: 4, stability: 5, independence: 5, progress: 3 },
          comment: "Michael has demonstrated a thoughtful and dedicated approach to his studies in Music this year. He clearly enjoys and excels in the practical aspects of the subject, particularly when it comes to playing instruments and participating in group performances. While Michael shows great enthusiasm in these hands-on activities, there is an opportunity for him to grow in confidence and contribute more actively during class discussions. Encouraging him to share his insights and ideas will not only boost his self-assurance but also enhance the learning experience for everyone. Overall, Michael has a positive attitude towards Music and has shown great potential for further development. With continued support and encouragement, I look forward to seeing him build on his skills and continue to grow throughout the year.",
          commentInsight: {
            strengths: ['Thoughtful and dedicated', 'Excels in practical work', 'Enjoys instruments and group performances', 'Great enthusiasm'],
            concerns: ['Could contribute more in class discussions'],
            suggestions: ['Share insights more actively in discussions'],
            signals: ['Best organisation score (1) — Music brings out his best'],
            familyAction: 'Music is a strength area — support continued instrument practice'
          }
        },
        { name: 'Physical Education', group: 'Other', attainment: 'Below', classwork: 2, homework: 'N/A', organisation: 2, teacherName: 'Mr Crush',
          standardised: { academic: 2, effort: 4, stability: 4, independence: 4, progress: 2 },
          comment: "Yu has demonstrated determination in all events this term, but there is certainly potential for improvement. He completed the 100m in 28.23 seconds and the 400m in 1 minute 53 seconds, highlighting the need for significant improvements in both cardiovascular fitness and speed. In the jumping events, his high jump clearance of 0.75m and triple jump result of 3.5m show developing ability, while his long jump of 1.8m was a respectable attempt. In the throwing events, his shot put throw of 9m demonstrated a decent level of upper-body strength. However, his javelin and discus throws require refinement, particularly in coordination. Moving forward, a focus on improving general fitness, as well as developing fundamental techniques, will not only help enhance his athletic performance but also support progress across all areas of the curriculum.",
          commentInsight: {
            strengths: ['Determination in all events', 'Decent upper-body strength (shot put 9m)'],
            concerns: ['Cardiovascular fitness needs improvement', '100m: 28.23s, 400m: 1:53', 'Javelin and discus coordination'],
            suggestions: ['Improve general fitness', 'Develop fundamental techniques'],
            signals: ['Below expectation — needs sustained fitness focus'],
            familyAction: 'Encourage regular physical activity outside school; consider a sport Michael enjoys'
          }
        },
        { name: 'Science', group: 'Core', attainment: 'Meeting', classwork: 2, homework: 2, organisation: 2, teacherName: 'Mr Holton',
          standardised: { academic: 3, effort: 4, stability: 4, independence: 4, progress: 3 },
          comment: "Yu has a very strong interest in Science and loves to be in the laboratory. He is sometimes distracted by items around him and should make sure he maintains focus. His assessments show a fairly good understanding of the content. He should also review past-paper style questions in order to understand the common marking points of a test. His hands-on skills are good, and he enjoys practical work a great deal. His group work skills are developing, during which he should ensure he listens to the input of others in and can give them constructive feedback. To improve further, Yu should review and preview scientific vocabulary and concepts using the Kerboodle online textbook at home. He is fantastically enthusiastic about the sciences, but his work would benefit from more structured study before and after class.",
          commentInsight: {
            strengths: ['Very strong interest', 'Loves the laboratory', 'Good hands-on skills', 'Fantastically enthusiastic'],
            concerns: ['Sometimes distracted', 'Group work skills developing', 'Needs more structured study'],
            suggestions: ['Review past-paper style questions', 'Use Kerboodle textbook at home', 'Preview and review vocabulary'],
            signals: ['Strongest interest area — Science Ambassador role confirms this'],
            familyAction: 'Support structured Science revision; use Kerboodle at home; celebrate enthusiasm'
          }
        },
        { name: 'Spanish', group: 'Languages', attainment: 'Meeting', classwork: 2, homework: 3, organisation: 2, teacherName: 'Mrs Veronese',
          standardised: { academic: 3, effort: 4, stability: 4, independence: 4, progress: 3 },
          comment: "Yu has continued to find Spanish challenging, but he has made some progress over the year. He could, however, have made more progress if he had pushed himself harder and taken more care to complete his homework on time and learn key structures regularly. Yu really must take a more active part in his learning. When he uses the resources to help with the vocabulary, he can understand the texts he is working on, but when they are removed, he starts struggling. Moving forward, Yu has to make sure he learns by heart a set of opinions and reasons that we have learnt, as well as the key verbs to describe free time. Once he can recollect this vocabulary faster, he will feel more confident in all the four skills.",
          commentInsight: {
            strengths: ['Made some progress', 'Can understand texts with resources'],
            concerns: ['Finds Spanish challenging', 'Homework not always on time', 'Struggles without resources', 'Needs more active participation'],
            suggestions: ['Learn key vocabulary by heart', 'Complete homework on time', 'Take more active role in learning'],
            signals: ['Consistent concern — needs sustained family support'],
            familyAction: 'Regular Spanish vocabulary practice at home (flash cards); check homework'
          }
        },
        { name: 'Story of Our Land', group: 'Humanities', attainment: 'Below', classwork: 3, homework: 2, organisation: 3, teacherName: 'Mrs Feaver',
          standardised: { academic: 2, effort: 3, stability: 3, independence: 3, progress: 3 },
          comment: "Yu has made good progress in Story of Our Land since the beginning of the year. In a recent assessment, I was pleased to see Yu was able to identify two reasons why the British lost Singapore as a colony to the Japanese in World War 2. Yu's classwork is usually neat and presentable, however, his homework is not always handed in on time. To progress, Yu should use the sentence starters provided to help him to correctly structure his PEEL (point, evidence, explain, link) paragraphs. This will allow him to add more detail to his answers and to ensure that he is including everything he needs to gain more marks. I would like to encourage Yu to contribute more in lessons, whether this is to ask a question or to ask for clarification if he is unsure about a concept.",
          commentInsight: {
            strengths: ['Good progress since start of year', 'Neat and presentable classwork', 'Can identify key historical reasons'],
            concerns: ['Homework not always on time', 'Needs to contribute more in lessons'],
            suggestions: ['Use PEEL paragraph structure', 'Contribute more in lessons', 'Ask questions when unsure'],
            signals: ['Below but progressing — homework punctuality is cross-subject issue'],
            familyAction: 'Practice PEEL paragraph structure; ensure SOOL homework is submitted on time'
          }
        },
      ],
      overallComment: "Yu has a great sense of humour and approaches tasks at his own pace. While working that way may suit him, he would benefit from acting with more urgency on occasion to ensure he makes the most of his learning opportunities. Academically, he is performing well in Computing, Science (particularly Biology), and SOOL, where he demonstrates confidence and understanding. However, he needs to improve his effort in Maths, Spanish, and PE, as greater commitment in these areas would help him progress further. Yu does not currently hold any leadership responsibilities, but this is something he should consider. Taking on one of these roles could help him develop his organisational skills and build confidence in public speaking, which would be beneficial for his overall growth.",
      pupilReflection: "This term, I passed the SLATE test and improved my organisation skills. I am pleased with my progress in DT, Spanish, and English. I really enjoyed Science because we did many fun experiments, and another pupil and I are starting to plan a computation project. I will work to improve my PE and SOOL grades, as well as all my other grades, since I haven't received any 'Above' or 'Excelling' grades yet. To do this, I will focus on doing more revision. This term, I have shown curiosity and kindness by asking questions and helping others. I also attended some leadership opportunities, including being a Science Ambassador. Next term, I aim to attend more leadership opportunities and work towards achieving no 'Below' grades. I will also put in more effort with my homework and assessments.",
      headOfCollegeComment: "Yu is a charming young man, who is popular with both staff and pupils. He is extremely polite, kind and enthusiastic about many different areas of school. Whilst I know he loves Science and loves to spend time in the lab, I am also impressed by his dedication to improve his fitness, as I saw in the cross-country CCA last term, and through playing football this term. I look forward to seeing how he progresses over the remainder of this year.",
    },

    // ============================================================
    // REPORT 3: Y7 Term 3 (2024-25) — Progress Report (grades only)
    // ============================================================
    {
      id: 'michael-y7-t3',
      academicYear: '2024-2025',
      term: 'Y7 Term 3',
      termIndex: 2,
      schoolSection: 'Senior School',
      reportDate: '2025-06',
      reportType: 'Progress Report',
      subjects: [
        { name: 'Art', group: 'Creative', attainment: 'Above', classwork: 2, homework: 2, organisation: 3, teacherName: 'Miss Ellender',
          standardised: { academic: 4, effort: 4, stability: 3, independence: 3, progress: 4 } },
        { name: 'Computing', group: 'Core', attainment: 'Meeting', classwork: 2, homework: 3, organisation: 3, teacherName: 'Mr Bell',
          standardised: { academic: 3, effort: 4, stability: 3, independence: 3, progress: 3 } },
        { name: 'Design and Technology', group: 'Other', attainment: 'Meeting', classwork: 1, homework: 1, organisation: 2, teacherName: 'Mr Handley',
          standardised: { academic: 3, effort: 5, stability: 4, independence: 4, progress: 4 } },
        { name: 'Drama', group: 'Creative', attainment: 'Meeting', classwork: 2, homework: 'N/A', organisation: 2, teacherName: 'Miss Snell',
          standardised: { academic: 3, effort: 4, stability: 4, independence: 4, progress: 3 } },
        { name: 'English', group: 'Core', attainment: 'Meeting', classwork: 2, homework: 3, organisation: 3, teacherName: 'Miss Denholm',
          standardised: { academic: 3, effort: 4, stability: 3, independence: 3, progress: 4 } },
        { name: 'French', group: 'Languages', attainment: 'Below', classwork: 3, homework: 3, organisation: 3, teacherName: 'Mrs Veronese',
          standardised: { academic: 2, effort: 3, stability: 3, independence: 3, progress: 2 } },
        { name: 'Mandarin First Language', group: 'Languages', attainment: 'Meeting', classwork: 2, homework: 2, organisation: 3, teacherName: 'Ms Wong',
          standardised: { academic: 3, effort: 4, stability: 3, independence: 3, progress: 3 } },
        { name: 'Mathematics', group: 'Core', attainment: 'Above', classwork: 3, homework: 2, organisation: 3, teacherName: 'Ms Hah',
          standardised: { academic: 4, effort: 3, stability: 3, independence: 3, progress: 4 } },
        { name: 'Music', group: 'Creative', attainment: 'Meeting', classwork: 2, homework: 1, organisation: 1, teacherName: 'Mr Stratford',
          standardised: { academic: 3, effort: 4, stability: 5, independence: 5, progress: 3 } },
        { name: 'Physical Education', group: 'Other', attainment: 'Meeting', classwork: 2, homework: 'N/A', organisation: 2, teacherName: 'Mr Crush',
          standardised: { academic: 3, effort: 4, stability: 4, independence: 4, progress: 4 } },
        { name: 'Science', group: 'Core', attainment: 'Meeting', classwork: 2, homework: 2, organisation: 2, teacherName: 'Mr Holton',
          standardised: { academic: 3, effort: 4, stability: 4, independence: 4, progress: 3 } },
        { name: 'Spanish', group: 'Languages', attainment: 'Meeting', classwork: 3, homework: 3, organisation: 3, teacherName: 'Mrs Veronese',
          standardised: { academic: 3, effort: 3, stability: 3, independence: 3, progress: 3 } },
        { name: 'Story of Our Land', group: 'Humanities', attainment: 'Meeting', classwork: 2, homework: 2, organisation: 2, teacherName: 'Mrs Feaver',
          standardised: { academic: 3, effort: 4, stability: 4, independence: 4, progress: 4 } },
      ],
      overallComment: "Yu is a valued member of the class who is beginning to show more self-awareness and emotional maturity. He reports feeling mostly positive this term, although he sometimes experiences frustration. It is encouraging that Yu feels he is making good progress in Science, Art, Maths, and LAMDA. He has also shown a willingness to reflect, identifying several subjects including PE, Drama, SOOL, Computing, and others as areas for improvement. Yu takes part in a wide range of CCAs, including Football, Bronze CREST, Latin, Coding, and Origami, showing excellent involvement beyond the classroom. He also holds a leadership role as a Subject Ambassador for Science and is encouraged to continue using his strengths to build confidence across school life.",
      pupilReflection: "This term, I have improved my Maths and Science grades, making it into an 'Above', but I can still improve my PE and French. I can improve by learning more French and practising my PE skills at home and at clubs. I am pleased with my Maths grades because I have not had an 'Above' in it before. I have enjoyed Science because we did a lot of fun experiments -- my favourite was making indicators out of red cabbage. My highlight of the term is the trip to Borneo because it was really fun and I showed a lot of curiosity.",
    },

    // ============================================================
    // REPORT 4: Y8 Term 1 (2025-26) — Progress Report (grades only)
    // ============================================================
    {
      id: 'michael-y8-t1',
      academicYear: '2025-2026',
      term: 'Y8 Term 1',
      termIndex: 3,
      schoolSection: 'Senior School',
      reportDate: '2025-12',
      reportType: 'Progress Report',
      subjects: [
        { name: 'Art', group: 'Creative', attainment: 'Meeting', classwork: 2, homework: 1, organisation: 2, teacherName: 'Ms Ellender',
          standardised: { academic: 3, effort: 4, stability: 4, independence: 4, progress: 3 } },
        { name: 'Science', group: 'Core', attainment: 'Meeting', classwork: 2, homework: 3, organisation: 3, teacherName: 'Mr Metcalfe',
          standardised: { academic: 3, effort: 4, stability: 3, independence: 3, progress: 3 } },
        { name: 'Computing', group: 'Core', attainment: 'Meeting', classwork: 2, homework: 1, organisation: 2, teacherName: 'Mr Snell',
          standardised: { academic: 3, effort: 4, stability: 4, independence: 4, progress: 3 } },
        { name: 'Dance', group: 'Creative', attainment: 'Meeting', classwork: 1, homework: 'N/A', organisation: 1, teacherName: 'Ms Snell',
          standardised: { academic: 3, effort: 5, stability: 5, independence: 5, progress: 3 } },
        { name: 'Design and Technology', group: 'Other', attainment: 'Meeting', classwork: 1, homework: 2, organisation: 1, teacherName: 'Mr Binning',
          standardised: { academic: 3, effort: 5, stability: 4, independence: 5, progress: 3 } },
        { name: 'Drama', group: 'Creative', attainment: 'Meeting', classwork: 1, homework: 'N/A', organisation: 1, teacherName: 'Ms Snell',
          standardised: { academic: 3, effort: 5, stability: 5, independence: 5, progress: 3 } },
        { name: 'English', group: 'Core', attainment: 'Below', classwork: 3, homework: 3, organisation: 3, teacherName: 'Ms Graham',
          standardised: { academic: 2, effort: 3, stability: 3, independence: 3, progress: 2 } },
        { name: 'French', group: 'Languages', attainment: 'Below', classwork: 3, homework: 3, organisation: 3, teacherName: 'Mrs Veronese',
          standardised: { academic: 2, effort: 3, stability: 3, independence: 3, progress: 2 } },
        { name: 'Mandarin First Language', group: 'Languages', attainment: 'Below', classwork: 2, homework: 3, organisation: 3, teacherName: 'Ms Li',
          standardised: { academic: 2, effort: 4, stability: 3, independence: 3, progress: 2 } },
        { name: 'Mathematics', group: 'Core', attainment: 'Below', classwork: 3, homework: 3, organisation: 3, teacherName: 'Ms Hah',
          standardised: { academic: 2, effort: 3, stability: 3, independence: 3, progress: 2 } },
        { name: 'Music', group: 'Creative', attainment: 'Meeting', classwork: 2, homework: 2, organisation: 2, teacherName: 'Mr Stratford',
          standardised: { academic: 3, effort: 4, stability: 4, independence: 4, progress: 3 } },
        { name: 'Physical Education', group: 'Other', attainment: 'Below', classwork: 2, homework: 'N/A', organisation: 2, teacherName: 'Mr Crush',
          standardised: { academic: 2, effort: 4, stability: 4, independence: 4, progress: 2 } },
        { name: 'Spanish', group: 'Languages', attainment: 'Below', classwork: 3, homework: 3, organisation: 2, teacherName: 'Mrs Veronese',
          standardised: { academic: 2, effort: 3, stability: 4, independence: 4, progress: 2 } },
        { name: 'Story of Our Land', group: 'Humanities', attainment: 'Meeting', classwork: 2, homework: 2, organisation: 2, teacherName: 'Mrs Feaver',
          standardised: { academic: 3, effort: 4, stability: 4, independence: 4, progress: 3 } },
      ],
      overallComment: "Michael has a genuine thirst for knowledge and is well liked by both staff and peers for his respectful and positive manner. This term, he has particularly enjoyed analytical subjects such as design and technology and science, where his strengths have been most evident. At the same time, it is clear that he requires additional support to consolidate his understanding across most subjects. Some concerns have been raised regarding his organisation and the quality of homework submitted. Now that the technical issues with his Mac have been resolved, we have set targets focusing on the punctuality of work submission and timely arrival to lessons. By taking a more proactive approach to seeking help when faced with challenges, Michael has the potential to improve both the punctuality and quality of his independent work.\n\nMichael has been actively involved in a variety of activities, including football, mahjong, 'Hands-On Science,' and minecraft, demonstrating his commitment to pursuing his interests. It is clear that Michael is keen to develop his problem-solving and teamwork skills. He is particularly looking forward to the upcoming school trip to the Science Museum next term, an opportunity he is excited about to deepen his scientific curiosity.",
    },

    // ============================================================
    // REPORT 5: Y8 Term 2 (2025-26) — Full Report (with comments)
    // ============================================================
    {
      id: 'michael-y8-t2',
      academicYear: '2025-2026',
      term: 'Y8 Term 2',
      termIndex: 4,
      schoolSection: 'Senior School',
      reportDate: '2026-03',
      reportType: 'Full Report',
      subjects: [
        { name: 'Art', group: 'Creative', attainment: 'Above', classwork: 2, homework: 2, organisation: 2, teacherName: 'Ms Ellender',
          standardised: { academic: 4, effort: 4, stability: 4, independence: 4, progress: 4 },
          comment: "Yu is an able artist who has made very good progress in Art this year, demonstrating a thoughtful and engaged approach to his learning. He loves drawing cartoons and has created some lovely outcomes this year, showing genuine enthusiasm for his work. He participates willingly in class discussions and practical tasks, contributing useful observations. Yu created clear light and shadow areas to show form, demonstrating a good understanding of how to use value to create three-dimensional effects. His work shows developing control in blending and layering.\n\nTo continue progressing, Yu should explore extension tasks that push his cartoon style into new contexts and develop reflections on how his work connects to contemporary illustrators. He should explore a wider range of tints, tones and shades to increase depth and realism, and be more confident when darkening colours by mixing complementary colours.",
          commentInsight: { strengths: ['Very good progress', 'Loves drawing cartoons', 'Good understanding of light/shadow/form', 'Developing control in blending'], concerns: [], suggestions: ['Explore extension tasks', 'Connect work to contemporary illustrators', 'Wider range of tints/tones/shades'], signals: ['Above maintained — consistent strength area'], familyAction: 'Art continues as a strength — support creative exploration' }
        },
        { name: 'Computing', group: 'Core', attainment: 'Meeting', classwork: 2, homework: 2, organisation: 2, teacherName: 'Mr Snell',
          standardised: { academic: 3, effort: 4, stability: 4, independence: 4, progress: 3 },
          comment: "Yu approaches Computing with good effort and engagement. He enjoyed the programming and robotics units, which was really encouraging. He demonstrates suitable digital skills when working on practical tasks and shows good problem-solving ability. Yu follows instructions carefully and always approaches new learning with a positive mindset. His classwork and homework are consistently good, and he submits his work on time, resulting in steady progress throughout the year.\n\nTo develop further, Yu should focus on aiming for the 'Above' success criteria in his end-of-unit assessments and start to contribute more to group discussions, as I feel this will support his growth and self-confidence in the subject.",
          commentInsight: { strengths: ['Good effort and engagement', 'Enjoyed programming and robotics', 'Good problem-solving', 'Submits work on time', 'Steady progress'], concerns: ['Could contribute more to group discussions'], suggestions: ['Aim for Above in assessments', 'Contribute more to discussions'], signals: ['Consistent Meeting with good effort — stable performer'], familyAction: 'Computing going well — encourage aiming higher in assessments' }
        },
        { name: 'Design and Technology', group: 'Other', attainment: 'Above', classwork: 1, homework: 1, organisation: 1, teacherName: 'Mr Binning',
          standardised: { academic: 4, effort: 5, stability: 5, independence: 5, progress: 5 },
          comment: "Yu has shown good interest in Design & Technology this year and has engaged well with both the gravity racer and device holder projects. During the gravity racer task, he contributed to the development and testing of the team's design and demonstrated an understanding of how factors such as weight and aerodynamics affect performance. In the current device holder project, he has shown enthusiasm when using CAD and has spent a considerable amount of time developing ideas in OnShape.\n\nHowever, Yu sometimes focuses too heavily on the digital design stage and does not always fully consider the practical aspects of manufacturing his design in the workshop. Developing a better balance between digital design and practical manufacturing will help him produce more successful outcomes.",
          commentInsight: { strengths: ['Good interest and engagement', 'Contributed to team design', 'Understands weight/aerodynamics', 'Enthusiasm with CAD/OnShape'], concerns: ['Focuses too heavily on digital design', 'Needs better balance with practical manufacturing'], suggestions: ['Balance digital design with workshop practice'], signals: ['Above with ALL effort grades 1 — best performing subject'], familyAction: 'DT is a star subject — all effort scores are 1!' }
        },
        { name: 'Drama', group: 'Creative', attainment: 'Meeting', classwork: 1, homework: 'N/A', organisation: 1, teacherName: 'Ms Snell',
          standardised: { academic: 3, effort: 5, stability: 5, independence: 5, progress: 3 },
          comment: "Yu has contributed positively to Drama lessons and takes part in rehearsals and group activities. He engages well in practical work and shows developing confidence in performance. At times, he can wait for others to take the lead during group tasks, and he would benefit from sharing his ideas more readily, as he often has thoughtful contributions to offer. Taking more initiative in discussions and rehearsals will help him develop greater confidence in his work. Thinking carefully about how his ideas will appear to an audience will also help ensure his performances are clear and purposeful.\n\nMoving forward, Yu should continue to develop his practical performance skills by using clearer body language and facial expressions to communicate character and emotion more effectively.",
          commentInsight: { strengths: ['Contributes positively', 'Engages well in practical work', 'Developing confidence', 'Has thoughtful contributions'], concerns: ['Waits for others to lead', 'Needs to share ideas more readily'], suggestions: ['Take more initiative', 'Use clearer body language/facial expressions'], signals: ['Meeting with best effort (1,1) — effort is excellent'], familyAction: 'Drama effort is outstanding — encourage initiative in group work' }
        },
        { name: 'English', group: 'Core', attainment: 'Meeting', classwork: 3, homework: 3, organisation: 3, teacherName: 'Ms Graham',
          standardised: { academic: 3, effort: 3, stability: 3, independence: 3, progress: 4 },
          comment: "Yu has made good progress in his English lessons this term as he becomes more confident in his literacy skills. He has begun to explore 'Romeo and Juliet', developing an understanding of the play's plot, themes and characters. He is starting to structure his analytical paragraphs more effectively using the PEAZL framework. When prompted, Yu contributes to class discussions, and he would benefit from sharing his ideas more regularly. At times, however, he can lose focus and become easily distracted, which limits his progress.\n\nTo continue developing his reading skills, Yu should read more challenging texts and aim to write in greater detail. To strengthen his writing, he should carefully proofread his work to improve accuracy in grammar, spelling and punctuation. I would also like Yu to maintain focus and engagement throughout lessons.",
          commentInsight: { strengths: ['Good progress this term', 'More confident in literacy', 'Exploring Romeo and Juliet', 'Starting to use PEAZL framework'], concerns: ['Loses focus easily', 'Becomes distracted', 'Effort grade 3 across all areas'], suggestions: ['Read more challenging texts', 'Proofread for grammar/spelling', 'Maintain focus throughout lessons'], signals: ['Meeting recovered from Below in Y8T1 — positive trajectory!'], familyAction: 'English improved from Below to Meeting! Keep reading daily and proofread work.' }
        },
        { name: 'French', group: 'Languages', attainment: 'Below', classwork: 3, homework: 3, organisation: 2, teacherName: 'Mrs Veronese',
          standardised: { academic: 2, effort: 3, stability: 4, independence: 3, progress: 2 },
          comment: "Yu continues to find French challenging. His engagement is inconsistent, and the same is true for his homework submission. When he is engaged, he can remember the vocabulary and the key structures, which shows that he is capable of learning. However, these moments of engagement are too infrequent. Yu's assessments show below grades across all four skills, which reflects his limited engagement with the subject. His homework is often not submitted or is incomplete, which is very concerning and is preventing him from making progress. However, when Yu does engage, he demonstrates that he is capable of understanding and learning the language.\n\nUnfortunately, the vocabulary Yu knows is too limited to allow him to communicate in full sentences and to understand others. He should continue working on building his vocabulary by practising regularly on 'language-gym.com' as well as 'sentencebuilders.com'. Consistent effort, both in class and at home, will be essential if he wishes to improve.",
          commentInsight: { strengths: ['Capable when engaged', 'Can remember vocabulary and structures when focused'], concerns: ['Engagement inconsistent', 'Homework often not submitted or incomplete', 'Below across all four skills', 'Vocabulary too limited'], suggestions: ['Practice on language-gym.com and sentencebuilders.com', 'Consistent effort essential'], signals: ['Still Below — homework submission is the critical barrier'], familyAction: 'French homework MUST be submitted. Daily vocabulary practice on language-gym.com is essential.' }
        },
        { name: 'Mandarin First Language', group: 'Languages', attainment: 'Meeting', classwork: 2, homework: 2, organisation: 2, teacherName: 'Mrs Li',
          standardised: { academic: 3, effort: 4, stability: 4, independence: 4, progress: 4 },
          comment: "Yu has made steady progress in Mandarin this term. He is able to follow lessons and complete most of the work set, although his progress would be stronger with more consistent effort and regular revision. His reading skills are improving, and he is able to understand the texts we study with reasonable accuracy when key vocabulary has been prepared in advance. In listening tasks, he can understand the main ideas, but a wider knowledge of vocabulary would help him follow spoken Mandarin with greater confidence. In speaking, he is able to communicate his ideas, though his responses would benefit from more detail and fuller content during class discussions. His written work shows an understanding of basic structures, but greater care is needed to improve accuracy. Homework is sometimes missing, and more consistent completion of homework will help support his progress.\n\nTo make further progress, he should focus on strengthening his vocabulary knowledge through regular weekly learning and revision. A wider vocabulary will help him understand texts more confidently, give more developed answers in speaking and produce more accurate and detailed writing.",
          commentInsight: { strengths: ['Steady progress', 'Reading skills improving', 'Can understand texts with preparation', 'Able to communicate ideas'], concerns: ['Homework sometimes missing', 'Needs more consistent effort', 'Vocabulary needs broadening'], suggestions: ['Strengthen vocabulary through weekly revision', 'More consistent homework completion'], signals: ['Meeting recovered from Below in Y8T1 — improved!'], familyAction: 'Mandarin improved from Below to Meeting! Weekly vocabulary revision needed.' }
        },
        { name: 'Mathematics', group: 'Core', attainment: 'Meeting', classwork: 1, homework: 2, organisation: 2, teacherName: 'Ms Khodadadi',
          standardised: { academic: 3, effort: 5, stability: 4, independence: 4, progress: 4 },
          comment: "Michael is a capable mathematician who consistently produces good-quality work. He is keen to learn, and this term he has demonstrated a secure understanding of decimal operations and percentage change, applying these skills with accuracy. Michael simplifies calculations involving fractions and decimals effectively and shows clear reasoning when working with interior and exterior angles in triangle problems and finding the midpoints of a line segment. He has also developed an understanding of sampling and data collection methods.\n\nMichael's key targets are to strengthen his understanding of angles in parallel lines, parallelograms and intersecting lines, applying the rules more consistently in complex problems.",
          commentInsight: { strengths: ['Capable mathematician', 'Good-quality work consistently', 'Keen to learn', 'Secure understanding of decimals/percentages', 'Clear reasoning with angles'], concerns: ['Needs to strengthen angles in parallel lines'], suggestions: ['Practice angles in parallel lines and parallelograms'], signals: ['Meeting recovered from Below in Y8T1 — Classwork effort 1!'], familyAction: 'Maths recovered from Below to Meeting with excellent classwork effort (1)! Focus on geometry.' }
        },
        { name: 'Music', group: 'Creative', attainment: 'Meeting', classwork: 1, homework: 1, organisation: 1, teacherName: 'Mr Stratford',
          standardised: { academic: 3, effort: 5, stability: 5, independence: 5, progress: 3 },
          comment: "Michael is a thoughtful and steady contributor in Year 8 Music. He is quieter in class discussions, but he shines when composing, showing genuine enjoyment and focus in creating his own musical ideas. He has engaged well with our study of Blues, Jazz and Folk traditions, developing a solid grasp of the 12-bar blues structure. His recent compositions demonstrate careful melodic shaping, growing confidence with rhythm and an emerging sense of texture, and he particularly enjoys using music technology in this process.\n\nMoving forward, Michael can continue to strengthen his musical voice by using more precise vocabulary when analysing listening examples and by experimenting with inventive ideas in his compositions.",
          commentInsight: { strengths: ['Thoughtful and steady', 'Shines when composing', 'Genuine enjoyment', 'Solid grasp of 12-bar blues', 'Enjoys music technology'], concerns: ['Quieter in class discussions'], suggestions: ['Use more precise vocabulary in analysis', 'Experiment with inventive composition ideas'], signals: ['Meeting with ALL effort 1 — Music brings out his absolute best'], familyAction: 'Music effort is perfect (1,1,1)! Encourage composition at home.' }
        },
        { name: 'Physical Education', group: 'Other', attainment: 'Meeting', classwork: 2, homework: 'N/A', organisation: 2, teacherName: 'Mr Crush',
          standardised: { academic: 3, effort: 4, stability: 4, independence: 4, progress: 4 },
          comment: "Yu approached Physical Education with a positive attitude and demonstrated a developing level of engagement during lessons. He contributed to activities and worked well with his peers, although he was less confident when working with others outside of his immediate friendship group. Yu has shown good progress this term, particularly in badminton and table tennis, where he demonstrated improving control and understanding of key skills. He is also keen to develop his performance in team sports such as football and has shown interest in attending training sessions.\n\nYu should focus on stepping outside of his comfort zone by working with a wider range of peers during lessons so that he can develop his confidence in team situations. He should also aim to commit to training opportunities and apply himself consistently, particularly in football, so that he can translate his improving skill set into more competitive environments.",
          commentInsight: { strengths: ['Positive attitude', 'Works well with peers', 'Good progress in badminton and table tennis', 'Interest in football training'], concerns: ['Less confident outside immediate friendship group'], suggestions: ['Work with wider range of peers', 'Commit to training consistently'], signals: ['Meeting maintained — PE is stable and improving'], familyAction: 'PE going well — encourage football training commitment' }
        },
        { name: 'Science', group: 'Core', attainment: 'Below', classwork: 3, homework: 3, organisation: 3, teacherName: 'Mr Metcalfe',
          standardised: { academic: 2, effort: 3, stability: 3, independence: 3, progress: 2 },
          comment: "Yu has engaged enthusiastically with the light and plant biology topics, showing a keen interest in practical experiments such as microscopy and the Newton disc. I have been impressed with his willingness to read further into the concepts we study in class, sharing some wider reading and projects he is running at home, including growing wheat seeds.\n\nYu's approach to learning in lessons is inconsistent, and he requires regular prompting to focus on completing tasks. I would encourage him to proactively ask for support if he needs any clarification on his understanding of concepts. Practising his recall with flashcards summarising key concepts after each lesson will further enhance his grasp of the material and bolster his confidence.",
          commentInsight: { strengths: ['Enthusiastic with practical experiments', 'Keen interest in microscopy/Newton disc', 'Willingness to read further', 'Running home projects (growing wheat seeds)'], concerns: ['Approach to learning is inconsistent', 'Requires regular prompting to focus', 'Below attainment despite enthusiasm'], suggestions: ['Proactively ask for support', 'Use flashcards for recall after each lesson'], signals: ['Below despite strong interest — focus and consistency are the barriers, not ability'], familyAction: 'Science passion is real but grades don\'t reflect it. Flashcard recall after each lesson + focus in class.' }
        },
        { name: 'Spanish', group: 'Languages', attainment: 'Below', classwork: 2, homework: 3, organisation: 3, teacherName: 'Mrs Veronese',
          standardised: { academic: 2, effort: 4, stability: 3, independence: 3, progress: 3 },
          comment: "Yu has been working below expectations across all four skills this year. However, in the last few weeks, I have noticed some improvement, which is very encouraging. His homework has been completed and he is more engaged in class, participating more actively in lessons. This increased engagement is allowing him to progress and showing that he has the potential to improve when he applies himself. His listening, speaking, reading and writing are all at below level, but the recent positive changes suggest he is beginning to turn things around. Yu is a capable pupil who is starting to demonstrate the commitment needed for progress. This positive momentum needs to continue in order to have tangible results.\n\nI would encourage Yu to maintain his recent improved engagement and homework completion, as this is clearly having a positive impact on his learning. Continued effort and consistency will be essential for his continued progress.",
          commentInsight: { strengths: ['Recent improvement noticed', 'Homework now being completed', 'More engaged in class', 'Shows potential when applies himself'], concerns: ['Below across all four skills', 'Engagement was inconsistent until recently'], suggestions: ['Maintain improved engagement', 'Continue homework completion'], signals: ['Below but positive momentum — recent changes are encouraging!'], familyAction: 'Spanish showing improvement! Maintain the new homework habit.' }
        },
        { name: 'Story of Our Land', group: 'Humanities', attainment: 'Above', classwork: 2, homework: 2, organisation: 1, teacherName: 'Mrs Feaver',
          standardised: { academic: 4, effort: 4, stability: 5, independence: 4, progress: 5 },
          comment: "Yu has made huge improvements in his latest assessment on the Industrial Revolution, demonstrating considerable progress in his understanding of the period. He is occasionally willing to answer questions in class and get involved in activities, and his homework is consistently submitted punctually. Yu works hard and is inquisitive, showing genuine interest in the subject. A particular strength is his ability to competently include examples and statistics to support his points and justify which factors are most significant in historical change.\n\nMoving forward, Yu should use a range of relevant quotations from the source to support his answers and link paragraphs together using language such as 'additionally,' 'furthermore' and 'nevertheless.'",
          commentInsight: { strengths: ['Huge improvements', 'Considerable progress', 'Homework consistently punctual', 'Works hard and inquisitive', 'Competently uses examples and statistics'], concerns: [], suggestions: ['Use relevant quotations from sources', 'Link paragraphs with connective language'], signals: ['Above! From Below(Y7T2) to Above(Y8T2) — outstanding transformation!'], familyAction: 'SOOL went from Below to Above — celebrate this transformation!' }
        },
      ],
      overallComment: "Yu is a highly valued member of the school community and is well regarded by both pupils and staff. He has impressed his teachers with his curiosity, particularly through projects he has pursued independently at home that link closely to his learning in lessons, such as coding a quiz game and growing wheat seeds. Teachers have highlighted a clear need for improvement in Yu's time management, related to the organisation of his workload and prioritising tasks to meet all success criteria. To support his long-term progress, it is important that Yu continues to dedicate time outside of lessons to consolidating core knowledge and skills.\n\nBeyond the classroom, Yu has engaged enthusiastically in a wide range of co-curricular activities, including chess club, architecture and Minecraft. He has also shown an interest in supporting the science department with additional projects, which is very encouraging. I am confident that Yu will greatly enjoy exploring the natural environment during the upcoming Bali residential.",
      pupilReflection: "After carefully reading my report, I have identified two specific targets from my teachers' comments, which are engaging in lessons and handing in my homework on time. I feel particularly proud of the progress I have made in SOOL because this term I have demonstrated improvement through PEEL. I also feel particularly proud of the progress I have made in DT because this term I have demonstrated improvement through my projects such as OnShape and the gravity racer. During Term 1 and Term 2, I have most enjoyed my involvement in DT because it has helped me to develop lots of skills.",
    },
  ],

  goals: [
    {
      id: 'mg1',
      term: 'Y8 Term 2 2025-2026',
      type: 'academic',
      title: 'English: Below → Meeting (IGCSE prep)',
      reason: 'English Below in Y8T1 (was Meeting in Y7T2-T3). Reading age below actual. IGCSE First Language English requires PEEL writing, comprehension & inference. Must rebuild to Meeting before Year 9.',
      priority: 'High',
      timeBudget: '20 min daily reading + 2 PEEL paragraphs/week',
      owner: 'Michael + Parents',
      status: 'in-progress',
      observations: ['Exited ELS programme in Y7T2 — big milestone', 'Creative/imaginative writer when engaged', 'Homework inconsistency undermining progress', 'Use BBC Bitesize + Grammarly for practice']
    },
    {
      id: 'mg2',
      term: 'Y8 Term 2 2025-2026',
      type: 'academic',
      title: 'Maths: Recover from Below back to Above',
      reason: 'Dropped from Above (Y7T3) to Below (Y8T1) — significant regression. IGCSE Maths covers Algebra, Geometry, Trigonometry, Statistics. Must master KS3 equations and area/perimeter first.',
      priority: 'High',
      timeBudget: '2 maths puzzle sessions/week + CGP KS3 Workbook',
      owner: 'Michael',
      status: 'in-progress',
      observations: ['Was Above in Y7T3 — capability is there', 'Basic equations understood, needs multi-step practice', 'Khan Academy for targeted practice', 'Teacher suggests building confidence with simpler problems first']
    },
    {
      id: 'mg3',
      term: 'Y8 Term 2 2025-2026',
      type: 'habit',
      title: 'Homework system: On time + quality check',
      reason: '6 subjects at Below in Y8T1 — homework quality and organisation are cross-cutting. Multiple teachers flag this. Mac issues resolved, so no more excuses. IGCSE demands independent study habits.',
      priority: 'High',
      timeBudget: '15 min daily planner check + homework review',
      owner: 'Michael + Parents',
      status: 'in-progress',
      observations: ['Mac technical issues resolved', 'Targets set with tutor', 'Need evening routine: bag check + planner review', 'Parents to check planner 3x/week initially']
    },
    {
      id: 'mg4',
      term: 'Y8 Term 2 2025-2026',
      type: 'academic',
      title: 'French & Spanish: Build vocabulary foundation',
      reason: 'Both languages persistently Below/Meeting with effort grade 3. IGCSE MFL requires Listening (25%), Reading/Writing (50%), Speaking (25%). Must learn core vocabulary by heart.',
      priority: 'Medium',
      timeBudget: '10 min daily flashcard practice',
      owner: 'Michael',
      status: 'in-progress',
      observations: ['Teacher says: can understand with resources but struggles without', 'Must learn key opinions, reasons, verbs by heart', 'Quizlet/Anki flashcards recommended', 'Start with 10 new words per week']
    },
    {
      id: 'mg5',
      term: 'Y8 Term 2 2025-2026',
      type: 'strength',
      title: 'Science & DT: Invest in strengths for IGCSE',
      reason: 'Science Ambassador + best effort in DT/Dance/Drama. Science is IGCSE Triple Award (Bio+Chem+Physics). DT is a strong IGCSE option. These hands-on subjects bring out Michael\'s best work.',
      priority: 'Medium',
      timeBudget: 'CCAs + 1 home experiment/month + Science Museum trip',
      owner: 'Michael',
      status: 'on-track',
      observations: ['Hands-On Science CCA', 'Bronze CREST award', 'Planning computation project', 'DT improved from Below(Y7T1) to Meeting with top effort scores(1,1)', 'Use Kerboodle textbook at home for structured Science review']
    },
    {
      id: 'mg6',
      term: 'Y8 Term 2 2025-2026',
      type: 'habit',
      title: 'Weekly self-reflection journal',
      reason: 'Michael shows growing self-awareness (pupil reflections are honest and targeted). IGCSE requires independent learning. Building reflection habit now prepares for self-directed study.',
      priority: 'Low',
      timeBudget: '10 min every Sunday',
      owner: 'Michael',
      status: 'on-track',
      observations: ['Already writes thoughtful pupil reflections at school', 'End-of-week check: 1 win, 1 improvement, 1 proud moment', 'Template from IGCSE Study Roadmap']
    }
  ],

  behaviorIndicators: {
    organisation: { current: 3, trend: 'improving', history: [2, 3, 3, 3, 3] },
    homeworkPunctuality: { current: 3, trend: 'improving', history: [3, 3, 3, 3, 3] },
    independence: { current: 4, trend: 'improving', history: [3, 3, 3, 4, 4] },
    classParticipation: { current: 3, trend: 'stable', history: [3, 3, 3, 3, 3] },
    selfAwareness: { current: 5, trend: 'improving', history: [3, 3, 4, 4, 5] }
  },

  warnings: [
    {
      type: 'improving',
      subject: 'English',
      message: 'Recovered to Meeting in Y8T2 from Below in Y8T1! Using PEAZL framework for analytical paragraphs. Still needs focus and proofreading. Keep daily reading.',
      severity: 'medium'
    },
    {
      type: 'recurring',
      subject: 'French',
      message: 'Still Below in Y8T2. Homework often not submitted or incomplete. Vocabulary too limited. Must practice on language-gym.com daily.',
      severity: 'high'
    },
    {
      type: 'improving',
      subject: 'Science',
      message: 'Below in Y8T2 despite strong enthusiasm and home projects (wheat seeds, coding). Inconsistent focus in lessons. Use flashcards after each lesson.',
      severity: 'high'
    },
    {
      type: 'monitor',
      subject: 'Spanish',
      message: 'Still Below but showing recent improvement. Homework now being completed. Maintain this positive momentum.',
      severity: 'medium'
    }
  ],

  strengths: [
    {
      subject: 'Design & Technology',
      evidence: ['Above with ALL effort grades 1 (best in entire report)', 'Engaged with gravity racer and CAD/OnShape', 'Shows enthusiasm for practical design'],
      recommendation: "DT is Michael's star subject — Above attainment with perfect effort scores (1,1,1). A strong IGCSE option. Continue supporting hands-on design projects.",
      investmentLevel: 'high'
    },
    {
      subject: 'Art & Story of Our Land',
      evidence: ['Art: Above — loves drawing cartoons, good understanding of form', 'SOOL: Above — huge improvement from Below, uses examples and statistics well', 'Both show genuine engagement'],
      recommendation: "Art and SOOL both reached Above in Y8T2. SOOL transformation from Below to Above is outstanding. Art and Humanities are emerging strengths alongside DT.",
      investmentLevel: 'high'
    },
    {
      subject: 'Music & Drama',
      evidence: ['Music: ALL effort grades 1 — shines when composing, enjoys music technology', 'Drama: effort 1,1 — developing confidence in performance', 'Creative subjects consistently bring out best effort'],
      recommendation: "Music and Drama have the best effort scores. Michael's creative side is a genuine strength. Consider GCSE Music as an option.",
      investmentLevel: 'medium'
    }
  ]
};
