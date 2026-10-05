import type { IconType } from "react-icons";
import {
  IoMailOutline, IoPhonePortraitOutline, IoLocationOutline, IoChevronDown, IoBookOutline,
  IoLogoLinkedin, IoLogoGithub, IoLogoTwitter, IoLogoFacebook, IoLogoInstagram, IoLogoYoutube,
  IoSchoolOutline, IoDocumentTextOutline, IoPaperPlane, IoCloseOutline, IoEyeOutline, IoBriefcaseOutline,
  IoFlaskOutline, IoPulseOutline, IoAnalyticsOutline, IoChatbubblesOutline, IoMedkitOutline, IoFitnessOutline,
  IoGitNetworkOutline, IoSparklesOutline, IoLogoMedium, IoGlobeOutline, IoNewspaperOutline, IoLinkOutline, IoCalendarOutline,
} from "react-icons/io5";
import { SiGooglescholar, SiHuggingface, SiOrcid, SiResearchgate, SiDblp, SiArxiv } from "react-icons/si";

export const socialIcons: Record<string, IconType> = {
  linkedin: IoLogoLinkedin, github: IoLogoGithub, twitter: IoLogoTwitter, x: IoLogoTwitter, facebook: IoLogoFacebook,
  instagram: IoLogoInstagram, youtube: IoLogoYoutube, scholar: SiGooglescholar, googlescholar: SiGooglescholar,
  huggingface: SiHuggingface, orcid: SiOrcid, researchgate: SiResearchgate, dblp: SiDblp, arxiv: SiArxiv,
  medium: IoLogoMedium, website: IoGlobeOutline, email: IoMailOutline, cv: IoDocumentTextOutline, link: IoLinkOutline,
};

export const areaIcons: Record<string, IconType> = {
  flask: IoFlaskOutline, pulse: IoPulseOutline, analytics: IoAnalyticsOutline, chat: IoChatbubblesOutline,
  medkit: IoMedkitOutline, fitness: IoFitnessOutline, network: IoGitNetworkOutline, sparkles: IoSparklesOutline,
  book: IoBookOutline, school: IoSchoolOutline, news: IoNewspaperOutline,
};

export {
  IoMailOutline, IoPhonePortraitOutline, IoLocationOutline, IoChevronDown, IoBookOutline, IoSchoolOutline,
  IoDocumentTextOutline, IoPaperPlane, IoCloseOutline, IoEyeOutline, IoBriefcaseOutline, IoNewspaperOutline, IoCalendarOutline,
};
