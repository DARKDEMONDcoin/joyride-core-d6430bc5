/** @doc Anything.com control panel — create, iterate on, publish and manage app projects via the Anything API. */
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  anything,
  AnythingApiError,
  type AnythingDeployment,
  type AnythingDomain,
  type AnythingDatabase,
  type AnythingMe,
  type AnythingMessage,
  type AnythingProject,
  type AnythingSecret,
  type AnythingStatus,
} from "@/lib/anything/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

function errMsg(e: unknown) {
  if (e instanceof AnythingApiError) return e.message;
  return e instanceof Error ? e.message : "Unexpected error";
}

export default function AnythingPage() {
  const [me, setMe] = useState<AnythingMe | null>(null);
  const [loadingMe, setLoadingMe] = useState(true);
  const [fatal, setFatal] = useState<string | null>(null);

  const [projects, setProjects] = useState<AnythingProject[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [prompt, setPrompt] = useState("");
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);

  const orgId = useMemo(() => me?.organizations?.[0]?.id ?? "", [me]);

  const loadProjects = useCallback(async () => {
    setLoadingProjects(true);
    try {
      const res = await anything.projects.list({ query: search || undefined, limit: 50 });
      setProjects(res?.projects ?? []);
    } catch (e) {
      toast.error(errMsg(e));
    } finally {
      setLoadingProjects(false);
    }
  }, [search]);

  useEffect(() => {
    (async () => {
      try {
        const data = await anything.me();
        setMe(data);
      } catch (e) {
        setFatal(errMsg(e));
      } finally {
        setLoadingMe(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (me) void loadProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me]);

  const createProject = async () => {
    if (!prompt.trim()) return toast.error("اكتب وصف التطبيق أولاً");
    if (!orgId) return toast.error("لا توجد مؤسسة (organization) مرتبطة بالمفتاح");
    setCreating(true);
    try {
      const res = await anything.projects.create({
        prompt: prompt.trim(),
        organizationId: orgId,
        name: name.trim() || undefined,
      });
      const newId = (res?.projectGroupId ?? res?.id) as string | undefined;
      toast.success("تم إنشاء المشروع");
      setPrompt("");
      setName("");
      await loadProjects();
      if (newId) setSelectedId(newId);
    } catch (e) {
      toast.error(errMsg(e));
    } finally {
      setCreating(false);
    }
  };

  if (loadingMe) {
    return (
      <div className="mx-auto max-w-6xl space-y-4 p-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (fatal) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <Card>
          <CardHeader>
            <CardTitle>تعذّر الاتصال بـ Anything API</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>{fatal}</p>
            <p>تأكد من تسجيل الدخول ومن صلاحية مفتاح ANYTHING_API_KEY.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 md:p-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Anything Builder</h1>
          <p className="text-sm text-muted-foreground">
            أنشئ التطبيقات وانشرها وتابع حالتها عبر Anything.com API.
          </p>
        </div>
        {me?.organizations?.[0]?.name ? <Badge variant="secondary">{me.organizations[0].name}</Badge> : null}
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">إنشاء مشروع جديد</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="اسم المشروع (اختياري)" value={name} onChange={(e) => setName(e.target.value)} />
          <Textarea
            placeholder="اوصف التطبيق الذي تريد بناءه…"
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button onClick={createProject} disabled={creating}>
            {creating ? "جارٍ الإنشاء…" : "إنشاء وبدء البناء"}
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-[320px_1fr]">
        <Card className="h-fit">
          <CardHeader className="space-y-3">
            <CardTitle className="text-lg">المشاريع</CardTitle>
            <div className="flex gap-2">
              <Input
                placeholder="بحث…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && loadProjects()}
              />
              <Button variant="outline" onClick={loadProjects} disabled={loadingProjects}>
                تحديث
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[420px]">
              <ul className="divide-y">
                {projects.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(p.id)}
                      className={`w-full px-4 py-3 text-start transition hover:bg-muted/60 ${
                        selectedId === p.id ? "bg-muted" : ""
                      }`}
                    >
                      <div className="truncate text-sm font-medium">{p.name || p.id}</div>
                      <div className="truncate text-xs text-muted-foreground">{p.slug || p.id}</div>
                    </button>
                  </li>
                ))}
                {!loadingProjects && projects.length === 0 ? (
                  <li className="px-4 py-6 text-sm text-muted-foreground">لا توجد مشاريع.</li>
                ) : null}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        {selectedId ? (
          <ProjectPanel key={selectedId} projectId={selectedId} onDeleted={() => { setSelectedId(null); void loadProjects(); }} />
        ) : (
          <Card className="flex items-center justify-center p-10 text-sm text-muted-foreground">
            اختر مشروعًا لعرض تفاصيله.
          </Card>
        )}
      </div>
    </div>
  );
}

function ProjectPanel({ projectId, onDeleted }: { projectId: string; onDeleted: () => void }) {
  const [status, setStatus] = useState<AnythingStatus | null>(null);
  const [messages, setMessages] = useState<AnythingMessage[]>([]);
  const [deployments, setDeployments] = useState<AnythingDeployment[]>([]);
  const [secrets, setSecrets] = useState<AnythingSecret[]>([]);
  const [busy, setBusy] = useState(false);
  const [changePrompt, setChangePrompt] = useState("");
  const [slug, setSlug] = useState("");
  const [secretName, setSecretName] = useState("");
  const [secretValue, setSecretValue] = useState("");

  const refreshStatus = useCallback(async () => {
    try {
      setStatus(await anything.projects.status(projectId));
    } catch (e) {
      toast.error(errMsg(e));
    }
  }, [projectId]);

  useEffect(() => {
    void refreshStatus();
    const t = setInterval(() => void refreshStatus(), 15000);
    return () => clearInterval(t);
  }, [refreshStatus]);

  const run = async (fn: () => Promise<unknown>, okMsg?: string) => {
    setBusy(true);
    try {
      await fn();
      if (okMsg) toast.success(okMsg);
      await refreshStatus();
    } catch (e) {
      toast.error(errMsg(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2">
        <CardTitle className="text-lg">تفاصيل المشروع</CardTitle>
        <div className="flex flex-wrap items-center gap-2">
          {status?.status ? <Badge variant="outline">{status.status}</Badge> : null}
          {status?.deployment?.url ? (
            <a
              className="text-sm underline"
              href={String(status.deployment.url)}
              target="_blank"
              rel="noreferrer"
            >
              فتح المعاينة
            </a>
          ) : null}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="build">
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="build">بناء</TabsTrigger>
            <TabsTrigger value="publish">نشر</TabsTrigger>
            <TabsTrigger value="messages">الرسائل</TabsTrigger>
            <TabsTrigger value="deployments">النشرات</TabsTrigger>
            <TabsTrigger value="secrets">الأسرار</TabsTrigger>
            <TabsTrigger value="danger">إعدادات</TabsTrigger>
          </TabsList>

          <TabsContent value="build" className="space-y-3 pt-4">
            {status?.buildErrors ? (
              <pre className="max-h-40 overflow-auto rounded-md bg-destructive/10 p-3 text-xs text-destructive">
                {status.buildErrors}
              </pre>
            ) : null}
            <Textarea
              rows={4}
              placeholder="اطلب تعديلًا على المشروع…"
              value={changePrompt}
              onChange={(e) => setChangePrompt(e.target.value)}
            />
            <div className="flex gap-2">
              <Button
                disabled={busy || !changePrompt.trim()}
                onClick={() =>
                  run(async () => {
                    await anything.projects.generate(projectId, { prompt: changePrompt.trim() });
                    setChangePrompt("");
                  }, "تم إرسال الطلب")
                }
              >
                إرسال
              </Button>
              <Button variant="outline" disabled={busy} onClick={() => void refreshStatus()}>
                تحديث الحالة
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="publish" className="space-y-3 pt-4">
            <Input placeholder="slug (اختياري)" value={slug} onChange={(e) => setSlug(e.target.value)} />
            <div className="flex flex-wrap gap-2">
              <Button
                disabled={busy}
                onClick={() =>
                  run(() => anything.projects.publish(projectId, slug.trim() ? { slug: slug.trim() } : undefined), "تم النشر")
                }
              >
                نشر
              </Button>
              <Button
                variant="outline"
                disabled={busy}
                onClick={() => run(() => anything.projects.unpublish(projectId), "تم إلغاء النشر")}
              >
                إلغاء النشر
              </Button>
              <Button
                variant="outline"
                disabled={busy}
                onClick={() => run(() => anything.projects.rollback(projectId), "تم الرجوع لنشرة سابقة")}
              >
                رجوع (rollback)
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-3 pt-4">
            <Button
              variant="outline"
              disabled={busy}
              onClick={() =>
                run(async () => {
                  const res = await anything.projects.messages(projectId, { limit: 30 });
                  setMessages(res?.messages ?? []);
                })
              }
            >
              تحميل الرسائل
            </Button>
            <ScrollArea className="h-72 rounded-md border p-3">
              {messages.map((m) => (
                <div key={m.id} className="mb-3">
                  <div className="text-xs text-muted-foreground">{m.role}</div>
                  <div className="whitespace-pre-wrap text-sm">{m.content}</div>
                  <Separator className="mt-2" />
                </div>
              ))}
              {messages.length === 0 ? <p className="text-sm text-muted-foreground">لا توجد رسائل محمّلة.</p> : null}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="deployments" className="space-y-3 pt-4">
            <Button
              variant="outline"
              disabled={busy}
              onClick={() =>
                run(async () => {
                  const res = await anything.projects.deployments(projectId);
                  setDeployments(res?.deployments ?? []);
                })
              }
            >
              تحميل النشرات
            </Button>
            <ul className="space-y-2">
              {deployments.map((d) => (
                <li key={d.id} className="rounded-md border p-3 text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate">{d.id}</span>
                    <Badge variant="outline">{d.status ?? "-"}</Badge>
                  </div>
                  {d.url ? (
                    <a className="text-xs underline" href={String(d.url)} target="_blank" rel="noreferrer">
                      {String(d.url)}
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="secrets" className="space-y-3 pt-4">
            <div className="flex flex-wrap gap-2">
              <Input
                className="max-w-[180px]"
                placeholder="اسم السر"
                value={secretName}
                onChange={(e) => setSecretName(e.target.value)}
              />
              <Input
                className="max-w-[220px]"
                type="password"
                placeholder="القيمة"
                value={secretValue}
                onChange={(e) => setSecretValue(e.target.value)}
              />
              <Button
                disabled={busy || !secretName.trim() || !secretValue}
                onClick={() =>
                  run(async () => {
                    await anything.projects.secrets.create(projectId, { name: secretName.trim(), value: secretValue });
                    setSecretName("");
                    setSecretValue("");
                    const res = await anything.projects.secrets.list(projectId);
                    setSecrets(res?.secrets ?? []);
                  }, "تم حفظ السر")
                }
              >
                إضافة
              </Button>
              <Button
                variant="outline"
                disabled={busy}
                onClick={() =>
                  run(async () => {
                    const res = await anything.projects.secrets.list(projectId);
                    setSecrets(res?.secrets ?? []);
                  })
                }
              >
                تحديث
              </Button>
            </div>
            <ul className="space-y-2">
              {secrets.map((s) => (
                <li key={s.id} className="flex items-center justify-between rounded-md border p-2 text-sm">
                  <span>{s.name}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={busy}
                    onClick={() =>
                      run(async () => {
                        await anything.projects.secrets.remove(projectId, s.id);
                        setSecrets((prev) => prev.filter((x) => x.id !== s.id));
                      }, "تم الحذف")
                    }
                  >
                    حذف
                  </Button>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="danger" className="space-y-3 pt-4">
            <Button
              variant="outline"
              disabled={busy}
              onClick={() => run(() => anything.projects.duplicate(projectId), "تم النسخ")}
            >
              نسخ المشروع
            </Button>
            <Button
              variant="destructive"
              disabled={busy}
              onClick={() =>
                run(async () => {
                  await anything.projects.remove(projectId);
                  onDeleted();
                }, "تم حذف المشروع")
              }
            >
              حذف المشروع
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export type { AnythingDomain, AnythingDatabase };
