/**
 * Seeds the database with the complete content of maxxrichard.com.
 * Safe to re-run: it wipes and re-inserts every content table.
 * Run with:  npm run db:seed
 */
import { db, schema } from "../src/db";

const now = new Date().toISOString();
const R = "**Rahman, M.R.**";

async function main() {
  // Wipe content tables (messages are kept).
  for (const t of [schema.profile, schema.socialLinks, schema.education, schema.experience, schema.researchAreas,
    schema.projects, schema.publications, schema.news, schema.blogPosts, schema.press, schema.teaching]) {
    await db.delete(t);
  }

  /* ------------------------------------------------------------------ */
  /* Profile                                                             */
  /* ------------------------------------------------------------------ */
  await db.insert(schema.profile).values({
    id: 1,
    fullName: "Maxx Richard Rahman",
    shortName: "Maxx",
    jobTitle: "Research Scientist (AI)",
    tagline: "Physicist turned into Computer Scientist",
    avatar: "/images/profile.jpg",
    aboutMarkdown: `*"Physicist turned into Computer Scientist"*

I am a Research Scientist (AI) at the **German Research Center for Artificial Intelligence (DFKI)**, Germany, and a PhD researcher at **Saarland University**. My research focuses on developing advanced machine learning techniques, specifically in structural-temporal analysis, multivariate sequential learning, and longitudinal analysis. I am working on designing robust methods for **Anomaly Detection** and investigating the capabilities of foundation models, including **Large Language Models**, to improve their application across various domains.

My current projects involve applying these methodologies to areas such as doping detection in sports, healthcare analytics, and quantum machine learning. By combining theoretical advancements with practical applications, I aim to contribute to the development of data-driven solutions that address complex challenges in these fields. My work on AI-based anti-doping analysis supports organisations such as the World Anti-Doping Agency (WADA) in detecting prohibited substances in blood and urine samples and in uncovering sample manipulation.`,
    email: "maxx_richard.rahman@dfki.de",
    secondaryEmail: "m.rahman@iss.uni-saarland.de",
    phone: null,
    location: "Saarbrücken, Germany",
    affiliation: "German Research Center for Artificial Intelligence (DFKI)",
    affiliationUrl: "https://www.dfki.de/en/web/research/research-departments/smart-service-engineering",
    cvUrl: "https://6f729f49-8cfc-414d-a420-d9c4f5eab920.filesusr.com/ugd/ce1105_45f3dd70b7f841b09a6e8bd30537d41c.pdf",
    mapEmbedUrl: "https://www.google.com/maps?q=Saarbr%C3%BCcken%2C%20Germany&output=embed",
    siteTitle: "Maxx Richard Rahman",
    siteDescription: "Maxx Richard Rahman — Research Scientist (AI) at DFKI and PhD researcher at Saarland University working on anomaly detection, longitudinal analysis, LLMs, anti-doping and healthcare analytics.",
    footerText: "© Maxx Richard Rahman · Saarbrücken, Germany",
    updatedAt: now,
  });

  /* ------------------------------------------------------------------ */
  /* Social links                                                        */
  /* ------------------------------------------------------------------ */
  await db.insert(schema.socialLinks).values([
    { platform: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/maxxrichardrahman/", sortOrder: 1 },
    { platform: "github", label: "GitHub", url: "https://github.com/maxxrichard", sortOrder: 2 },
    { platform: "scholar", label: "Google Scholar", url: "https://scholar.google.com/citations?user=jCgOEcIAAAAJ&hl=en", sortOrder: 3 },
    { platform: "huggingface", label: "Hugging Face", url: "https://huggingface.co/maxxrichard", sortOrder: 4 },
    { platform: "medium", label: "Medium", url: "https://medium.com/@maxxrichard06", sortOrder: 5 },
    { platform: "dblp", label: "DBLP", url: "https://dblp.org/pid/314/9928.html", sortOrder: 6 },
    { platform: "researchgate", label: "ResearchGate", url: "https://www.researchgate.net/scientific-contributions/Maxx-Richard-Rahman-2216013118", sortOrder: 7 },
    { platform: "link", label: "OpenReview", url: "https://openreview.net/profile?id=~Maxx_Richard_Rahman1", sortOrder: 8 },
    { platform: "email", label: "Email", url: "mailto:maxx_richard.rahman@dfki.de", sortOrder: 9 },
  ]);

  /* ------------------------------------------------------------------ */
  /* Education                                                           */
  /* ------------------------------------------------------------------ */
  await db.insert(schema.education).values([
    {
      degree: "PhD Computer Science", institution: "Saarland University", location: "Germany", startYear: "2021", endYear: "2025",
      thesis: null, coursework: "Machine Learning",
      description: "Doctoral research at the Chair of Business Informatics (Prof. Dr.-Ing. Wolfgang Maaß) on structural-temporal machine learning, anomaly detection in longitudinal data and large language models, applied to anti-doping analysis and healthcare.",
      sortOrder: 1,
    },
    {
      degree: "MSc. Physics", institution: "University of Bonn", location: "Germany", startYear: "2017", endYear: "2020",
      thesis: "Background estimation in the search for single production of vector-like quarks decaying into Wb in pp collisions using a data-driven method at √s = 13 TeV with the ATLAS detector",
      thesisUrl: "https://arxiv.org/abs/2106.03961", codeUrl: "https://github.com/maxxrichard/master_thesis",
      coursework: "Data Analysis, Statistics, Particle Physics, Quantum Physics", sortOrder: 2,
    },
    {
      degree: "BSc. Physics", institution: "St. Stephen's College, University of Delhi", location: "India", startYear: "2014", endYear: "2017",
      coursework: "Calculus, Mathematical Physics, Programming, Mechanics, Electronics", sortOrder: 3,
    },
  ]);

  /* ------------------------------------------------------------------ */
  /* Experience                                                          */
  /* ------------------------------------------------------------------ */
  await db.insert(schema.experience).values([
    {
      role: "Research Scientist (AI)", organization: "German Research Center for Artificial Intelligence (DFKI)", organizationUrl: "https://www.dfki.de",
      location: "Saarbrücken, Germany", startDate: "2021", endDate: null,
      description: "Smart Service Engineering research department headed by Prof. Dr.-Ing. Wolfgang Maaß. Developing AI algorithms for doping detection in sports — from analysing blood and urine samples to uncovering sample manipulation — in collaboration with the World Anti-Doping Agency (WADA), and AI methods for longitudinal clinical data in healthcare.",
      sortOrder: 1,
    },
    {
      role: "Research and Teaching Assistant", organization: "Saarland University — Chair of Business Informatics", organizationUrl: "https://iss.uni-saarland.de",
      location: "Saarbrücken, Germany", startDate: "2021", endDate: null,
      description: "Teaching and supervision in the Business Informatics / Information Systems programme (Data Science, Artificial Intelligence in Enterprises, seminars and thesis supervision).",
      sortOrder: 2,
    },
    {
      role: "Research Assistant", organization: "University of Bonn — Physikalisches Institut", organizationUrl: "https://www.pi.uni-bonn.de",
      location: "Bonn, Germany", startDate: "2019", endDate: "2020",
      description: "Data analysis and machine learning studies for particle physics (muon and photon identification, BDT-based classification).",
      sortOrder: 3,
    },
    {
      role: "Member, ATLAS Collaboration", organization: "CERN", organizationUrl: "https://atlas.cern",
      location: "Geneva, Switzerland", startDate: "2019", endDate: "2020",
      description: "Master's thesis research within the ATLAS experiment: data-driven background estimation in the search for single production of vector-like quarks decaying into Wb at √s = 13 TeV.",
      sortOrder: 4,
    },
  ]);

  /* ------------------------------------------------------------------ */
  /* Research areas ("What I'm doing")                                   */
  /* ------------------------------------------------------------------ */
  await db.insert(schema.researchAreas).values([
    { title: "Anomaly Detection", description: "Robust methods for detecting anomalies in multivariate, longitudinal and structural-temporal data.", icon: "analytics", sortOrder: 1 },
    { title: "Large Language Models", description: "Adapting LLMs and foundation models to longitudinal clinical profiles through domain-grounded tokenisation and prompting.", icon: "chat", sortOrder: 2 },
    { title: "Anti-Doping Analytics", description: "AI for the fight against doping in sports: detecting EPO and steroid misuse and uncovering sample swapping, with WADA.", icon: "fitness", sortOrder: 3 },
    { title: "Healthcare Analytics", description: "Multimodal and longitudinal learning for early Alzheimer's disease detection and clinical time-series (ADNI, OASIS-3, MIMIC-IV).", icon: "medkit", sortOrder: 4 },
    { title: "Multivariate Sequential Learning", description: "State-space models, mixture-of-experts and attention-based networks for irregular, incomplete sequences.", icon: "network", sortOrder: 5 },
    { title: "Quantum Machine Learning", description: "Exploring quantum-enhanced learning methods for data-driven scientific applications.", icon: "sparkles", sortOrder: 6 },
  ]);

  /* ------------------------------------------------------------------ */
  /* Projects                                                            */
  /* ------------------------------------------------------------------ */
  await db.insert(schema.projects).values([
    {
      slug: "ai-anti-doping-epo-detection", title: "AI-based Detection of Blood Doping (EPO)", category: "Anti-Doping",
      summary: "Indirect detection of recombinant erythropoietin (rhEPO) in athletes' blood samples with statistical analysis and machine learning — a joint effort of DFKI and WADA.",
      contentMarkdown: `Direct detection of erythropoietin in blood samples is effective but not every case is detectable, and some analyses are too costly to run on every sample. This project develops **indirect detection methods** based on haematological biomarkers.

**Highlights**
- Comparison of statistical and machine-learning approaches (random forest, XGBoost, neural networks) to flag rhEPO administration at sea level and at moderate altitude.
- Focus on reducing cost by optimising over subsets of input features while improving the specificity of tests.
- Results published at IEEE ICDH 2022 and as an arXiv preprint; covered by Saarländischer Rundfunk (SR) and Schweizer Radio und Fernsehen (SRF).

**Partners:** World Anti-Doping Agency (WADA), University of Copenhagen, University of Granada.`,
      url: "https://www.dfki.de/en/web/research/projects-and-publications/project/epopredictii", partners: "WADA, DFKI", startYear: "2021", endYear: null, status: "Ongoing", featured: true, sortOrder: 1, createdAt: now, updatedAt: now,
    },
    {
      slug: "sample-swapping-detection", title: "Detecting Sample Swapping in Anti-Doping (3S-II)", category: "Anti-Doping",
      summary: "Deep learning on longitudinal urinary steroid profiles to identify swapped or manipulated samples, supporting anti-doping decision-makers.",
      contentMarkdown: `Sample swapping — substituting a sample that may yield an adverse analytical finding with a previously collected clean sample — is strictly prohibited under WADA regulations. DNA analysis is the only proven detection method but is expensive and time-consuming.

This project builds **similarity-detection frameworks** for urinary steroid profiles that explicitly account for pattern complexity:
- **SACNN** (IJCAI 2024): a self attention-based convolutional network that captures spatial and temporal behaviour of a longitudinal profile.
- A convolutional similarity framework evaluated on **67,651 steroid profiles** (2021–2023), published in *Scientific Reports* (2026).
- Graph representation learning on metabolic pathways (IEEE ICDH 2023) and data-analytics methodology for athlete disambiguation (ICIS 2022).

The work is part of the DFKI project **3S-II — AI-based detection of steroid sample swapping in the anti-doping area and analysis of the associated decision-making processes**.`,
      url: "https://www.dfki.de/en/web/research/projects-and-publications/project/3s-ii", partners: "WADA, Center for Preventive Doping Research (German Sport University Cologne), DFKI", startYear: "2022", endYear: null, status: "Ongoing", featured: true, sortOrder: 2, createdAt: now, updatedAt: now,
    },
    {
      slug: "llms-for-longitudinal-clinical-profiles", title: "LLMs for Longitudinal Clinical Profiles", category: "Large Language Models",
      summary: "Adapting large language models to longitudinal biological data with metabolism-pathway prompting and structural-temporal tokenisation (STT-LLM, ICML 2026).",
      contentMarkdown: `Large language models generalise well across natural-language tasks, but longitudinal clinical profiles have complex temporal dynamics and biological relationships that native tokenisation does not capture.

- **Metabolism Pathway-driven Prompting (MPP)** — integrates metabolic pathway information into prompts to capture structural and temporal changes in biological samples (NeurIPS 2024 Workshop on Time Series in the Age of Large Models).
- **STT-LLM** — a structural-temporal tokenisation framework that builds biologically grounded embeddings and converts them into LLM-compatible tokens through a token-evolution mechanism, without modifying the backbone architecture (ICML 2026, Seoul).

Evaluated on real-world longitudinal athlete datasets for sequence prediction and anomaly detection, with contextual reasoning that aligns closely with expert assessments.`,
      partners: "DFKI, Saarland University", startYear: "2024", endYear: null, status: "Ongoing", featured: true, sortOrder: 3, createdAt: now, updatedAt: now,
    },
    {
      slug: "longitudinal-multimodal-healthcare-ai", title: "Longitudinal Multimodal Learning for Early Alzheimer's Detection", category: "Healthcare",
      summary: "DiGAN, LongMoE and CAMOS: generative, mixture-of-experts and oscillatory state-space models for incomplete, irregularly sampled clinical cohorts (ADNI, OASIS-3, MIMIC-IV).",
      contentMarkdown: `Longitudinal clinical cohorts are multimodal, irregularly sampled and pervasively incomplete. This line of work develops models that remain robust when modalities are missing and that exploit a patient's evolving disease trajectory.

- **DiGAN** (AAAI 2026 Workshop on AI for Healthy Aging and Longevity — *Best Paper Presentation Award*): latent diffusion synthesises realistic longitudinal neuroimaging trajectories; an attention-guided convolutional network separates cognitively normal subjects from mild cognitive impairment and subjective cognitive decline.
- **LongMoE**: a trajectory-aware mixture-of-experts that jointly addresses modality missingness and longitudinal dynamics.
- **CAMOS**: coupled oscillatory state-space layers whose transition operator is gated by modality availability, avoiding collapse under zero-shot transfer to OASIS-3.`,
      partners: "DFKI, Saarland University", startYear: "2025", endYear: null, status: "Ongoing", featured: true, sortOrder: 4, createdAt: now, updatedAt: now,
    },
    {
      slug: "generative-ai-anti-doping", title: "Generative AI for Anti-Doping Analysis", category: "Anti-Doping",
      summary: "Generative adversarial networks that synthesise realistic blood-sample data to augment scarce anti-doping datasets.",
      contentMarkdown: `Anti-doping datasets are small and highly imbalanced. This project uses **generative modelling** (GANs) to produce synthetic blood samples that closely resemble real ones, improving downstream detection models. Published as a chapter in *Artificial Intelligence in Sports, Movement, and Health* (Springer, 2024).`,
      url: "https://link.springer.com/chapter/10.1007/978-3-031-67256-9_6", partners: "DFKI, Saarland University", startYear: "2023", endYear: "2024", status: "Completed", sortOrder: 5, createdAt: now, updatedAt: now,
    },
    {
      slug: "llm-applications-information-systems", title: "LLM Applications in Information Systems", category: "Large Language Models",
      summary: "LLM-based recommender systems for software purchase (LLMRS), RAG for supply-chain security questionnaires, and knowledge-graph priming against LLM 'honest lies'.",
      contentMarkdown: `Applied LLM research with students and colleagues at the Chair of Business Informatics:

- **LLMRS** — unlocking the potential of LLM-based recommender systems for software purchase (WITS 2023, arXiv:2401.06676).
- **RAG for Supply Chain Security Questionnaire Automation** (WITS 2024, Bangkok).
- **Semantic Priming via Knowledge Graphs** to analyse and treat language models' *honest lies* (ICIS 2024).
- **SNOOP Method** — faithfulness of text summarisations for single nucleotide polymorphisms (AAAI Summer Symposium 2023).`,
      partners: "Saarland University, DFKI", startYear: "2023", endYear: null, status: "Ongoing", sortOrder: 6, createdAt: now, updatedAt: now,
    },
    {
      slug: "publication-tracker", title: "Publication Tracker", category: "Open Source",
      summary: "A live dashboard for research submissions, deadlines and outcomes, generated from a single Excel workbook and deployed with GitHub Pages.",
      contentMarkdown: `Publication Tracker turns one spreadsheet into an interactive dashboard: filters by cycle, status, type and venue; deadline timelines; acceptance-rate and pipeline panels; CSV export; light and dark themes. A GitHub Action converts the workbook to JSON and redeploys the site on every push — no backend required.`,
      image: "/images/publication-tracker.png", url: "https://maxxrichard.github.io/Publication_Tracker/", codeUrl: "https://github.com/maxxrichard/Publication_Tracker", startYear: "2026", status: "Ongoing", sortOrder: 7, createdAt: now, updatedAt: now,
    },
    {
      slug: "research-agent", title: "Research Agent & LLM Inference Tooling", category: "Open Source",
      summary: "Open-source experiments with agentic LLM research assistants, efficient LLM inference and live speech translation.",
      contentMarkdown: `Side projects on GitHub:
- [Research_Agent](https://github.com/maxxrichard/Research_Agent) — an agentic assistant for literature research.
- [LLM-inference](https://github.com/maxxrichard/LLM-inference) — notes and code for efficient LLM inference.
- [live-translate](https://github.com/maxxrichard/live-translate) — live translation prototype.`,
      codeUrl: "https://github.com/maxxrichard?tab=repositories", startYear: "2025", status: "Ongoing", sortOrder: 8, createdAt: now, updatedAt: now,
    },
    {
      slug: "machine-learning-for-particle-physics", title: "Machine Learning for Particle Physics", category: "Physics",
      summary: "K-Means jet reconstruction for the LHC Olympics 2020, muon identification in the LHCb detector (MLHEP 2020), photon-ID ML studies and BDT analyses for the ATLAS tWb search.",
      contentMarkdown: `Work from the physics years:
- [LHCOlympics2020](https://github.com/maxxrichard/LHCOlympics2020) — K-Means clustering for jet reconstruction in the LHC Olympics 2020 anomaly-detection challenge.
- [Muon-ID-MLHEP2020](https://github.com/maxxrichard/Muon-ID-MLHEP2020) — identification of muons in the LHCb detector.
- [photon-ID-ML-studies](https://github.com/maxxrichard/photon-ID-ML-studies) — machine-learning studies for photon identification.
- [TWB_0L_BDT](https://github.com/maxxrichard/TWB_0L_BDT) and [TWB_0L_ABCD_method](https://github.com/maxxrichard/TWB_0L_ABCD_method) — boosted decision trees and the data-driven ABCD method for the ATLAS single vector-like quark (tWb, 0-lepton) search.
- [master_thesis](https://github.com/maxxrichard/master_thesis) — thesis code.`,
      codeUrl: "https://github.com/maxxrichard/LHCOlympics2020", startYear: "2019", endYear: "2020", status: "Completed", sortOrder: 9, createdAt: now, updatedAt: now,
    },
    {
      slug: "applied-deep-learning-projects", title: "Applied Deep Learning Projects", category: "Open Source",
      summary: "Chest X-ray diagnosis with CNNs, US-Congress network analysis, reinforcement-learning agents and NLP utilities.",
      contentMarkdown: `- [xray-diagnosis-CNN](https://github.com/maxxrichard/xray-diagnosis-CNN) — classification of chest X-rays with convolutional neural networks to support diagnostic decisions.
- [ranking_anomaly_detection](https://github.com/maxxrichard/ranking_anomaly_detection) — analysis of 115th US Congress data to identify important members.
- [unsupervised_text_classification](https://github.com/maxxrichard/unsupervised_text_classification), [text_filter_nltk](https://github.com/maxxrichard/text_filter_nltk) — NLP utilities.
- [self-driving-car_reinforcement_learning](https://github.com/maxxrichard/self-driving-car_reinforcement_learning), [stock_exchange_A3C_reinforcement](https://github.com/maxxrichard/stock_exchange_A3C_reinforcement) — reinforcement learning agents.
- [cifar10_convolutional_network](https://github.com/maxxrichard/cifar10_convolutional_network), [census_data_neural_network](https://github.com/maxxrichard/census_data_neural_network), [company_profit_regression](https://github.com/maxxrichard/company_profit_regression), [PotHole](https://github.com/maxxrichard/PotHole).`,
      codeUrl: "https://github.com/maxxrichard", startYear: "2020", endYear: "2025", status: "Completed", sortOrder: 10, createdAt: now, updatedAt: now,
    },
  ]);

  /* ------------------------------------------------------------------ */
  /* Publications                                                        */
  /* ------------------------------------------------------------------ */
  await db.insert(schema.publications).values([
    // 2026
    { year: 2026, authors: `${R}, Piper, T., Thevis, M., Maass, W.`, title: "Detection of sample swapping in anti-doping investigations using machine learning", venue: "Scientific Reports, 16, 9230 (Nature Portfolio)", venueShort: "Sci. Rep.", type: "Journal", paperUrl: "https://www.nature.com/articles/s41598-026-43502-y", doi: "10.1038/s41598-026-43502-y", highlight: true, sortOrder: 1,
      abstract: "Substituting a urine sample that may result in an adverse analytical finding with a previously collected clean sample (sample swapping) is strictly prohibited under WADA regulations. We propose a similarity-detection framework based on a convolutional network that explicitly accounts for pattern complexity in longitudinal urinary steroid profiles, evaluated on 67,651 profiles collected between 2021 and 2023 on both synthetic and laboratory-confirmed similar samples.", createdAt: now, updatedAt: now },
    { year: 2026, authors: `${R}, Hammouda, M., Maass, W.`, title: "STT-LLM: Structural-Temporal Tokenization for Adapting LLMs to Longitudinal Clinical Profiles", venue: "In Proceedings of the 43rd International Conference on Machine Learning (ICML 2026), Seoul, South Korea", venueShort: "ICML 2026", type: "Conference", paperUrl: "https://openreview.net/forum?id=B5eIW9X4EW", highlight: true, sortOrder: 2,
      abstract: "STT-LLM is a structural-temporal tokenization framework that adapts LLMs to longitudinal clinical analysis without modifying their backbone architectures. It constructs biologically grounded structural-temporal embeddings and transforms them into LLM-compatible tokens through a specialised token-evolution mechanism. On real-world longitudinal athlete datasets it consistently improves over native LLM tokenization for sequence prediction and anomaly detection, and provides contextual reasoning that aligns closely with expert assessments.", createdAt: now, updatedAt: now },
    { year: 2026, authors: `${R}, Hammouda, M., Maass, W.`, title: "DiGAN: Diffusion-Guided Attention Network for Early Alzheimer's Disease Detection", venue: "In AAAI 2026 Workshop on AI for Healthy Aging and Longevity (AIAA)", venueShort: "AAAI-W 2026", type: "Workshop", paperUrl: "https://arxiv.org/abs/2602.03881", pdfUrl: "https://arxiv.org/pdf/2602.03881", award: "Best Paper Presentation Award", highlight: true, sortOrder: 3,
      abstract: "DiGAN integrates latent diffusion modelling with an attention-guided convolutional network. The diffusion model synthesises realistic longitudinal neuroimaging trajectories from limited training data, enriching temporal context and improving robustness to unevenly spaced visits, while the attention-convolutional layer captures discriminative structural-temporal patterns that distinguish cognitively normal subjects from those with mild cognitive impairment and subjective cognitive decline. Experiments on ADNI show DiGAN outperforms state-of-the-art baselines.", createdAt: now, updatedAt: now },
    { year: 2026, authors: `${R}, Kumar, P., Maass, W.`, title: "LongMoE: Longitudinal Multimodal Learning via Trajectory-Aware Mixture-of-Experts", venue: "arXiv:2606.09907 [cs.LG]", venueShort: "arXiv", type: "Preprint", status: "Under Review", paperUrl: "https://arxiv.org/abs/2606.09907", pdfUrl: "https://arxiv.org/pdf/2606.09907", sortOrder: 4,
      abstract: "Multimodal clinical learning faces modality missingness and longitudinal dynamics. LongMoE is a unified trajectory-aware mixture-of-experts framework that jointly addresses both challenges. Experiments on ADNI, OASIS-3 and MIMIC-IV show improved robustness under missing or weak contemporaneous modalities while remaining competitive in full-modality settings.", createdAt: now, updatedAt: now },
    { year: 2026, authors: `${R}, Hammouda, M., Maass, W.`, title: "CAMOS: Coupled Oscillatory State-Space Model for Multimodal Clinical Time-Series", venue: "arXiv:2609.39484 [cs.LG]", venueShort: "arXiv", type: "Preprint", status: "Under Review", paperUrl: "https://arxiv.org/abs/2609.39484", pdfUrl: "https://arxiv.org/pdf/2609.39484", sortOrder: 5,
      abstract: "We prove that any linear state-space layer whose transition operator does not depend on the modality-availability pattern cannot represent interactions between modalities being jointly present or absent. CAMOS gives each modality a bank of second-order oscillators coupled through an availability-gated matrix inside the differential equation. On ADNI it outperforms uncoupled oscillatory SSMs and clinical fusion models on same-visit staging, landmark prediction and longitudinal forecasting, and under zero-shot transfer to OASIS-3 it is the only model that avoids collapse to the majority class.", createdAt: now, updatedAt: now },

    // 2024
    { year: 2024, authors: `${R}, Khaliq, L.A., Piper, T., Geyer, H., Equey, T., Baume, N., Aikin, R., Maass, W.`, title: "SACNN: Self Attention-based Convolutional Neural Network for Fraudulent Behaviour Detection in Sports", venue: "In Proceedings of the 33rd International Joint Conference on Artificial Intelligence (IJCAI 24), pp. 6017–6025, Jeju, South Korea", venueShort: "IJCAI 2024", type: "Conference", paperUrl: "https://www.ijcai.org/proceedings/2024/665", doi: "10.24963/ijcai.2024/665", highlight: true, sortOrder: 1,
      abstract: "Sample swapping is a potential practice performed by athletes to swap doped samples with clean samples to evade positive doping tests. SACNN is a self attention-based convolutional neural network that incorporates both spatial and temporal behaviour of the longitudinal profile and generates embedding maps for fraud detection in sports, outperforming state-of-the-art baselines for sequential anomaly detection.", createdAt: now, updatedAt: now },
    { year: 2024, authors: `${R}, Liu, R., Maass, W.`, title: "Incorporating Metabolic Information into LLMs for Anomaly Detection in Clinical Time-Series", venue: "In NeurIPS 2024 Workshop on Time Series in the Age of Large Models (TSALM)", venueShort: "NeurIPS-W 2024", type: "Workshop", paperUrl: "https://openreview.net/forum?id=YNLLwZFIY6", pdfUrl: "https://arxiv.org/pdf/2410.12830", sortOrder: 2,
      abstract: "We introduce Metabolism Pathway-driven Prompting (MPP), which integrates metabolic pathway information into LLM prompts to better capture structural and temporal changes in biological samples, and apply it to doping detection in sports using real-world athlete steroid data.", createdAt: now, updatedAt: now },
    { year: 2024, authors: `${R}, Khaliq, L.A., Piper, T., Geyer, H., Equey, T., Baume, N., Aikin, R., Maass, W.`, title: "Analysing the Unseen: Leveraging Data Analytics to Combat the Societal Challenge of Doping in Sports", venue: "In Proceedings of the 45th International Conference on Information Systems (ICIS 24), Bangkok, Thailand", venueShort: "ICIS 2024", type: "Conference", paperUrl: "https://aisel.aisnet.org/icis2024/data_soc/data_soc/2/", sortOrder: 3, createdAt: now, updatedAt: now },
    { year: 2024, authors: `Agnes, C.K., ${R}, Maass, W.`, title: "Semantic Priming via Knowledge Graphs to Analyze and Treat Language Model's Honest Lies", venue: "In Proceedings of the 45th International Conference on Information Systems (ICIS 24), Bangkok, Thailand", venueShort: "ICIS 2024", type: "Conference", paperUrl: "https://aisel.aisnet.org/icis2024/aiinbus/aiinbus/14/", sortOrder: 4, createdAt: now, updatedAt: now },
    { year: 2024, authors: `Reza, Z.B., Syed, A.R., Iqbal, O., Mensah, E., Liu, Q., ${R}, Maass, W.`, title: "RAG for Effective Supply Chain Security Questionnaire Automation", venue: "In Proceedings of the 34th Workshop on Information Technologies and Systems (WITS 24), Bangkok, Thailand", venueShort: "WITS 2024", type: "Workshop", sortOrder: 5, createdAt: now, updatedAt: now },
    { year: 2024, authors: `Chan, T.T., Lange, K., Liu, R., Wein, A., Keßler, N., ${R}, Maass, W.`, title: "Towards Objectively Interpretable Fault Diagnosis for Time-Series Data in Grinding", venue: "In Proceedings of the 34th Workshop on Information Technologies and Systems (WITS 24), Bangkok, Thailand", venueShort: "WITS 2024", type: "Workshop", sortOrder: 6, createdAt: now, updatedAt: now },
    { year: 2024, authors: `${R}, Maass, W.`, title: "Generative Artificial Intelligence in Anti-doping Analysis in Sports", venue: "In: Artificial Intelligence in Sports, Movement, and Health, Chapter 6, pp. 81–93, Springer Cham", venueShort: "Springer", type: "Book Chapter", paperUrl: "https://link.springer.com/chapter/10.1007/978-3-031-67256-9_6", doi: "10.1007/978-3-031-67256-9_6", sortOrder: 7, createdAt: now, updatedAt: now },
    { year: 2024, authors: `John, A., Aidoo, T., Behmanush, H., Gunduz, I.B., Shrestha, H., ${R}, Maass, W.`, title: "LLMRS: Unlocking Potentials of LLM-Based Recommender Systems for Software Purchase", venue: "In Proceedings of the 33rd Workshop on Information Technologies and Systems (WITS 23); arXiv:2401.06676", venueShort: "WITS 2023", type: "Workshop", paperUrl: "https://arxiv.org/abs/2401.06676", pdfUrl: "https://arxiv.org/pdf/2401.06676", sortOrder: 8, createdAt: now, updatedAt: now },

    // 2023
    { year: 2023, authors: `Maass, W., Agnes, C.K., ${R}, Almeida, J.S.`, title: "SNOOP Method: Faithfulness of Text Summarizations for Single Nucleotide Polymorphisms", venue: "In Proceedings of the 2nd Symposium on Human Partnership with Medical AI: Design, Operationalization, and Ethics, AAAI Summer Symposium 2023", venueShort: "AAAI-SS 2023", type: "Workshop", sortOrder: 1, createdAt: now, updatedAt: now },
    { year: 2023, authors: `${R}, Hussain, M., Piper, T., Geyer, H., Equey, T., Baume, N., Aikin, R., Maass, W.`, title: "Modelling Metabolism Pathways using Graph Representation Learning for Fraud Detection in Sports", venue: "In Proceedings of the 3rd IEEE International Conference on Digital Health (ICDH 23)", venueShort: "IEEE ICDH 2023", type: "Conference", paperUrl: "https://www.researchgate.net/publication/373448739_Modelling_Metabolism_Pathways_using_Graph_Representation_Learning_for_Fraud_Detection_in_Sports", sortOrder: 2, createdAt: now, updatedAt: now },

    // 2022
    { year: 2022, authors: `${R}, Piper, T., Geyer, H., Equey, T., Baume, N., Aikin, R., Maass, W.`, title: "Data Analytics for Uncovering Fraudulent Behaviour in Elite Sports", venue: "In Proceedings of the 43rd International Conference on Information Systems (ICIS 22), Copenhagen, Denmark", venueShort: "ICIS 2022", type: "Conference", paperUrl: "https://aisel.aisnet.org/icis2022/data_analytics/data_analytics/13/", sortOrder: 1,
      abstract: "We present a data-analytical methodology supporting anti-doping decision-makers on athlete disambiguation tasks. The model helps identify swapped samples and outperforms current state-of-the-art methods and baseline models on real-world sample swapping cases.", createdAt: now, updatedAt: now },
    { year: 2022, authors: `${R}, Bejder, J., Bonne, T.C., Andersen, A.B., Huertas, J.R., Aikin, R., Nordsborg, N.B., Maass, W.`, title: "Detection of Erythropoietin in Blood to Uncover Doping in Sports using Machine Learning", venue: "In Proceedings of the 2nd IEEE International Conference on Digital Health (ICDH 22)", venueShort: "IEEE ICDH 2022", type: "Conference", paperUrl: "https://ieeexplore.ieee.org/document/9861084/", sortOrder: 2,
      abstract: "A comparison of machine-learning algorithms combined with statistical analysis to identify erythropoietin in blood samples at sea level and moderate altitude; ensemble methods such as random forest and XGBoost provide effective tools for anti-doping organisations.", createdAt: now, updatedAt: now },
    { year: 2022, authors: `${R}, Bejder, J., Bonne, T.C., Andersen, A.B., Huertas, J.R., Aikin, R., Nordsborg, N.B., Maass, W.`, title: "AI-based Approach for Improving the Detection of Blood Doping in Sports", venue: "arXiv:2203.00001 [cs.LG]", venueShort: "arXiv", type: "Preprint", paperUrl: "https://arxiv.org/abs/2203.00001", pdfUrl: "https://arxiv.org/pdf/2203.00001", sortOrder: 3,
      abstract: "A statistical and machine-learning-based approach to identify the presence of the doping substance rhEPO in blood samples.", createdAt: now, updatedAt: now },
  ]);

  /* ------------------------------------------------------------------ */
  /* News                                                                */
  /* ------------------------------------------------------------------ */
  await db.insert(schema.news).values([
    { date: "2026-09-26", category: "Publication", title: "Two new preprints submitted to ICLR 2027", bodyMarkdown: "**LongMoE** (trajectory-aware mixture-of-experts for longitudinal multimodal learning) and **CAMOS** (coupled oscillatory state-space model for multimodal clinical time-series) are now on arXiv and under review.", url: "https://arxiv.org/abs/2609.39484", createdAt: now, updatedAt: now },
    { date: "2026-07-09", category: "Talk", title: "Paper presentation at ICML 2026, Seoul", bodyMarkdown: "I presented **STT-LLM: Structural-Temporal Tokenization for Adapting LLMs to Longitudinal Clinical Profiles** in the main track of the 43rd International Conference on Machine Learning (ICML 2026) in Seoul, South Korea.", url: "https://iss.uni-saarland.de/news/paper-presentation-at-icml-2026", createdAt: now, updatedAt: now },
    { date: "2026-06-06", category: "Publication", title: "LongMoE preprint released", bodyMarkdown: "*LongMoE: Longitudinal Multimodal Learning via Trajectory-Aware Mixture-of-Experts* (with Prakhar Kumar and Wolfgang Maass) is available on arXiv.", url: "https://arxiv.org/abs/2606.09907", createdAt: now, updatedAt: now },
    { date: "2026-05-01", category: "Publication", title: "STT-LLM accepted at ICML 2026", bodyMarkdown: "Our paper on structural-temporal tokenization for adapting large language models to longitudinal clinical profiles has been accepted to the main track of ICML 2026.", url: "https://openreview.net/forum?id=B5eIW9X4EW", createdAt: now, updatedAt: now },
    { date: "2026-03-17", category: "Publication", title: "Article published in Scientific Reports", bodyMarkdown: "*Detection of sample swapping in anti-doping investigations using machine learning* (with Thomas Piper, Mario Thevis and Wolfgang Maass) is published in **Scientific Reports**, volume 16, article 9230.", url: "https://www.nature.com/articles/s41598-026-43502-y", createdAt: now, updatedAt: now },
    { date: "2026-02-27", category: "Award", title: "Best Paper Presentation Award at AAAI 2026 workshop", bodyMarkdown: "**DiGAN: Diffusion-Guided Attention Network for Early Alzheimer's Disease Detection** received the Best Paper Presentation Award at the AAAI 2026 Workshop on AI for Healthy Aging and Longevity.", url: "https://arxiv.org/abs/2602.03881", createdAt: now, updatedAt: now },
    { date: "2025-07-01", category: "Media", title: "Featured in #WEatDFKI, season 2", bodyMarkdown: "I wrap up the second season of DFKI's **#WEatDFKI** series with a portrait on my path from physics to computer science and on AI-powered algorithms for doping detection in sports.", url: "https://www.dfki.de/en/web/about-us/working-at-dfki/we-at-dfki-season-2/maxx-richard-rahman", createdAt: now, updatedAt: now },
    { date: "2025-02-02", category: "News", title: "New blog post: Understanding DeepSeek-R1", bodyMarkdown: "A new post on Medium explains how DeepSeek-R1 builds reasoning capabilities through reinforcement learning.", url: "https://medium.com/@maxxrichard06/understanding-deepseek-r1-reasoning-capabilities-through-reinforcement-learning-734923ee04df", createdAt: now, updatedAt: now },
    { date: "2024-12-15", category: "Talk", title: "Two papers at ICIS 2024 and two at WITS 2024 in Bangkok", bodyMarkdown: "*Analysing the Unseen* and *Semantic Priming via Knowledge Graphs* were presented at the 45th International Conference on Information Systems, and *RAG for Supply Chain Security Questionnaire Automation* and *Objectively Interpretable Fault Diagnosis in Grinding* at WITS 2024.", url: "https://aisel.aisnet.org/icis2024/data_soc/data_soc/2/", createdAt: now, updatedAt: now },
    { date: "2024-12-14", category: "Publication", title: "Workshop paper at NeurIPS 2024", bodyMarkdown: "*Incorporating Metabolic Information into LLMs for Anomaly Detection in Clinical Time-Series* was presented at the NeurIPS 2024 Workshop on Time Series in the Age of Large Models.", url: "https://neurips.cc/virtual/2024/103028", createdAt: now, updatedAt: now },
    { date: "2024-09-03", category: "Publication", title: "Book chapter published by Springer", bodyMarkdown: "*Generative Artificial Intelligence in Anti-doping Analysis in Sports* appears as Chapter 6 of **Artificial Intelligence in Sports, Movement, and Health** (Springer Cham).", url: "https://link.springer.com/chapter/10.1007/978-3-031-67256-9_6", createdAt: now, updatedAt: now },
    { date: "2024-08-06", category: "Talk", title: "SACNN presented at IJCAI 2024, Jeju", bodyMarkdown: "Our paper **SACNN: Self Attention-based Convolutional Neural Network for Fraudulent Behaviour Detection in Sports** was presented at the 33rd International Joint Conference on Artificial Intelligence. DFKI and Saarland University issued a press release on the method for detecting doping cases using AI.", url: "https://www.dfki.de/en/web/news/detect-doping-cases-using-ai", createdAt: now, updatedAt: now },
    { date: "2024-03-04", category: "Media", title: "ARD reports on AI in the fight against doping", bodyMarkdown: "German public broadcaster ARD covered our deep-learning methods for identifying suspicious blood and urine samples.", url: "https://www.youtube.com/watch?v=07XOMpSp9Oo", createdAt: now, updatedAt: now },
    { date: "2023-08-01", category: "Publication", title: "Paper at IEEE ICDH 2023", bodyMarkdown: "*Modelling Metabolism Pathways using Graph Representation Learning for Fraud Detection in Sports* was presented at the 3rd IEEE International Conference on Digital Health.", createdAt: now, updatedAt: now },
    { date: "2022-12-12", category: "Talk", title: "ICIS 2022 presentation in Copenhagen", bodyMarkdown: "*Data Analytics for Uncovering Fraudulent Behaviour in Elite Sports* was presented at the 43rd International Conference on Information Systems.", url: "https://aisel.aisnet.org/icis2022/data_analytics/data_analytics/13/", createdAt: now, updatedAt: now },
    { date: "2022-07-25", category: "Media", title: "Saarland Minister President visits DFKI", bodyMarkdown: "During her Summer Tour 2022, Minister President Anke Rehlinger visited DFKI Saarbrücken, where we presented our research on AI against sports doping.", url: "https://www.youtube.com/watch?v=ZEGFu5rCU0k", createdAt: now, updatedAt: now },
    { date: "2022-03-01", category: "Publication", title: "Preprint on AI-based blood doping detection", bodyMarkdown: "*AI-based Approach for Improving the Detection of Blood Doping in Sports* is on arXiv (2203.00001); the work was later presented at IEEE ICDH 2022 and covered by SR and SRF.", url: "https://arxiv.org/abs/2203.00001", createdAt: now, updatedAt: now },
    { date: "2021-10-01", category: "News", title: "Joined DFKI and Saarland University", bodyMarkdown: "Started as a researcher in the Smart Service Engineering department at DFKI Saarbrücken and as a PhD student at Saarland University under Prof. Wolfgang Maaß.", createdAt: now, updatedAt: now },
  ]);

  /* ------------------------------------------------------------------ */
  /* Blog                                                                */
  /* ------------------------------------------------------------------ */
  await db.insert(schema.blogPosts).values([
    {
      slug: "understanding-deepseek-r1-reasoning-through-reinforcement-learning",
      title: "Understanding DeepSeek-R1: Reasoning Capabilities Through Reinforcement Learning",
      excerpt: "How DeepSeek-R1 reaches parity with top-tier reasoning models such as OpenAI's o1, what is unusual about its training pipeline, and why its open-source release matters for AI research.",
      contentMarkdown: `This post was originally published on **Medium**. Read the full article here: [Understanding DeepSeek-R1: Reasoning Capabilities Through Reinforcement Learning](https://medium.com/@maxxrichard06/understanding-deepseek-r1-reasoning-capabilities-through-reinforcement-learning-734923ee04df).

**In short**

- DeepSeek-R1 shows that strong step-by-step reasoning can emerge largely from reinforcement learning, with comparatively little supervised fine-tuning.
- The training pipeline alternates reinforcement-learning stages with small curated data, and distils the resulting behaviour into smaller models.
- The open release of the weights and the recipe lets the research community study and reproduce reasoning behaviour that was previously only available through closed APIs.`,
      tags: "LLMs, Reinforcement Learning, Reasoning", externalUrl: "https://medium.com/@maxxrichard06/understanding-deepseek-r1-reasoning-capabilities-through-reinforcement-learning-734923ee04df",
      readingMinutes: 10, publishedAt: "2025-02-02", createdAt: now, updatedAt: now,
    },
  ]);

  /* ------------------------------------------------------------------ */
  /* Press                                                               */
  /* ------------------------------------------------------------------ */
  await db.insert(schema.press).values([
    { date: "2024-03-04", outlet: "ARD News", title: "Artificial intelligence for fight against doping in sports", language: "German",
      description: "The media coverage by the Arbeitsgemeinschaft der öffentlich-rechtlichen Rundfunkanstalten der Bundesrepublik Deutschland (ARD) on the use of deep learning methods to identify suspicious blood and urine samples in the fight against doping in sports. The segment highlights how advanced AI techniques are revolutionizing doping detection, ensuring fairness and integrity in athletic competitions.",
      videoUrl: "https://www.youtube.com/embed/07XOMpSp9Oo", sortOrder: 1 },
    { date: "2022-07-25", outlet: "DFKI", title: "Saarland Minister President Mrs. Anke Rehlinger Summer Tour", language: "German",
      description: "Saarland's Minister President Mrs. Anke Rehlinger visits the German Center for Artificial Intelligence (DFKI) in Saarbrücken, Germany during her Summer Tour 2022. We presented the innovative research on using artificial intelligence to fight against sports doping and discussed ideas to maintain integrity in sports.",
      videoUrl: "https://www.youtube.com/embed/ZEGFu5rCU0k", sortOrder: 2 },
    { date: "2022-03-09", outlet: "SRF News", title: "AI Advances in Anti-Doping: Detecting EPO and Sample Swapping", language: "German",
      description: "The media coverage by Schweizer Radio und Fernsehen (SRF) on our innovative research using artificial intelligence and machine learning to detect doping activities. The focus is on identifying EPO doping and uncovering sample swapping practices, highlighting the latest advancements in maintaining fairness and integrity in sports. We showed how AI algorithms could help the anti-doping efforts.",
      videoUrl: "https://www.youtube.com/embed/ePU8EBWWqPw", sortOrder: 3 },
    { date: "2022-02-17", outlet: "SR News", title: "New Technology Improves Blood Doping Detection in Sports", language: "German",
      description: "The media coverage by Saarländischer Rundfunk (SR) on our groundbreaking research using artificial intelligence to detect blood doping in sports. The coverage highlights how AI algorithms is being utilized to improve the detection of prohibited substance in the blood samples and promote fairness in competitive athletics.",
      videoUrl: "https://www.youtube.com/embed/uhE3sUI6BZ4", sortOrder: 4 },
    { date: "2024-08-06", outlet: "DFKI / Saarland University press release", title: "Information scientists develop method to detect doping cases using AI", language: "English",
      description: "Press release on SACNN, the self attention-based convolutional network presented at IJCAI 2024 that spots swapped samples in longitudinal steroid profiles. Picked up by EurekAlert!, Medical Xpress and Bionity.",
      url: "https://www.dfki.de/en/web/news/detect-doping-cases-using-ai", sortOrder: 5 },
    { date: "2025-07-01", outlet: "DFKI — #WEatDFKI", title: "#WEatDFKI: Meet Maxx Richard Rahman", language: "English",
      description: "Portrait in DFKI's #WEatDFKI series (season 2): from a physics degree in Delhi and Bonn to developing AI algorithms for doping detection in sports at DFKI Saarbrücken.",
      url: "https://www.dfki.de/en/web/about-us/working-at-dfki/we-at-dfki-season-2/maxx-richard-rahman", sortOrder: 6 },
    { date: "2021-11-01", outlet: "DFKI News", title: "Machine Learning for EPO Detection — joint project by WADA and DFKI", language: "English",
      description: "DFKI's Smart Service Engineering group supports the World Anti-Doping Agency by applying machine learning and deep learning to predict whether an athlete has taken EPO, aiming at cheaper and more specific tests.",
      url: "https://www.dfki.de/en/web/news/machine-learning-for-epo-detection-joint-project-by-wada-and-dfki", sortOrder: 7 },
  ]);

  /* ------------------------------------------------------------------ */
  /* Teaching                                                            */
  /* ------------------------------------------------------------------ */
  await db.insert(schema.teaching).values([
    { term: "2021 — Present", course: "Data Science (Lecture)", role: "Teaching Assistant", institution: "Saarland University, Chair of Business Informatics", url: "https://iss.uni-saarland.de/ds",
      description: "Supervised learning and ensemble methods, unsupervised learning, neural networks, large language models and the transformer architecture. Tutorials, exercises and exam support.", sortOrder: 1 },
    { term: "2021 — Present", course: "Künstliche Intelligenz in Unternehmen (KIU)", role: "Teaching Assistant", institution: "Saarland University, Chair of Business Informatics", url: "https://iss.uni-saarland.de/kiu",
      description: "Artificial-intelligence technologies in practice: basic concepts and their application with concrete examples from companies.", sortOrder: 2 },
    { term: "2021 — Present", course: "Seminar: Advanced Topics in Business Informatics", role: "Seminar Supervisor", institution: "Saarland University, Chair of Business Informatics", url: "https://iss.uni-saarland.de/sem",
      description: "Supervision of seminar papers on machine learning, LLMs and data analytics topics.", sortOrder: 3 },
    { term: "2021 — Present", course: "Bachelor & Master Thesis Supervision", role: "Supervisor", institution: "Saarland University / DFKI",
      description: "Supervision of theses on anomaly detection, LLM-based systems (recommender systems, RAG, knowledge graphs), time-series analysis and healthcare AI.", sortOrder: 4 },
  ]);

  console.log("✔ Seeded profile, socials, education, experience, research areas, projects, publications, news, blog, press and teaching.");
}

main().catch((e) => { console.error(e); process.exit(1); });
