/**
 * Complete content of maxxrichard.com (transcribed from the live site).
 * Used by `npm run db:seed` and by the automatic first-run seeding (ensureReady).
 * Re-running replaces every content table and keeps contact-form messages.
 */
import type { Db } from "./index";
import * as schema from "./schema";

const R = "**Rahman, M.R.**";

export async function seedDatabase(db: Db): Promise<void> {
  const now = new Date().toISOString();
  for (const t of [schema.profile, schema.socialLinks, schema.education, schema.experience, schema.researchAreas,
    schema.projects, schema.publications, schema.news, schema.blogPosts, schema.press, schema.teaching]) {
    await db.delete(t);
  }

  /* Profile ------------------------------------------------------------ */
  await db.insert(schema.profile).values({
    id: 1,
    fullName: "Maxx Richard Rahman",
    shortName: "Maxx",
    jobTitle: "Research Scientist (AI) | DFKI",
    tagline: "Physicist turned into Computer Scientist",
    avatar: "/images/site/portrait.jpg",
    logo: "/images/site/logo.png",
    heroImage: "/images/site/hero.jpg",
    heroVideo: null, // put an .mp4 in public/files/images and enter /files/images/<name>.mp4 here
    heroSubtitle: "Research Scientist (AI) | DFKI\n(German Research Center for Artificial Intelligence)",
    heroTagline: "Physicist turned into Computer Scientist",
    heroText: "Dedicated to advancing the field of artificial intelligence through innovative research and academic contributions.",
    aboutMarkdown: `My research focuses on developing advanced machine learning techniques, specifically in **structural-temporal analysis, multivariate sequential learning**, and **longitudinal analysis**. I am working on designing robust algorithms for **anomaly detection** and investigating the capabilities of **large language models** to improve their application across various domains.

My current projects involve applying these methodologies to areas such as **sports doping** and **healthcare analytics**. By combining theoretical advancements with practical applications, I aim to contribute to the development of data-driven solutions that address complex challenges in these fields.`,
    aboutPageMarkdown: `My research focuses on the intersection of **artificial intelligence, healthcare** and **sports**, with particular emphasis on **anomaly detection**, **structural-temporal analysis**, **pattern recognition**, and **large language models**. I have demonstrated expertise in project acquisition and have a strong publication record in top-tier peer reviewed conferences such as NeurIPS, IJCAI, AAAI, etc. I am interested in developing AI algorithms in applied science to tackle complex real-world challenges.`,
    aboutPageImage: "/images/site/about-talk.jpg",
    email: "maxx_richard.rahman@dfki.de",
    secondaryEmail: null,
    phone: "+49-162 727 4473",
    location: "Saarbrücken, Germany",
    affiliation: "German Research Center for Artificial Intelligence (DFKI)",
    affiliationUrl: "https://www.dfki.de",
    addressLine1: "Campus D 3.2,",
    addressLine2: "66123 Saarbrücken, Germany",
    cvUrl: null, // e.g. /files/cv/Maxx_Richard_Rahman_CV.pdf
    mapEmbedUrl: "https://www.google.com/maps?q=DFKI%20Campus%20D3%202%2066123%20Saarbr%C3%BCcken&output=embed",
    researchIntro: "My research projects span a diverse range of fields, including **healthcare, sports,** and **quantum computing**, underpinned by cutting-edge advancements in **NLP** and **anomaly detection**.",
    teachingIntro: "I am currently working as a Teaching Assistant (Lead) under the supervision of Prof. Dr. Wolfgang Maaß at **Saarland University, Germany**. In this role, I am primarily responsible for coordinating all teaching activities, including lecture preparation, thesis supervision, and the management of course materials and assessments.",
    mediaIntro: "Our research and project outcomes have gained significant attention in the media, showcasing the societal and scientific relevance of our work. From advancements in anti-doping technologies to innovative AI applications in healthcare and sports, numerous media outlets have featured our contributions.",
    blogIntro: "Welcome to my blog, where I explore the intersection of AI, data science, and interdisciplinary research. Here, you'll find insights on machine learning, NLP, anomaly detection, and real-world applications of AI in sports, healthcare, and beyond. I also share updates on my latest research, conference presentations, and perspectives on emerging trends in AI.",
    siteTitle: "Maxx Richard Rahman",
    siteDescription: "Maxx Richard Rahman — Research Scientist (AI) at the German Research Center for Artificial Intelligence (DFKI). Anomaly detection, structural-temporal analysis, large language models, anti-doping and healthcare analytics.",
    footerText: "©2026 Maxx Richard Rahman. All rights reserved.",
    updatedAt: now,
  });

  /* Social links --------------------------------------------------------- */
  await db.insert(schema.socialLinks).values([
    { platform: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/maxxrichardrahman/", sortOrder: 1 },
    { platform: "github", label: "GitHub", url: "https://github.com/maxxrichard", sortOrder: 2 },
    { platform: "scholar", label: "Google Scholar", url: "https://scholar.google.com/citations?user=jCgOEcIAAAAJ&hl=en", sortOrder: 3 },
    { platform: "huggingface", label: "Hugging Face", url: "https://huggingface.co/maxxrichard", sortOrder: 4 },
    { platform: "instagram", label: "Instagram", url: "https://www.instagram.com/", sortOrder: 5 }, // TODO: set your Instagram profile URL in the admin
  ]);

  /* Education ------------------------------------------------------------ */
  await db.insert(schema.education).values([
    { degree: "PhD in Computer Science", institution: "Saarland University", location: "Germany", startYear: "2021", endYear: "2025", sortOrder: 1 },
    { degree: "MSc. in Physics (Hons)", institution: "University of Bonn", location: "Germany", startYear: "2017", endYear: "2020", sortOrder: 2,
      thesis: "Background estimation in the search for single production of vector-like quarks decaying into Wb in pp collisions using a data-driven method at √s = 13 TeV with the ATLAS detector", thesisUrl: "https://arxiv.org/abs/2106.03961", codeUrl: "https://github.com/maxxrichard/master_thesis" },
    { degree: "BSc. in Physics (Hons)", institution: "University of Delhi", location: "India", startYear: "2014", endYear: "2017", sortOrder: 3 },
  ]);

  /* Experience ----------------------------------------------------------- */
  await db.insert(schema.experience).values([
    { role: "Research Scientist (AI)", organization: "German Research Center for Artificial Intelligence (DFKI)", organizationUrl: "https://www.dfki.de", location: "Germany", startDate: "2021", endDate: null, sortOrder: 1 },
    { role: "Teaching Assistant", organization: "Saarland University", organizationUrl: "https://iss.uni-saarland.de", location: "Germany", startDate: "2020", endDate: null, sortOrder: 2 },
    { role: "Research Scientist", organization: "CERN", organizationUrl: "https://home.cern", location: "Switzerland", startDate: "2019", endDate: "2020", sortOrder: 3 },
  ]);

  /* Research areas (used for SEO keywords / optional section) ------------ */
  await db.insert(schema.researchAreas).values([
    { title: "Anomaly Detection", description: "Robust algorithms for detecting anomalies in longitudinal and structural-temporal data.", icon: "analytics", sortOrder: 1 },
    { title: "Large Language Models", description: "Investigating and adapting LLMs to improve their application across domains.", icon: "chat", sortOrder: 2 },
    { title: "Sports Doping", description: "AI-based anti-doping analysis with the World Anti-Doping Agency.", icon: "fitness", sortOrder: 3 },
    { title: "Healthcare Analytics", description: "Longitudinal and multimodal clinical data analysis.", icon: "medkit", sortOrder: 4 },
  ]);

  /* Research projects (order and text as on the website) ------------------ */
  await db.insert(schema.projects).values([
    { slug: "3s-project", title: "3S-Project (Series I, II)", category: "Anti-Doping", image: "/images/site/project-3s.jpg", url: "https://www.dfki.de/en/web/research/projects-and-publications/project/3s-ii", sortOrder: 1, status: "Ongoing", featured: true, createdAt: now, updatedAt: now,
      summary: "The 3S-Project focuses on advancing anti-doping efforts by addressing the critical challenge of sample swapping, where athletes exchange urine samples to evade detection. Leveraging machine learning algorithms, the project aims to enhance the sensitivity and accuracy of DNA identification techniques to confirm sample donors and detect irregularities. Building on an existing algorithm, 3S-II integrates a user-friendly tool for anti-doping authorities, offering a similarity score to identify inconsistencies within anonymized athlete profiles. Following a design science research methodology, the project evaluates the tool's impact on decision-making, fostering transparency, and empowering anti-doping organizations to ensure fair competition and integrity in sports." },
    { slug: "epopredict", title: "EPOPredict (Series I, II, III)", category: "Anti-Doping", image: "/images/site/project-epopredict.jpg", url: "https://www.dfki.de/en/web/research/projects-and-publications/project/epopredictii", sortOrder: 2, status: "Ongoing", featured: true, createdAt: now, updatedAt: now,
      summary: "EPOPredict focuses on combating blood doping practices, particularly the misuse of recombinant human erythropoietin (rhEPO) to enhance athletic performance. This project aims to develop an indirect detection method using statistical analysis and machine learning algorithms to flag EPO abuse in blood samples. By analyzing hematological profiles and identifying key indicators, EPOPredict will establish a robust pipeline for detecting rhEPO usage. The project's goals include conducting clinical experiments, deploying state-of-the-art algorithms, and creating a comprehensive tool for anti-doping agencies. EPOPredict aspires to provide cost-effective, scalable solutions, supporting WADA's efforts to uphold integrity and fairness in sports." },
    { slug: "marvin", title: "MARVIN", category: "Anti-Doping", image: "/images/site/project-marvin.jpg", url: "https://www.dfki.de/en/web/research/projects-and-publications/project/marvin", sortOrder: 3, status: "Ongoing", featured: true, createdAt: now, updatedAt: now,
      summary: "The MARVIN project advances anti-doping efforts by integrating advanced NLP techniques and large language models (LLMs) to enhance decision-making in anti-doping investigations. Building on insights from the 3S Project, MARVIN focuses on leveraging techniques like Retrieval-Augmented Generation (RAG), LoRA, PEFT, and fine-tuning to analyze complex data within the Athlete Biological Passport (ABP) steroidal module. By combining pattern recognition with lightweight LLM quantization methods, the project develops scalable, explainable tools for detecting anomalies in steroid profiles, such as identical patterns indicative of sample swapping. MARVIN aims to deliver cutting-edge, AI-driven solutions that empower anti-doping authorities with precision tools to uphold fairness and integrity in sports." },
    { slug: "health-ai", title: "HEALTH-AI", category: "Healthcare", image: null, url: null, sortOrder: 4, status: "Ongoing", createdAt: now, updatedAt: now,
      summary: "The HEALTH-AI project leverages artificial intelligence to drive innovation in genomic studies, aiming to unlock insights into complex biological systems and improve healthcare outcomes. By applying cutting-edge AI techniques to analyze vast genomic datasets, the project focuses on identifying patterns, biomarkers, and genetic variations linked to diseases. HEALTH-AI develops advanced algorithms to enhance the accuracy and efficiency of genomic analysis, enabling personalized medicine and targeted treatments. Through interdisciplinary collaboration, the project aims to bridge the gap between AI and genomics, fostering breakthroughs in understanding human genetics and supporting the development of precision healthcare solutions." },
    { slug: "quasim", title: "QUASIM", category: "Quantum Computing", image: null, url: "https://www.dfki.de/en/web/research/projects-and-publications/project/quasim", sortOrder: 5, status: "Ongoing", createdAt: now, updatedAt: now,
      summary: "The QUASIM project explores the potential of quantum computing (QC) to revolutionize manufacturing simulations, addressing challenges faced by the German manufacturing sector in maintaining global competitiveness. By integrating QC with traditional simulation methods like the finite element method, QUASIM aims to accelerate calculations and reduce the complexity of modeling efforts. Quantum Machine Learning will be employed to streamline simulations, making them more accessible, especially for SMEs with limited expertise. The project will develop innovative QC solutions, integrate them into low-threshold services, and provide access via GAIA-X environments, enabling a broader adoption of cutting-edge simulation technologies in manufacturing." },
  ]);

  /* Publications (order and labels as on the website) --------------------- */
  const P = "/images/site/";
  await db.insert(schema.publications).values([
    // 2026
    { year: 2026, venueTag: "ICML 2026", title: "STT-LLM: Structural-Temporal Tokenization for Adapting LLMs to Longitudinal Clinical Profiles", authors: `${R}, Hammouda, M., Maass, W.`, venue: "In Proceedings of the 43rd International Conference on Machine Learning (ICML 2026)", venueShort: "ICML 2026", type: "Conference", paperUrl: "https://openreview.net/forum?id=B5eIW9X4EW", image: P + "pub-stt-llm.jpg", sortOrder: 1, createdAt: now, updatedAt: now,
      abstract: "STT-LLM is a structural-temporal tokenization framework that adapts LLMs to longitudinal clinical analysis without modifying their backbone architectures. It constructs biologically grounded structural-temporal embeddings and transforms them into LLM-compatible tokens through a specialised token-evolution mechanism. Evaluated on real-world longitudinal athlete datasets, it consistently improves over native LLM tokenization for sequence prediction and anomaly detection and provides contextual reasoning that aligns closely with expert assessments." },
    { year: 2026, venueTag: "ICML 2026", title: "AgentPLM: Agentic Protein Language Models with Reasoning-Augmented Decoding for Protein Sequence Design", authors: `Rahman, S., ${R}`, venue: "In Workshop on Generative and Agentic AI for Biology: International Conference on Machine Learning (ICML 2026)", venueShort: "ICML-W 2026", type: "Workshop", image: P + "pub-agentplm.jpg", sortOrder: 2, createdAt: now, updatedAt: now,
      abstract: "AgentPLM uses reasoning-augmented decoding to design protein sequences with agentic protein language models." },
    { year: 2026, venueTag: "Nature", title: "Detection of Sample Swapping in Anti-doping Investigations using Machine Learning", authors: `${R}, Piper, T., Thevis, M., Maass, W.`, venue: "Nature Scientific Reports.", venueShort: "Sci. Rep.", type: "Journal", paperUrl: "https://www.nature.com/articles/s41598-026-43502-y", doi: "10.1038/s41598-026-43502-y", image: P + "pub-sample-swapping.jpg", sortOrder: 3, createdAt: now, updatedAt: now,
      abstract: "The substitution of a urine sample that may result in an adverse analytical finding with a previously collected clean sample is strictly prohibited under WADA regulations and is referred to as sample swapping. We propose a similarity-detection framework based on a convolutional network that explicitly accounts for pattern complexity in urinary steroid profiles, evaluated on 67,651 steroid profiles collected between 2021 and 2023 on both synthetic and laboratory-confirmed similar samples." },
    { year: 2026, venueTag: "AAAI 2026", title: "DiGAN: Diffusion-Guided Attention Network for Early Alzheimer's Disease Detection", authors: `${R}, Hammouda, M., Maass, W.`, venue: "In 1st AI for Healthy Aging and Longevity Workshop (AIAA): AAAI Conference on Artificial Intelligence (AAAI 2026).", venueShort: "AAAI-W 2026", type: "Workshop", paperUrl: "https://arxiv.org/abs/2602.03881", pdfUrl: "https://arxiv.org/pdf/2602.03881", award: "Best Paper Award", image: P + "pub-digan.jpg", highlight: true, sortOrder: 4, createdAt: now, updatedAt: now,
      abstract: "DiGAN integrates latent diffusion modelling with an attention-guided convolutional network. The diffusion model synthesises realistic longitudinal neuroimaging trajectories from limited training data, enriching temporal context and improving robustness to unevenly spaced visits, while the attention-convolutional layer captures discriminative structural-temporal patterns that distinguish cognitively normal subjects from those with mild cognitive impairment and subjective cognitive decline. Experiments on ADNI show that DiGAN outperforms state-of-the-art baselines." },
    // preprints not shown on the website (hidden; toggle "Visible on site" in the admin)
    { year: 2026, venueTag: "arXiv", title: "LongMoE: Longitudinal Multimodal Learning via Trajectory-Aware Mixture-of-Experts", authors: `${R}, Kumar, P., Maass, W.`, venue: "arXiv:2606.09907 [cs.LG]", venueShort: "arXiv", type: "Preprint", status: "Under Review", paperUrl: "https://arxiv.org/abs/2606.09907", published: false, sortOrder: 5, createdAt: now, updatedAt: now },
    { year: 2026, venueTag: "arXiv", title: "CAMOS: Coupled Oscillatory State-Space Model for Multimodal Clinical Time-Series", authors: `${R}, Hammouda, M., Maass, W.`, venue: "arXiv:2609.39484 [cs.LG]", venueShort: "arXiv", type: "Preprint", status: "Under Review", paperUrl: "https://arxiv.org/abs/2609.39484", published: false, sortOrder: 6, createdAt: now, updatedAt: now },
    // 2025
    { year: 2025, venueTag: "PhD Thesis", title: "Anomaly Detection in Longitudinal Clinical Profile", authors: `${R}`, venue: "Doctoral Thesis, Saarländische Universitäts-und Landesbibliothek, Saarland University.", venueShort: "PhD Thesis", type: "Thesis", image: P + "pub-phd-thesis.jpg", sortOrder: 1, createdAt: now, updatedAt: now,
      abstract: "Doctoral thesis on anomaly detection in longitudinal clinical profiles: domain-knowledge integration, structural-temporal modelling (SACNN, STT-LLM) and interpretable reasoning for the analysis of biological samples." },
    // 2024
    { year: 2024, venueTag: "NeurIPS 2024", title: "Incorporating Metabolic Information into LLMs for Anomaly Detection in Clinical Time-Series", authors: `${R}, Liu, R., Maass, W.`, venue: "In Workshop on Time Series in the Age of Large Models: Neural Information Processing Systems (NeurIPS 2024).", venueShort: "NeurIPS-W 2024", type: "Workshop", paperUrl: "https://openreview.net/forum?id=YNLLwZFIY6", pdfUrl: "https://arxiv.org/pdf/2410.12830", image: P + "pub-metabolic-llm.jpg", highlight: true, sortOrder: 1, createdAt: now, updatedAt: now,
      abstract: "We introduce Metabolism Pathway-driven Prompting (MPP), which integrates metabolic pathway information into LLM prompts to better capture structural and temporal changes in biological samples, and apply it to doping detection in sports using real-world athlete steroid data." },
    { year: 2024, venueTag: "IJCAI 2024", title: "SACNN: Self Attention-based Convolutional Neural Network for Fraudulent Behaviour Detection in Sports", authors: `${R}, Khaliq, L.A., Piper, T., Geyer, H., Equey, T., Baume, N., Aikin, R., Maass, W.`, venue: "In Proceedings of the 33rd International Joint Conference on Artificial Intelligence (IJCAI 24).", venueShort: "IJCAI 2024", type: "Conference", paperUrl: "https://www.ijcai.org/proceedings/2024/665", doi: "10.24963/ijcai.2024/665", videoUrl: "https://www.youtube.com/watch?v=07XOMpSp9Oo", image: P + "pub-sacnn.jpg", highlight: true, sortOrder: 2, createdAt: now, updatedAt: now,
      abstract: "Sample swapping is a potential practice performed by athletes to swap doped samples with clean samples to evade positive doping tests. SACNN is a self attention-based convolutional neural network that incorporates both spatial and temporal behaviour of the longitudinal profile and generates embedding maps for fraud detection in sports, outperforming state-of-the-art baselines for sequential anomaly detection." },
    { year: 2024, venueTag: "ICIS 2024", title: "Analysing the Unseen: Leveraging Data Analytics to Combat the Societal Challenge of Doping in Sports", authors: `${R}, Khaliq, L.A., Piper, T., Geyer, H., Equey, T., Baume, N., Aikin, R., Maass, W.`, venue: "In Proceedings of the 45th International Conference on Information Systems (ICIS 2024).", venueShort: "ICIS 2024", type: "Conference", paperUrl: "https://aisel.aisnet.org/icis2024/data_soc/data_soc/2/", image: P + "pub-analysing-unseen.jpg", sortOrder: 3, createdAt: now, updatedAt: now },
    { year: 2024, venueTag: "ICIS 2024", title: "Semantic Priming via Knowledge graphs to analyze and treat language model Honest Lies", authors: `Agnes, C.K., ${R}, Maass, W.`, venue: "In Proceedings of the 45th International Conference on Information Systems (ICIS 2024).", venueShort: "ICIS 2024", type: "Conference", paperUrl: "https://aisel.aisnet.org/icis2024/aiinbus/aiinbus/14/", image: P + "pub-semantic-priming.jpg", sortOrder: 4, createdAt: now, updatedAt: now },
    { year: 2024, venueTag: "Springer", title: "Generative AI in Anti-Doping Analysis in Sports", authors: `${R}, Maass, W.`, venue: "In Book titled Artificial Intelligence in Sports, Movement, and Health, Springer.", venueShort: "Springer", type: "Book Chapter", paperUrl: "https://link.springer.com/chapter/10.1007/978-3-031-67256-9_6", doi: "10.1007/978-3-031-67256-9_6", sortOrder: 5, createdAt: now, updatedAt: now,
      abstract: "Generative modelling (GANs) is used to synthesise realistic blood-sample data that augments scarce anti-doping datasets and improves downstream detection models." },
    { year: 2024, venueTag: "WITS 2024", title: "RAG for Effective Supply Chain Security Questionnaire Automation", authors: `Reza, Z.B., Syed, A.R., Iqbal, O., Mensah, E., Liu, Q., ${R}, Maass, W.`, venue: "In Proceedings of Workshop on Information Technology and Systems (WITS 2024).", venueShort: "WITS 2024", type: "Workshop", sortOrder: 6, createdAt: now, updatedAt: now },
    { year: 2024, venueTag: "WITS 2024", title: "Towards Objectively Interpretable Fault Diagnosis for Time-Series Data in Grinding", authors: `Chan, T.T., Lange, K., Liu, R., Wein, A., Keßler, N., ${R}, Maass, W.`, venue: "In Proceedings of Workshop on Information Technology and Systems (WITS 2024).", venueShort: "WITS 2024", type: "Workshop", sortOrder: 7, createdAt: now, updatedAt: now },
    // 2023
    { year: 2023, venueTag: "AAAI 2023", title: "SNOOP Method: Faithfulness of Text Summarizations for Single Nucleotide Polymorphisms", authors: `Maass, W., Agnes, C.K., ${R}, Almeida, J.S.`, venue: "In Proceedings of the Association for the Advancement of Artificial Intelligence (AAAI) Summer Symposium 2023.", venueShort: "AAAI-SS 2023", type: "Workshop", sortOrder: 1, createdAt: now, updatedAt: now },
    { year: 2023, venueTag: "IEEE ICDH 2023", title: "Modelling Metabolism Pathways using Graph Representation Learning for Fraud Detection in Sports", authors: `${R}, Hussain, M., Piper, T., Geyer, H., Equey, T., Baume, N., Aikin, R., Maass, W.`, venue: "In Proceedings of the 3rd IEEE International Conference on Digital Health, (IEEE ICDH 2023).", venueShort: "IEEE ICDH 2023", type: "Conference", paperUrl: "https://www.researchgate.net/publication/373448739_Modelling_Metabolism_Pathways_using_Graph_Representation_Learning_for_Fraud_Detection_in_Sports", sortOrder: 2, createdAt: now, updatedAt: now },
    { year: 2023, venueTag: "WITS 2023", title: "LLMRS: Unlocking Potentials of LLM-Based Recommender Systems for Software Purchase", authors: `John, A., Aidoo, T., Behmanush, H., Gunduz, I. B., Shrestha, H., ${R}, Maass, W.`, venue: "In Proceedings of the 33rd Workshop on the Information Technologies and Systems (WITS 2023).", venueShort: "WITS 2023", type: "Workshop", paperUrl: "https://arxiv.org/abs/2401.06676", pdfUrl: "https://arxiv.org/pdf/2401.06676", sortOrder: 3, createdAt: now, updatedAt: now },
    // 2022
    { year: 2022, venueTag: "ICIS 2022", title: "Data Analytics for Uncovering Fraudulent Behaviour in Elite Sports", authors: `${R}, Piper, T., Geyer, H., Equey, T., Baume, N., Aikin, R., Maass, W.`, venue: "In Proceedings of the 43rd International Conference on Information Systems (ICIS 2022).", venueShort: "ICIS 2022", type: "Conference", paperUrl: "https://aisel.aisnet.org/icis2022/data_analytics/data_analytics/13/", sortOrder: 1, createdAt: now, updatedAt: now,
      abstract: "We present a data-analytical methodology supporting anti-doping decision-makers on athlete disambiguation tasks. The model helps identify swapped samples and outperforms current state-of-the-art methods and baseline models on real-world sample swapping cases." },
    { year: 2022, venueTag: "IEEE ICDH 2022", title: "Detection of Erythropoietin in Blood to Uncover Doping in Sports using Machine Learning", authors: `${R}, Bejder, J., Bonne, T. C., Andersen, A. B., Huertas, J.R., Aikin, R., Nordsborg, N. B., Maass, W.`, venue: "In Proceedings of the 2nd IEEE International Conference on Digital Health (IEEE ICDH 2022).", venueShort: "IEEE ICDH 2022", type: "Conference", paperUrl: "https://ieeexplore.ieee.org/document/9861084/", pdfUrl: "https://arxiv.org/pdf/2203.00001", sortOrder: 2, createdAt: now, updatedAt: now,
      abstract: "A comparison of machine-learning algorithms combined with statistical analysis to identify erythropoietin in blood samples at sea level and moderate altitude; ensemble methods such as random forest and XGBoost provide effective tools for anti-doping organisations." },
  ]);

  /* News (home page) ------------------------------------------------------ */
  await db.insert(schema.news).values([
    { date: "2026-06-05", category: "Publication", title: "Two papers (Main Track, Workshop) accepted at ICML 2026, Seoul.", bodyMarkdown: "", createdAt: now, updatedAt: now },
    { date: "2026-03-04", category: "Publication", title: "Paper accepted at Nature Scientific Reports.", bodyMarkdown: "", createdAt: now, updatedAt: now },
    { date: "2026-01-26", category: "Award", title: "Best Paper Award at AIAA workshop, AAAI 2026, Singapore.", bodyMarkdown: "", createdAt: now, updatedAt: now },
    { date: "2025-11-15", category: "Publication", title: "Workshop paper accepted at AAAI 2026, Singapore.", bodyMarkdown: "", createdAt: now, updatedAt: now },
    { date: "2024-12-15", category: "Publication", title: "Workshop paper accepted at NeurIPS 2024, Vancouver, Canada.", bodyMarkdown: "", createdAt: now, updatedAt: now },
    { date: "2024-12-17", category: "Publication", title: "Two main conference papers accepted at ICIS 2024, Bangkok, Thailand.", bodyMarkdown: "", createdAt: now, updatedAt: now },
    { date: "2024-11-19", category: "Publication", title: "Two main conference papers accepted at WITS 2024, Bangkok, Thailand.", bodyMarkdown: "", createdAt: now, updatedAt: now },
    { date: "2024-08-07", category: "Publication", title: "Main conference paper accepted at IJCAI 2024, Jeju, South Korea.", bodyMarkdown: "", createdAt: now, updatedAt: now },
  ]);

  /* Blog ------------------------------------------------------------------ */
  await db.insert(schema.blogPosts).values([
    {
      slug: "understanding-deepseek-r1-reasoning-capabilities-through-reinforcement-learning",
      title: "Understanding DeepSeek-R1: Reasoning Capabilities Through Reinforcement Learning",
      excerpt: "DeepSeek-R1, a series of models from DeepSeek that reimagines how LLMs learn to reason. By leveraging reinforcement learning (RL) as the primary driver of capability improvement — rather than a supplementary tool — DeepSeek-R1 demonstrates that models can self-evolve sophisticated reasoning strategies without extensive human guidance.",
      contentMarkdown: "Read the full article on Medium: [Understanding DeepSeek-R1: Reasoning Capabilities Through Reinforcement Learning](https://medium.com/@maxxrichard06/understanding-deepseek-r1-reasoning-capabilities-through-reinforcement-learning-734923ee04df).",
      coverImage: "/images/site/blog-deepseek.jpg", tags: "LLMs, Reinforcement Learning", source: "Medium",
      externalUrl: "https://medium.com/@maxxrichard06/understanding-deepseek-r1-reasoning-capabilities-through-reinforcement-learning-734923ee04df",
      readingMinutes: 10, publishedAt: "2025-02-02", createdAt: now, updatedAt: now,
    },
  ]);

  /* Media coverage -------------------------------------------------------- */
  await db.insert(schema.press).values([
    { date: "2024-03-04", outlet: "ARD News", title: "Artificial intelligence for fight against doping in sports", language: "German", videoUrl: "https://www.youtube.com/embed/07XOMpSp9Oo", sortOrder: 1,
      description: "The media coverage by the Arbeitsgemeinschaft der öffentlich-rechtlichen Rundfunkanstalten der Bundesrepublik Deutschland (ARD) on the use of deep learning methods to identify suspicious blood and urine samples in the fight against doping in sports. The segment highlights how advanced AI techniques are revolutionizing doping detection, ensuring fairness and integrity in athletic competitions." },
    { date: "2022-07-25", outlet: "DFKI", title: "Saarland Minister President Mrs. Anke Rehlinger Summer Tour", language: "German", videoUrl: "https://www.youtube.com/embed/ZEGFu5rCU0k", sortOrder: 2,
      description: "Saarland's Minister President Mrs. Anke Rehlinger visits the German Center for Artificial Intelligence (DFKI) in Saarbrücken, Germany during her Summer Tour 2022. We presented the innovative research on using artificial intelligence to fight against sports doping and discussed ideas to maintain integrity in sports." },
    { date: "2022-03-09", outlet: "SRF News", title: "AI Advances in Anti-Doping: Detecting EPO and Sample Swapping", language: "German", videoUrl: "https://www.youtube.com/embed/ePU8EBWWqPw", sortOrder: 3,
      description: "The media coverage by Schweizer Radio und Fernsehen (SRF) on our innovative research using artificial intelligence and machine learning to detect doping activities. The focus is on identifying EPO doping and uncovering sample swapping practices, highlighting the latest advancements in maintaining fairness and integrity in sports. We showed how AI algorithms could help the anti-doping efforts." },
    { date: "2022-02-17", outlet: "SR NEWS", title: "New Technology Improves Blood Doping Detection in Sports", language: "German", videoUrl: "https://www.youtube.com/embed/uhE3sUI6BZ4", sortOrder: 4,
      description: "The media coverage by Saarländischer Rundfunk (SR) on our groundbreaking research using artificial intelligence to detect blood doping in sports. The coverage highlights how AI algorithms is being utilized to improve the detection of prohibited substance in the blood samples and promote fairness in competitive athletics." },
  ]);

  /* Teaching -------------------------------------------------------------- */
  await db.insert(schema.teaching).values([
    { course: "DS: Data Science", term: "2025 Spring", terms: "2025 Spring, 2024 Spring, 2023 Spring, 2022 Spring, 2021 Spring", role: "Teaching Assistant (Lead)", institution: "Saarland University", image: P + "teach-ds.jpg", url: "https://iss.uni-saarland.de/ds", sortOrder: 1,
      description: "This course covers essential topics such as data preprocessing, exploratory data analysis, and predictive modeling using machine learning techniques." },
    { course: "KIU: AI in Companies", term: "2024 Fall", terms: "2024 Fall, 2023 Fall, 2022 Fall, 2021 Fall", role: "Teaching Assistant (Lead)", institution: "Saarland University", image: P + "teach-kiu.jpg", url: "https://iss.uni-saarland.de/kiu", sortOrder: 2,
      description: "This course explores the applications of AI in business, focusing on how companies leverage machine learning, natural language processing, and automation to optimize operations and drive innovation." },
    { course: "Seminar: Building LLMs", term: "2024 Fall", terms: "2024 Fall", role: "Seminar Supervisor", institution: "Saarland University", image: P + "teach-llm.jpg", url: "https://iss.uni-saarland.de/sem", sortOrder: 3,
      description: "This seminar delves into the principles, techniques, and challenges of designing and training large language models, emphasizing their architecture, optimization, and real-world applications." },
    { course: "Seminar: Quantum Computing in FinTech Sector", term: "2021 Spring", terms: "2021 Spring", role: "Seminar Supervisor", institution: "Saarland University", image: P + "teach-quantum-fintech.jpg", sortOrder: 4,
      description: "Explore the transformative role of quantum computing in financial technologies, delving into quantum algorithms for risk assessment, cryptography, and portfolio optimization." },
    { course: "Seminar: Artificial Intelligence in Companies", term: "2022 Spring", terms: "2022 Spring", role: "Seminar Supervisor", institution: "Saarland University", image: P + "teach-ai-companies.jpg", sortOrder: 5,
      description: "Investigate how artificial intelligence reshapes business strategies, emphasizing its applications in process automation, decision-making, and customer engagement." },
    { course: "Seminar: Advanced Topics in Business Informatics", term: "2023 Fall", terms: "2023 Fall", role: "Seminar Supervisor", institution: "Saarland University", image: P + "teach-business-informatics.jpg", sortOrder: 6,
      description: "Dive into cutting-edge research in business informatics, focusing on the intersection of technology, data-driven insights, and strategic business innovation." },
  ]);

  console.log("✔ Seeded profile, socials, education, experience, projects, publications, news, blog, media and teaching.");
}
