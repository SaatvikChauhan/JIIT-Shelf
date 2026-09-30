import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { analyticsId, trackEvent } from "./lib/analytics.js";
import { readJSON } from "./lib/storage.js";
import { parseSubjectName } from "./lib/utils.js";

export default function useCustomAnalytics() {
  const { pathname, key } = useLocation();
  const previous = useRef(null);
  useEffect(() => {
    const navigation = `${key}:${pathname}`;
    if (previous.current === navigation) return;
    previous.current = navigation;
    const id = analyticsId();
    trackEvent("page_view", {}, id);
    const match = pathname.match(/^\/material\/([\w-]+)$/);
    if (match) {
      const subject = readJSON("selectedSubject");
      const title = subject?.id === match[1] ? parseSubjectName(subject.name).title : "Course material";
      trackEvent("course_open", { courseId: match[1], courseName: title || "Course material" });
    }
    if (pathname.startsWith("/chat/")) trackEvent("community_join");
  }, [pathname, key]);
}
