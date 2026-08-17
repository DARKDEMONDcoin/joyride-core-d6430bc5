import { Route, Navigate } from "react-router-dom";
import { LegacyToolsRedirect, LegacyAiRedirect, ProtectedRoute, RootRoute } from "./routeHelpers";
import {
  LithosPage,
  AuthPage,
  OAuthCallbackPage,
  ChatPage,
  AgentPage,
  AgentDevToolsPage,
  AppsPage,
  AnythingPage,
  PublishedSitePage,
  ServiceLandingPage,
  PromoUnlockPage,
  PromoMasrPage,
  WelcomeShowcasePage,
  XPromoPage,
  PublicStatusPage,
  SeoLandingPage,
  SePage,
  EgEntryPage,
  PricingPage,
  AIChatLandingPage,
  ModelDetailPage,
  FeaturesGuidePage,
  SettingsPage,
  CustomizationPage,
  ProfileEditPage,
  SecuritySettingsPage,
  LanguagePage,
  BillingPage,
  NotificationsPage,
  BillingSuccessPage,
  ReferralsPage,
  ReferralsDashboardTab,
  ReferralsProgramTab,
  ReferralsTasksTab,
  ReferralsWithdrawalsTab,
  ReferralResourcesPage,
  IntegrationsPage,
  IntegrationDetailPage,
  IntegrationAppTest,
  McpSettingsPage,
  LibraryPage,
  LearnDashboardPage,
  NotFound,
  ChangeEmailPage,
  ChangePasswordPage,
  TwoFactorPage,
  MfaChallengePage,
  DeleteAccountPage,
  WithdrawPage,
  OAuthAuthorizePage,
  ResetPasswordPage,
  SharedChatPage,
  AcceptInvitePage,
  ContactPage,
  EgyptPage,
  CookiePolicyPage,
  TermsPage,
  PrivacyPage,
  RefundPage,
  ReferralRedirectPage,
  ReferralLandingPage,
  SeoHubPage,
  IndustryPage,
  ComparePage,
  TemplatesCategoryPage,
  ModelsHubPage,
  ModelPage,
  ModelForIndustryPage,
  ModelInCityPage,
  SolutionsHubPage,
  UseCasePage,
  SolutionForIndustryPage,
  CompareForIndustryPage,
  TemplateForIndustryPage,
  IndustryInCityPage,
  UseCaseInCityPage,
  AffiliateTermsPage,
  DMCAPage,
  AIDisclaimerPage,
  DPAPage,
  ModerationPage,
  SubprocessorsPage,
  AgePolicyPage,
  AccessibilityPage,
  CompliancePage,
  ContentPolicyPage,
  TrustCenterPage,
  SecurityPage,
  SupportPage,
  EnterprisePage,
  AboutPage,
  MegsyModelPage,
  MegayPage,
  BlogPage,
  BlogPostPage,
  ComparisonPage,
  DocsPage,
  MarketingDashboard,
  SlidesPreviewPage,
  SlidesFilePreviewPage,
  DocumentPreviewPage,
  AIPersonalizationPage,
  MemoryPage,
  ApiKeysPage,
  WeeklyRecapPage,
  CostDashboardPage,
  AgentTracesPage,
  ApprovalsPage,
  DiffPlaygroundPage,
  ScheduledTasksPage,
  MarketplacePage,
  SettingsSupportPage,
  SettingsHelpPage,
  SettingsContactPage,
  SettingsPrivacyPage,
  CapabilitiesPage,
  SystemStatusPage,
  SwitchAccountPage,
  ResearchPreviewPage,
  SkillsSettingsPage,
  SkillsNewPage,
  WorkspacesPage,
  WorkspaceCreatePage,
  WorkspaceDetailPage,
  WorkspaceProGate,
  WsOverviewTab,
  WsMembersTab,
  WsInvitesTab,
  WsBillingTab,
  WsUsageTab,
  WsBrandTab,
  WsActivityTab,
  WsNotificationsTab,
  WsSecurityTab,
  WsGeneralTab,
  WsDataTab,
  WsDangerTab,
  WorkspaceTasksPage,
  AcceptWorkspaceInvitePage,
} from "./lazyPages";

/** All application routes. Rendered inside <DeferredRoutes> in App.tsx. */
export const AppRoutes = ({ currentUserId }: { currentUserId: string | null }) => (
  <>

                          {/* Auth */}
                          <Route path="/auth" element={<AuthPage />} />
                          <Route path="/login" element={<AuthPage />} />
                          <Route path="/signin" element={<AuthPage />} />
                          <Route path="/sign-in" element={<AuthPage />} />
                          <Route path="/signup" element={<AuthPage />} />
                          <Route path="/sign-up" element={<AuthPage />} />
                          <Route path="/register" element={<AuthPage />} />
                          <Route path="/auth/callback/:provider" element={<OAuthCallbackPage />} />
                          <Route path="/oauth/authorize" element={<OAuthAuthorizePage />} />
                          <Route path="/reset-password" element={<ResetPasswordPage />} />
                          <Route path="/welcome" element={<WelcomeShowcasePage />} />

                          {/* Public / marketing */}
                          <Route path="/" element={<RootRoute authedElement={<ChatPage key={currentUserId} />} />} />
                          <Route path="/lithos" element={<LithosPage />} />
                          <Route path="/code" element={<Navigate to="/chat" replace />} />
                          <Route path="/build" element={<Navigate to="/chat" replace />} />
                          <Route path="/community" element={<Navigate to="/solutions" replace />} />
                          <Route path="/services" element={<Navigate to="/solutions" replace />} />
                          <Route path="/cinema" element={<Navigate to="/l/ai-video-generator" replace />} />
                          <Route path="/apps" element={<AppsPage />} />
                          <Route path="/anything" element={<ProtectedRoute><AnythingPage /></ProtectedRoute>} />
                          <Route path="/build/anything" element={<Navigate to="/anything" replace />} />
                          <Route path="/slides/preview/:id" element={<SlidesPreviewPage />} />
                          <Route path="/learn" element={<ProtectedRoute><LearnDashboardPage /></ProtectedRoute>} />

                          <Route path="/slides/file-preview/:id" element={<SlidesFilePreviewPage />} />
                          <Route path="/document/:artifactId" element={<DocumentPreviewPage />} />
                          <Route path="/s/:slug" element={<PublishedSitePage />} />



                          <Route path="/landing" element={<Navigate to="/chat" replace />} />
                          <Route path="/home" element={<Navigate to="/chat" replace />} />
                          <Route path="/showcase" element={<Navigate to="/chat" replace />} />
                          <Route path="/landing-gallery" element={<Navigate to="/solutions" replace />} />


                          <Route path="/comparison" element={<Navigate to="/pricing" replace />} />
                          {/* Egypt edition — Egyptian dialect + Kashier-only payments */}
                          <Route path="/eg" element={<EgEntryPage />} />
                          <Route path="/eg/*" element={<EgEntryPage />} />
                          <Route path="/se" element={<SePage />} />
                          <Route path="/l/*" element={<ServiceLandingPage />} />
                          <Route path="/ai/*" element={<LegacyAiRedirect />} />

                          {/* Locale-prefixed landing routes disabled — send every visitor to the app. */}
                          <Route path="/en" element={<Navigate to="/chat" replace />} />
                          <Route path="/ar" element={<Navigate to="/chat" replace />} />
                          <Route path="/ar-eg" element={<Navigate to="/chat" replace />} />
                          <Route path="/es" element={<Navigate to="/chat" replace />} />
                          <Route path="/fr" element={<Navigate to="/chat" replace />} />
                          <Route path="/de" element={<Navigate to="/chat" replace />} />
                          <Route path="/pt" element={<Navigate to="/chat" replace />} />
                          <Route path="/it" element={<Navigate to="/chat" replace />} />
                          <Route path="/tr" element={<Navigate to="/chat" replace />} />
                          <Route path="/ru" element={<Navigate to="/chat" replace />} />
                          <Route path="/zh" element={<Navigate to="/chat" replace />} />
                          <Route path="/ja" element={<Navigate to="/chat" replace />} />
                          <Route path="/ko" element={<Navigate to="/chat" replace />} />
                          <Route path="/hi" element={<Navigate to="/chat" replace />} />
                          <Route path="/id" element={<Navigate to="/chat" replace />} />
                          <Route path="/nl" element={<Navigate to="/chat" replace />} />
                          <Route path="/sv" element={<Navigate to="/chat" replace />} />
                          <Route path="/cs" element={<Navigate to="/chat" replace />} />
                          <Route path="/ro" element={<Navigate to="/chat" replace />} />
                          <Route path="/el" element={<Navigate to="/chat" replace />} />
                          <Route path="/uk" element={<Navigate to="/chat" replace />} />
                          <Route path="/he" element={<Navigate to="/chat" replace />} />
                          <Route path="/fa" element={<Navigate to="/chat" replace />} />
                          <Route path="/vi" element={<Navigate to="/chat" replace />} />
                          <Route path="/th" element={<Navigate to="/chat" replace />} />
                          <Route path="/pl" element={<Navigate to="/chat" replace />} />

                          {/* Locale-prefixed landing aliases (25 langs → ServiceLandingPage handles locale + slug) */}
                          <Route path="/ar/*" element={<ServiceLandingPage />} />
                          <Route path="/es/*" element={<ServiceLandingPage />} />
                          <Route path="/fr/*" element={<ServiceLandingPage />} />
                          <Route path="/de/*" element={<ServiceLandingPage />} />
                          <Route path="/pt/*" element={<ServiceLandingPage />} />
                          <Route path="/it/*" element={<ServiceLandingPage />} />
                          <Route path="/tr/*" element={<ServiceLandingPage />} />
                          <Route path="/ru/*" element={<ServiceLandingPage />} />
                          <Route path="/zh/*" element={<ServiceLandingPage />} />
                          <Route path="/ja/*" element={<ServiceLandingPage />} />
                          <Route path="/ko/*" element={<ServiceLandingPage />} />
                          <Route path="/hi/*" element={<ServiceLandingPage />} />
                          <Route path="/id/*" element={<ServiceLandingPage />} />
                          <Route path="/nl/*" element={<ServiceLandingPage />} />
                          <Route path="/sv/*" element={<ServiceLandingPage />} />
                          <Route path="/cs/*" element={<ServiceLandingPage />} />
                          <Route path="/ro/*" element={<ServiceLandingPage />} />
                          <Route path="/el/*" element={<ServiceLandingPage />} />
                          <Route path="/uk/*" element={<ServiceLandingPage />} />
                          <Route path="/he/*" element={<ServiceLandingPage />} />
                          <Route path="/fa/*" element={<ServiceLandingPage />} />
                          <Route path="/vi/*" element={<ServiceLandingPage />} />
                          <Route path="/th/*" element={<ServiceLandingPage />} />
                          <Route path="/pl/*" element={<ServiceLandingPage />} />
                          <Route path="/ref/:code" element={<ReferralRedirectPage />} />
                          <Route path="/r/:code" element={<ReferralLandingPage />} />

                         <Route path="/pricing" element={<PricingPage />} />
                          <Route path="/plans-models" element={<Navigate to="/pricing" replace />} />
                         <Route path="/promo/:code" element={<PromoUnlockPage />} />
                         {/* /eg is defined earlier as EgEntryPage — this second declaration was dead code and removed. */}
                         <Route path="/masr" element={<PromoMasrPage />} />
                         <Route path="/promo-masr" element={<PromoMasrPage />} />
                         <Route path="/x" element={<XPromoPage />} />
                          <Route path="/ai-chat" element={<AIChatLandingPage />} />
                          <Route path="/ai-chat/models/:slug" element={<ModelDetailPage />} />
                          <Route path="/megsy-model" element={<MegsyModelPage />} />
                          <Route path="/megsy" element={<Navigate to="/megsy-model" replace />} />
                          <Route path="/megay" element={<MegayPage />} />
                          <Route path="/megay-3.9" element={<Navigate to="/megay" replace />} />
                          <Route path="/models/megay" element={<Navigate to="/megay" replace />} />


                          <Route path="/features-guide" element={<FeaturesGuidePage />} />
                          
                          <Route path="/docs" element={<DocsPage />} />
                          <Route path="/docs/:groupId" element={<DocsPage />} />
                          <Route path="/docs/:groupId/:sectionId" element={<DocsPage />} />
                          {/* Localized Docs — auto-translated by i18n-translate (Qwen-Max) and
                          cached forever in public.i18n_translations. Each language gets its
                          own indexable URL + hreflang alternates for full multilingual SEO. */}
                          <Route path="/:lang/docs" element={<DocsPage />} />
                          <Route path="/:lang/docs/:groupId" element={<DocsPage />} />
                          <Route path="/:lang/docs/:groupId/:sectionId" element={<DocsPage />} />
                          <Route path="/contact" element={<ContactPage />} />
                          <Route path="/egypt" element={<EgyptPage />} />
                          <Route path="/cookies" element={<CookiePolicyPage />} />
                          <Route path="/terms" element={<TermsPage />} />
                          <Route path="/privacy" element={<PrivacyPage />} />
                          <Route path="/refund" element={<RefundPage />} />
                          <Route
                            path="/acceptable-use"
                            element={<Navigate to="/policies/content" replace />}
                          />
                          <Route path="/policies/content" element={<ContentPolicyPage />} />
                          <Route path="/trust" element={<TrustCenterPage />} />
                          <Route path="/legal/affiliate" element={<AffiliateTermsPage />} />
                          <Route path="/legal/dmca" element={<DMCAPage />} />
                          <Route path="/legal/ai-disclaimer" element={<AIDisclaimerPage />} />
                          <Route path="/legal/dpa" element={<DPAPage />} />
                          {/* Merged into /policies/content */}
                          <Route
                            path="/legal/moderation"
                            element={<Navigate to="/policies/content" replace />}
                          />
                          <Route
                            path="/legal/age"
                            element={<Navigate to="/policies/content" replace />}
                          />
                          {/* Merged into /trust */}
                          <Route
                            path="/legal/subprocessors"
                            element={<Navigate to="/trust" replace />}
                          />
                          <Route
                            path="/legal/accessibility"
                            element={<Navigate to="/trust" replace />}
                          />
                          <Route
                            path="/legal/compliance"
                            element={<Navigate to="/trust" replace />}
                          />
                          {/* Legacy standalone pages — kept reachable for deep links */}
                          <Route path="/legal/moderation-full" element={<ModerationPage />} />
                          <Route path="/legal/age-full" element={<AgePolicyPage />} />
                          <Route path="/legal/subprocessors-full" element={<SubprocessorsPage />} />
                          <Route path="/legal/accessibility-full" element={<AccessibilityPage />} />
                          <Route path="/legal/compliance-full" element={<CompliancePage />} />
                          <Route path="/support" element={<SupportPage />} />
                          <Route path="/security" element={<SecurityPage />} />
                          <Route path="/enterprise" element={<EnterprisePage />} />
                          <Route path="/about" element={<AboutPage />} />
                          <Route path="/blog" element={<BlogPage />} />
                          <Route path="/blog/:slug" element={<BlogPostPage />} />
                          {/* Multilingual blog routes — :lang is one of the 25 BCP-47 codes in src/data/blogLangs.ts.
                          A non-language path segment falls through to the catch-all NotFound below. */}
                          <Route path="/:lang/blog" element={<BlogPage />} />
                          <Route path="/:lang/blog/:slug" element={<BlogPostPage />} />
                          <Route path="/vs/:slug" element={<ComparisonPage />} />

                          {/* Sharing */}
                          <Route path="/share/:shareId" element={<SharedChatPage />} />
                          <Route path="/invite/:token" element={<AcceptInvitePage />} />

                          {/* Chat — public, anonymous can browse and send */}
                          <Route path="/chat" element={<ChatPage key={currentUserId} />} />
                          <Route path="/index" element={<ChatPage key={currentUserId} />} />
                          <Route path="/agent" element={<AgentPage />} />
                          <Route path="/agent/devtools" element={<AgentDevToolsPage />} />

                          {/* Admin panel — role-gated inside the page */}
                          {/* Code (AI app builder) — landing public, workspace/build actions require auth */}
                          {/* /build/* aliases — imported design pages internally link to /build/:projectId/* */}

                          {/* Media hub / gallery / studio — hidden: media generation now lives in chat. */}
                          <Route path="/media" element={<Navigate to="/solutions" replace />} />
                          <Route path="/gallery" element={<Navigate to="/solutions" replace />} />
                          <Route path="/preview/:type" element={<Navigate to="/solutions" replace />} />
                          <Route path="/template/:id" element={<Navigate to="/templates" replace />} />

                          {/* Images */}
                          <Route path="/images" element={<Navigate to="/l/ai-image-generator-unlimited" replace />} />
                          <Route path="/images/tools" element={<Navigate to="/solutions" replace />} />
                          <Route path="/images/studio" element={<Navigate to="/l/ai-image-editor" replace />} />
                          <Route path="/images/tools/avatar-generator" element={<Navigate to="/l/ai-avatar-generator" replace />} />
                          <Route path="/images/tools/bg-remover" element={<Navigate to="/solutions/ai-background-remover" replace />} />
                          <Route path="/images/tools/remover" element={<Navigate to="/l/ai-image-editor" replace />} />
                          <Route path="/images/tools/inpaint" element={<Navigate to="/l/ai-image-editor" replace />} />
                          <Route path="/images/tools/headshot" element={<Navigate to="/l/ai-headshot-generator" replace />} />
                          <Route path="/images/tools/portrait-studio" element={<Navigate to="/l/ai-headshot-generator" replace />} />
                          <Route path="/images/tools/retouching" element={<Navigate to="/l/ai-image-editor" replace />} />
                          <Route path="/images/tools/logo-generator" element={<Navigate to="/l/ai-logo-generator" replace />} />
                          <Route path="/images/tools/product-photo" element={<Navigate to="/l/ai-product-photo-generator" replace />} />
                          <Route path="/images/tools/thumbnail-generator" element={<Navigate to="/l/ai-thumbnail-generator" replace />} />
                          {/* Legacy redirects: /tools/* -> /images/tools/* */}
                          <Route path="/tools/*" element={<LegacyToolsRedirect />} />

                          {/* Programmatic SEO */}
                          <Route path="/for" element={<SeoHubPage />} />
                          <Route path="/for/:industry" element={<IndustryPage />} />
                          <Route path="/for/:industry/in/:city" element={<IndustryInCityPage />} />
                          <Route path="/compare" element={<SeoHubPage />} />
                          <Route path="/compare/megsy-vs-:competitor" element={<ComparePage />} />
                          <Route
                            path="/compare/megsy-vs-:competitor/for/:industry"
                            element={<CompareForIndustryPage />}
                          />
                          <Route path="/templates" element={<SeoHubPage />} />
                          <Route path="/templates/:category" element={<TemplatesCategoryPage />} />
                          <Route
                            path="/templates/:category/for/:industry"
                            element={<TemplateForIndustryPage />}
                          />
                          <Route path="/models" element={<ModelsHubPage />} />
                          <Route path="/models/:slug" element={<ModelPage />} />
                          <Route
                            path="/models/:slug/for/:industry"
                            element={<ModelForIndustryPage />}
                          />
                          <Route path="/models/:slug/in/:city" element={<ModelInCityPage />} />
                          <Route path="/solutions" element={<SolutionsHubPage />} />
                          <Route path="/solutions/:slug" element={<UseCasePage />} />
                          <Route
                            path="/solutions/:slug/for/:industry"
                            element={<SolutionForIndustryPage />}
                          />
                          <Route path="/solutions/:slug/in/:city" element={<UseCaseInCityPage />} />
                          {/* /tools is an alias for /solutions (use-cases) */}
                          <Route path="/tools" element={<SolutionsHubPage />} />
                          <Route path="/tools/:slug" element={<UseCasePage />} />
                          <Route
                            path="/tools/:slug/for/:industry"
                            element={<SolutionForIndustryPage />}
                          />
                          <Route path="/tools/:slug/in/:city" element={<UseCaseInCityPage />} />

                          {/* Videos / Cinema — hidden: now in chat */}
                          <Route path="/videos" element={<Navigate to="/l/ai-video-generator" replace />} />
                          <Route path="/videos/studio" element={<Navigate to="/l/ai-video-generator" replace />} />
                          <Route path="/videos/tools/thumbnail-generator" element={<Navigate to="/l/ai-thumbnail-generator" replace />} />
                          {/* /cinema is defined earlier — this duplicate route was dead code and removed. */}
                          <Route path="/cinema/studio" element={<Navigate to="/l/ai-video-generator" replace />} />
                          <Route
                            path="/cinema/start-end-frame"
                            element={<Navigate to="/l/ai-video-generator" replace />}
                          />

                          {/* Research */}
                          <Route
                            path="/research/preview/new"
                            element={
                              <ProtectedRoute>
                                <ResearchPreviewPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/research/preview/:id"
                            element={
                              <ProtectedRoute>
                                <ResearchPreviewPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route path="/research/share/:token" element={<ResearchPreviewPage />} />

                          {/* Settings */}
                          <Route
                            path="/settings"
                            element={
                              <ProtectedRoute>
                                <SettingsPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/library"
                            element={
                              <ProtectedRoute>
                                <LibraryPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/settings/customization"
                            element={
                              <ProtectedRoute>
                                <CustomizationPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/settings/ai-personalization"
                            element={
                              <ProtectedRoute>
                                <AIPersonalizationPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/settings/profile"
                            element={<Navigate to="/settings/profile/edit" replace />}
                          />
                          <Route
                            path="/settings/profile/edit"
                            element={
                              <ProtectedRoute>
                                <ProfileEditPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/settings/billing"
                            element={
                              <ProtectedRoute>
                                <BillingPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/settings/notifications"
                            element={
                              <ProtectedRoute>
                                <NotificationsPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route path="/billing/success" element={<BillingSuccessPage />} />
                          <Route path="/suc" element={<BillingSuccessPage />} />
                          <Route
                            path="/billing"
                            element={<Navigate to="/settings/billing" replace />}
                          />
                          <Route
                            path="/billing/referrals"
                            element={<Navigate to="/settings/referrals" replace />}
                          />
                          <Route
                            path="/referrals"
                            element={<Navigate to="/settings/referrals" replace />}
                          />
                          <Route path="/workspaces" element={<Navigate to="/settings" replace />} />
                          <Route path="/workspace" element={<Navigate to="/settings" replace />} />
                          <Route path="/integrations" element={<Navigate to="/settings/integrations" replace />} />
                          <Route path="/integration" element={<Navigate to="/settings/integrations" replace />} />
                          <Route
                            path="/settings/security"
                            element={
                              <ProtectedRoute>
                                <SecuritySettingsPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/settings/help"
                            element={<Navigate to="/settings/support/help" replace />}
                          />
                          <Route
                            path="/settings/contact"
                            element={<Navigate to="/settings/support/contact" replace />}
                          />
                          <Route
                            path="/settings/switch-account"
                            element={<Navigate to="/settings/switch" replace />}
                          />
                          <Route
                            path="/settings/referrals"
                            element={
                              <ProtectedRoute>
                                <ReferralsPage />
                              </ProtectedRoute>
                            }
                          >
                            <Route index element={<ReferralsDashboardTab />} />
                            <Route path="program" element={<ReferralsProgramTab />} />

                            <Route path="tasks" element={<ReferralsTasksTab />} />
                            <Route path="withdrawals" element={<ReferralsWithdrawalsTab />} />
                          </Route>
                          <Route
                            path="/settings/referrals/resources"
                            element={
                              <ProtectedRoute>
                                <ReferralResourcesPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/settings/language"
                            element={
                              <ProtectedRoute>
                                <LanguagePage />
                              </ProtectedRoute>
                            }
                          />

                          <Route
                            path="/settings/integrations"

                            element={
                              <ProtectedRoute>
                                <IntegrationsPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/settings/integrations/:id"
                            element={
                              <ProtectedRoute>
                                <IntegrationDetailPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/integration-app-test"
                            element={<IntegrationAppTest />}
                          />
                          <Route
                            path="/settings/mcp"
                            element={
                              <ProtectedRoute>
                                <McpSettingsPage />
                              </ProtectedRoute>
                            }
                          />

                          <Route
                            path="/settings/memory"
                            element={
                              <ProtectedRoute>
                                <MemoryPage />
                              </ProtectedRoute>
                            }
                          />

                          <Route
                            path="/settings/api-keys"
                            element={
                              <ProtectedRoute>
                                <ApiKeysPage />
                              </ProtectedRoute>
                            }
                          />

                          <Route
                            path="/recap"
                            element={
                              <ProtectedRoute>
                                <WeeklyRecapPage />
                              </ProtectedRoute>
                            }
                          />

                          <Route
                            path="/settings/costs"
                            element={
                              <ProtectedRoute>
                                <CostDashboardPage />
                              </ProtectedRoute>
                            }
                          />

                          <Route
                            path="/settings/traces"
                            element={
                              <ProtectedRoute>
                                <AgentTracesPage />
                              </ProtectedRoute>
                            }
                          />

                          <Route
                            path="/settings/approvals"
                            element={
                              <ProtectedRoute>
                                <ApprovalsPage />
                              </ProtectedRoute>
                            }
                          />

                          <Route
                            path="/settings/diff"
                            element={
                              <ProtectedRoute>
                                <DiffPlaygroundPage />
                              </ProtectedRoute>
                            }
                          />

                          <Route
                            path="/settings/tasks"
                            element={
                              <ProtectedRoute>
                                <ScheduledTasksPage />
                              </ProtectedRoute>
                            }
                          />

                          <Route
                            path="/settings/marketplace"
                            element={
                              <ProtectedRoute>
                                <MarketplacePage />
                              </ProtectedRoute>
                            }
                          />







                          <Route
                            path="/settings/skills"
                            element={
                              <ProtectedRoute>
                                <SkillsSettingsPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/agents/skills"
                            element={
                              <ProtectedRoute>
                                <SkillsSettingsPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/agents/skills/new"
                            element={
                              <ProtectedRoute>
                                <SkillsNewPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/skills"
                            element={
                              <ProtectedRoute>
                                <SkillsSettingsPage />
                              </ProtectedRoute>
                            }
                          />


                          <Route
                            path="/settings/change-email"
                            element={
                              <ProtectedRoute>
                                <ChangeEmailPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/settings/change-password"
                            element={
                              <ProtectedRoute>
                                <ChangePasswordPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/settings/two-factor"
                            element={
                              <ProtectedRoute>
                                <TwoFactorPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route path="/auth/mfa" element={<MfaChallengePage />} />
                          <Route
                            path="/settings/delete-account"
                            element={
                              <ProtectedRoute>
                                <DeleteAccountPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/settings/withdraw"
                            element={
                              <ProtectedRoute>
                                <WithdrawPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/settings/support"
                            element={
                              <ProtectedRoute>
                                <SettingsSupportPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/settings/support/help"
                            element={
                              <ProtectedRoute>
                                <SettingsHelpPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/settings/support/contact"
                            element={
                              <ProtectedRoute>
                                <SettingsContactPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/settings/privacy"
                            element={
                              <ProtectedRoute>
                                <SettingsPrivacyPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/settings/capabilities"
                            element={
                              <ProtectedRoute>
                                <CapabilitiesPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/settings/system-status"
                            element={
                              <ProtectedRoute>
                                <SystemStatusPage />
                              </ProtectedRoute>
                            }
                          />

                          <Route
                            path="/settings/switch"
                            element={
                              <ProtectedRoute>
                                <SwitchAccountPage />
                              </ProtectedRoute>
                            }
                          />

                          <Route
                            path="/settings/workspaces"
                            element={
                              <ProtectedRoute>
                                <WorkspacesPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/settings/workspaces/new"
                            element={
                              <ProtectedRoute>
                                <WorkspaceProGate>
                                  <WorkspaceCreatePage />
                                </WorkspaceProGate>
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/settings/workspaces/:id"
                            element={
                              <ProtectedRoute>
                                <WorkspaceDetailPage />
                              </ProtectedRoute>
                            }
                          >
                            <Route index element={<WsOverviewTab />} />
                            <Route path="members" element={<WsMembersTab />} />
                            <Route path="invites" element={<WsInvitesTab />} />
                            <Route path="billing" element={<WsBillingTab />} />
                            <Route path="usage" element={<WsUsageTab />} />

                            <Route path="brand" element={<WsBrandTab />} />
                            <Route path="activity" element={<WsActivityTab />} />
                            <Route path="notifications" element={<WsNotificationsTab />} />
                            <Route path="security" element={<WsSecurityTab />} />

                            <Route path="general" element={<WsGeneralTab />} />
                            <Route path="data" element={<WsDataTab />} />
                            <Route path="danger" element={<WsDangerTab />} />
                          </Route>
                          <Route
                            path="/workspaces/:id/tasks"
                            element={
                              <ProtectedRoute>
                                <WorkspaceTasksPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/invite/workspace/:token"
                            element={<AcceptWorkspaceInvitePage />}
                          />

                          <Route path="/marketing-automation" element={<MarketingDashboard />} />
                          <Route path="/status" element={<PublicStatusPage />} />

                          {/* Alias redirects for commonly-mistyped URLs */}
                          <Route path="/settings/skills/new" element={<Navigate to="/agents/skills/new" replace />} />
                          <Route path="/settings/status" element={<Navigate to="/settings/system-status" replace />} />
                          <Route path="/workspaces/create" element={<Navigate to="/settings/workspaces/new" replace />} />
                          <Route path="/features" element={<Navigate to="/features-guide" replace />} />
                          <Route path="/compliance" element={<Navigate to="/legal/compliance" replace />} />
                          <Route path="/hub" element={<Navigate to="/seo-hub" replace />} />
                          <Route path="/models/megsy" element={<Navigate to="/megsy-model" replace />} />

                          {/* SEO landings — 100 SynapseX-styled pages, catalog in src/data/seoPages.ts */}
                          <Route path="/:seoSlug" element={<SeoLandingPage />} />

                          <Route path="*" element={<NotFound />} />

                        
  </>
);
