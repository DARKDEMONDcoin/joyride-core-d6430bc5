/** @doc Learn dashboard listing courses, lessons and user progress. */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  BookOpen,
  Brain,
  Target,
  TrendingUp,
  Calendar,
  AlertCircle,
  Sparkles,
  MessageSquare,
} from "lucide-react";

/**
 * Learning Dashboard — surfaces the previously-unused learning tables:
 *   student_topics, student_mistakes, student_exams, study_plans, learn_sessions
 *
 * Actions are intentionally minimal: the deep learning UX still happens
 * inside /chat (study mode). This dashboard is the "home base" that shows
 * the learner what they've been working on, what's due for review, and
 * links them back into a chat session focused on that topic.
 */

type Topic = {
  id: string;
  topic: string;
  level: string | null;
  progress: number | null;
  last_studied_at: string | null;
};

type Mistake = {
  id: string;
  topic: string;
  concept: string | null;
  mistake_count: number | null;
  next_review_at: string | null;
  review_stage: number | null;
  resolved: boolean | null;
};

type Exam = {
  id: string;
  subject: string | null;
  topic: string | null;
  score: number | null;
  total_questions: number | null;
  created_at: string;
};

type Plan = {
  id: string;
  subjects: string | null;
  exam_date: string | null;
  hours_per_day: number | null;
  is_active: boolean | null;
};

type Session = {
  id: string;
  topic: string | null;
  duration_min: number | null;
  questions_total: number | null;
  questions_correct: number | null;
  created_at: string;
};

export default function LearnDashboardPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [dueMistakes, setDueMistakes] = useState<Mistake[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [activePlan, setActivePlan] = useState<Plan | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const { data: userRes } = await supabase.auth.getUser();
        const uid = userRes.user?.id;
        if (!uid) {
          if (!cancelled) setLoading(false);
          return;
        }
        const nowIso = new Date().toISOString();
        const [tRes, mRes, eRes, pRes, sRes] = await Promise.all([
          supabase
            .from("student_topics")
            .select("id,topic,level,progress,last_studied_at")
            .eq("user_id", uid)
            .order("last_studied_at", { ascending: false, nullsFirst: false })
            .limit(8),
          supabase
            .from("student_mistakes")
            .select("id,topic,concept,mistake_count,next_review_at,review_stage,resolved")
            .eq("user_id", uid)
            .eq("resolved", false)
            .lte("next_review_at", nowIso)
            .order("next_review_at", { ascending: true })
            .limit(10),
          supabase
            .from("student_exams")
            .select("id,subject,topic,score,total_questions,created_at")
            .eq("user_id", uid)
            .order("created_at", { ascending: false })
            .limit(5),
          supabase
            .from("study_plans")
            .select("id,subjects,exam_date,hours_per_day,is_active")
            .eq("user_id", uid)
            .eq("is_active", true)
            .order("created_at", { ascending: false })
            .limit(1)
            .maybeSingle(),
          supabase
            .from("learn_sessions")
            .select("id,topic,duration_min,questions_total,questions_correct,created_at")
            .eq("user_id", uid)
            .order("created_at", { ascending: false })
            .limit(5),
        ]);
        if (cancelled) return;
        setTopics((tRes.data as Topic[]) ?? []);
        setDueMistakes((mRes.data as Mistake[]) ?? []);
        setExams((eRes.data as Exam[]) ?? []);
        setActivePlan((pRes.data as Plan) ?? null);
        setSessions((sRes.data as Session[]) ?? []);
      } catch (err) {
        console.error("[learn] dashboard load failed", err);
        toast.error("تعذّر تحميل لوحة التعلّم");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const openInChat = (topic: string) => {
    const q = encodeURIComponent(`ذاكر معي: ${topic}`);
    navigate(`/chat?mode=learn&q=${q}`);
  };

  const startReview = () => {
    if (dueMistakes.length === 0) {
      toast.info("لا توجد مراجعات مستحقة الآن — عمل رائع!");
      return;
    }
    const topics = dueMistakes.map((m) => m.topic).join("، ");
    const q = encodeURIComponent(`راجع معي هذه المفاهيم التي أخطأت بها: ${topics}`);
    navigate(`/chat?mode=learn&q=${q}`);
  };

  const totalMastered = topics.filter((t) => (t.progress ?? 0) >= 80).length;
  const avgProgress =
    topics.length > 0
      ? Math.round(topics.reduce((a, t) => a + (t.progress ?? 0), 0) / topics.length)
      : 0;

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-10">
        <header className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-semibold sm:text-3xl">
              <Brain className="h-7 w-7 text-emerald-400" />
              لوحة التعلّم
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              متابعة تقدّمك، مراجعة أخطائك، وخططك الدراسية النشطة.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={startReview}
              className="border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10"
            >
              <Sparkles className="ml-2 h-4 w-4" />
              ابدأ مراجعة اليوم ({dueMistakes.length})
            </Button>
            <Button
              onClick={() => navigate("/chat?mode=learn")}
              className="bg-emerald-500 text-black hover:bg-emerald-400"
            >
              <MessageSquare className="ml-2 h-4 w-4" />
              جلسة تعلّم جديدة
            </Button>
          </div>
        </header>

        {/* Stats row */}
        <section className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard
            icon={<BookOpen className="h-4 w-4" />}
            label="مواضيع نشطة"
            value={topics.length}
            loading={loading}
          />
          <StatCard
            icon={<Target className="h-4 w-4" />}
            label="متقن"
            value={totalMastered}
            loading={loading}
          />
          <StatCard
            icon={<AlertCircle className="h-4 w-4" />}
            label="مراجعات مستحقة"
            value={dueMistakes.length}
            loading={loading}
            highlight={dueMistakes.length > 0}
          />
          <StatCard
            icon={<TrendingUp className="h-4 w-4" />}
            label="متوسط التقدّم"
            value={`${avgProgress}%`}
            loading={loading}
          />
        </section>

        {/* Active study plan */}
        {activePlan && (
          <Card className="mb-6 border-emerald-500/20 bg-emerald-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="h-4 w-4 text-emerald-400" />
                الخطة النشطة
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-4 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">المواد</div>
                <div>{activePlan.subjects || "—"}</div>
              </div>
              {activePlan.exam_date && (
                <div>
                  <div className="text-xs text-muted-foreground">تاريخ الامتحان</div>
                  <div>{new Date(activePlan.exam_date).toLocaleDateString("ar")}</div>
                </div>
              )}
              {activePlan.hours_per_day !== null && (
                <div>
                  <div className="text-xs text-muted-foreground">ساعات/يوم</div>
                  <div>{activePlan.hours_per_day}</div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Topics */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">مواضيعك</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {loading ? (
                <ListSkeleton />
              ) : topics.length === 0 ? (
                <EmptyState text="لا مواضيع بعد — ابدأ جلسة تعلّم لإضافة أول موضوع." />
              ) : (
                topics.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => openInChat(t.topic)}
                    className="block w-full rounded-lg border border-border/60 bg-card/40 p-3 text-right transition hover:border-emerald-500/40 hover:bg-emerald-500/5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-medium">{t.topic}</div>
                      {t.level && (
                        <Badge variant="outline" className="text-xs">
                          {t.level}
                        </Badge>
                      )}
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Progress value={t.progress ?? 0} className="h-1.5" />
                      <span className="w-10 shrink-0 text-xs text-muted-foreground">
                        {t.progress ?? 0}%
                      </span>
                    </div>
                  </button>
                ))
              )}
            </CardContent>
          </Card>

          {/* Due reviews */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">مراجعات مستحقة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {loading ? (
                <ListSkeleton />
              ) : dueMistakes.length === 0 ? (
                <EmptyState text="لا شيء للمراجعة الآن. أحسنت!" />
              ) : (
                dueMistakes.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => openInChat(m.concept || m.topic)}
                    className="block w-full rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-right transition hover:border-amber-500/40 hover:bg-amber-500/10"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm font-medium">{m.concept || m.topic}</div>
                      <Badge variant="outline" className="text-xs">
                        مرحلة {m.review_stage ?? 0}
                      </Badge>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {m.topic} · تكرّر {m.mistake_count ?? 1} مرة
                    </div>
                  </button>
                ))
              )}
            </CardContent>
          </Card>

          {/* Recent exams */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">آخر الاختبارات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {loading ? (
                <ListSkeleton />
              ) : exams.length === 0 ? (
                <EmptyState text="لم تُجرِ أي اختبار بعد." />
              ) : (
                exams.map((e) => {
                  const pct =
                    e.score !== null && e.total_questions
                      ? Math.round((Number(e.score) / e.total_questions) * 100)
                      : null;
                  return (
                    <div
                      key={e.id}
                      className="flex items-center justify-between rounded-lg border border-border/60 p-3 text-sm"
                    >
                      <div>
                        <div className="font-medium">{e.subject || "اختبار"}</div>
                        <div className="text-xs text-muted-foreground">
                          {e.topic ?? "—"} ·{" "}
                          {new Date(e.created_at).toLocaleDateString("ar")}
                        </div>
                      </div>
                      {pct !== null && (
                        <Badge
                          variant="outline"
                          className={
                            pct >= 80
                              ? "border-emerald-500/40 text-emerald-300"
                              : pct >= 50
                                ? "border-amber-500/40 text-amber-300"
                                : "border-red-500/40 text-red-300"
                          }
                        >
                          {pct}%
                        </Badge>
                      )}
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>

          {/* Recent sessions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">آخر الجلسات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {loading ? (
                <ListSkeleton />
              ) : sessions.length === 0 ? (
                <EmptyState text="لم تبدأ أي جلسة بعد." />
              ) : (
                sessions.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between rounded-lg border border-border/60 p-3 text-sm"
                  >
                    <div>
                      <div className="font-medium">{s.topic ?? "جلسة"}</div>
                      <div className="text-xs text-muted-foreground">
                        {s.duration_min ?? 0} د ·{" "}
                        {new Date(s.created_at).toLocaleDateString("ar")}
                      </div>
                    </div>
                    {s.questions_total ? (
                      <Badge variant="outline">
                        {s.questions_correct ?? 0}/{s.questions_total}
                      </Badge>
                    ) : null}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  loading,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  loading?: boolean;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-3 ${
        highlight
          ? "border-amber-500/40 bg-amber-500/5"
          : "border-border/60 bg-card/40"
      }`}
    >
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-1 text-xl font-semibold">
        {loading ? <Skeleton className="h-6 w-12" /> : value}
      </div>
    </div>
  );
}

function ListSkeleton() {
  return (
    <>
      <Skeleton className="h-14 w-full" />
      <Skeleton className="h-14 w-full" />
      <Skeleton className="h-14 w-full" />
    </>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-dashed border-border/60 p-6 text-center text-sm text-muted-foreground">
      {text}
    </div>
  );
}
