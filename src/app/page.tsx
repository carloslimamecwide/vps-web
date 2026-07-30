import { CourseApp } from "@/components/course-app";
import { CourseProvider } from "@/components/course-provider";
import { GuideContent } from "@/components/guide-content";
import { GuidePanel } from "@/components/guide-panel";
import { devopsHtml } from "@/content/devops";
import { introHtml } from "@/content/intro";
import { learningHtml } from "@/content/learning";
import { setupHtml } from "@/content/setup";
import { vpsHtml } from "@/content/vps";

export default function Home() {
  return (
    <CourseProvider>
      <CourseApp>
        <GuidePanel id="intro" className="guide-intro">
          <GuideContent guideId="intro" html={introHtml} />
        </GuidePanel>
        <GuidePanel id="devops" className="guide-devops">
          <GuideContent guideId="devops" html={devopsHtml} />
        </GuidePanel>
        <GuidePanel id="learning" className="guide-learning">
          <GuideContent guideId="learning" html={learningHtml} />
        </GuidePanel>
        <GuidePanel id="setup" className="guide-setup">
          <GuideContent guideId="setup" html={setupHtml} />
        </GuidePanel>
        <GuidePanel id="vps">
          <GuideContent guideId="vps" html={vpsHtml} />
        </GuidePanel>
      </CourseApp>
    </CourseProvider>
  );
}
