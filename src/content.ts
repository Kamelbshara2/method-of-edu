export type Dialect = "egyptian" | "jordanian" | "emirati" | "syrian";
export const dialects: {
  id: Dialect;
  name: string;
  arabic: string;
  flag: string;
}[] = [
  { id: "egyptian", name: "Egyptian", arabic: "مصري", flag: "🇪🇬" },
  { id: "jordanian", name: "Jordanian", arabic: "أردني", flag: "🇯🇴" },
  { id: "emirati", name: "Emirati", arabic: "إماراتي", flag: "🇦🇪" },
  { id: "syrian", name: "Syrian", arabic: "سوري", flag: "🇸🇾" },
];
export const voice: Record<
  Dialect,
  { greeting: string; intro: string; hint: string; encourage: string }
> = {
  egyptian: {
    greeting: "أهلًا بيك، خلّينا نفهم سوا.",
    intro: "الفكرة مش إنك تحفظ أكتر، الفكرة إنك تفهم أعمق.",
    hint: "بصّ على الموقف واسأل نفسك: الطالب بيعمل إيه عشان يتعلّم؟",
    encourage: "كل محاولة بتوضّح لك الفكرة أكتر.",
  },
  jordanian: {
    greeting: "يا هلا، خلّينا نفهم سوا.",
    intro: "الفكرة مش تحفظ أكثر، الفكرة تفهم بشكل أعمق.",
    hint: "شوف الموقف واسأل حالك: الطالب شو بعمل عشان يتعلّم؟",
    encourage: "كل محاولة بتخلّي الفكرة أوضح عندك.",
  },
  emirati: {
    greeting: "حيّاك، خلّنا نفهم مع بعض.",
    intro: "السالفة مب إنك تحفظ أكثر، السالفة إنك تفهم بعمق.",
    hint: "شوف الموقف واسأل عمرك: الطالب شو يسوي عشان يتعلّم؟",
    encourage: "كل محاولة توضّح لك الفكرة أكثر.",
  },
  syrian: {
    greeting: "أهلين، خلّينا نفهم سوا.",
    intro: "الفكرة مو إنك تحفظ أكتر، الفكرة إنك تفهم أعمق.",
    hint: "شوف الموقف واسأل حالك: الطالب شو عم يعمل ليتعلّم؟",
    encourage: "كل محاولة بتخلّي الفكرة أوضح عندك.",
  },
};
export type Topic = {
  id: string;
  number: string;
  title: string;
  ar: string;
  category: string;
  minutes: number;
  color: string;
  description: string;
  arabicDescription: string;
  keywords: { en: string; ar: string }[];
  objectives: string[];
  arObjectives: string[];
  explanation: string;
  arExplanation: string;
  example: string;
  arExample: string;
  takeaway: string;
  arTakeaway: string;
  source: string;
  dialect: Record<Dialect, string>;
};
export { midtermTopics as topics } from "./midterm/chapters";
export type Question = {
  id: string;
  segmentId: string;
  citations: import("./midterm/sources").CourseCitation[];
  topic: string;
  type: string;
  stem: string;
  ar: string;
  options: string[];
  arOptions: string[];
  correct: number;
  why: string;
  arWhy: string;
  distractors: string[];
  arDistractors: string[];
};
export { midtermQuestions as questions } from "./midterm/questions";
