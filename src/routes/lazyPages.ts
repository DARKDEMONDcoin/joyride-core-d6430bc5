import { lazyWithRetry as lazy } from "@/lib/lazyWithRetry";

/* ── Shell / chrome ───────────────────────────────────────────── */
export const MobileSettingsTheme = lazy(() => import("@/components/settings/MobileSettingsTheme"));
export const CommandPalette = lazy(() => import("@/components/CommandPalette"));
export const ShortcutsHelp = lazy(() => import("@/components/ShortcutsHelp"));
export const SettingsShell = lazy(() =>
  import("@/components/settings/SettingsShell").then((m) => ({ default: m.SettingsShell })),
);
export const OfflineBanner = lazy(() => import("@/components/common/OfflineBanner"));
export const CookieConsent = lazy(() => import("@/components/common/CookieConsent"));
export const UnlimitedPromoBanner = lazy(() => import("@/components/promo/UnlimitedPromoBanner"));
export const Analytics = lazy(() => import("@vercel/analytics/react").then((m) => ({ default: m.Analytics })));
export const SpeedInsights = lazy(() => import("@vercel/speed-insights/react").then((m) => ({ default: m.SpeedInsights })));

/* ── Chat ─────────────────────────────────────────────────────── */
export const ChatPage = lazy(() => import("@/pages/chat/ChatPage"));
export const SharedChatPage = lazy(() => import("@/pages/chat/SharedChatPage"));
export const ResearchPreviewPage = lazy(() => import("@/pages/chat/ResearchPreviewPage"));

/* ── Auth (single animated hub) ───────────────────────────────── */
export const AuthPage = lazy(() => import("@/pages/auth/AuthPage"));
export const OAuthCallbackPage = lazy(() => import("@/pages/auth/OAuthCallbackPage"));
export const OAuthAuthorizePage = lazy(() => import("@/pages/auth/OAuthAuthorizePage"));
export const ResetPasswordPage = lazy(() => import("@/pages/auth/ResetPasswordPage"));
export const ChangeEmailPage = lazy(() => import("@/pages/auth/ChangeEmailPage"));
export const ChangePasswordPage = lazy(() => import("@/pages/auth/ChangePasswordPage"));
export const TwoFactorPage = lazy(() => import("@/pages/auth/TwoFactorPage"));
export const MfaChallengePage = lazy(() => import("@/pages/auth/MfaChallengePage"));
export const DeleteAccountPage = lazy(() => import("@/pages/auth/DeleteAccountPage"));
export const AcceptInvitePage = lazy(() => import("@/pages/auth/AcceptInvitePage"));
export const ReferralRedirectPage = lazy(() => import("@/pages/auth/ReferralRedirectPage"));

/* ── Billing (single animated hub) ────────────────────────────── */
export const BillingPage = lazy(() => import("@/pages/billing/BillingPage"));
export const BillingSuccessPage = lazy(() => import("@/pages/billing/BillingSuccessPage"));
export const ReferralsPage = lazy(() => import("@/pages/billing/ReferralsPage"));
export const ReferralsDashboardTab = lazy(() => import("@/pages/billing/referrals/DashboardTab"));
export const ReferralsProgramTab = lazy(() => import("@/pages/billing/referrals/ProgramTab"));
export const ReferralsTasksTab = lazy(() => import("@/pages/billing/referrals/TasksTab"));
export const ReferralsWithdrawalsTab = lazy(() => import("@/pages/billing/referrals/WithdrawalsTab"));
export const ReferralResourcesPage = lazy(() => import("@/pages/billing/ReferralResourcesPage"));
export const WithdrawPage = lazy(() => import("@/pages/billing/WithdrawPage"));

/* ── Integrations (single animated hub) ───────────────────────── */
export const IntegrationsPage = lazy(() => import("@/pages/integrations/IntegrationsPage"));
export const IntegrationDetailPage = lazy(() => import("@/pages/integrations/IntegrationDetailPage"));
export const IntegrationAppTest = lazy(() => import("@/pages/integrations/IntegrationAppTest"));

/* ── Settings ─────────────────────────────────────────────────── */
export const SettingsPage = lazy(() => import("@/pages/settings/SettingsPage"));
export const CustomizationPage = lazy(() => import("@/pages/settings/CustomizationPage"));
export const ProfileEditPage = lazy(() => import("@/pages/settings/ProfileEditPage"));
export const SecuritySettingsPage = lazy(() => import("@/pages/settings/SecuritySettingsPage"));
export const SecurityPage = lazy(() => import("@/pages/settings/SecurityPage"));
export const LanguagePage = lazy(() => import("@/pages/settings/LanguagePage"));
export const NotificationsPage = lazy(() => import("@/pages/settings/NotificationsPage"));
export const McpSettingsPage = lazy(() => import("@/pages/settings/McpSettingsPage"));
export const AIPersonalizationPage = lazy(() => import("@/pages/settings/AIPersonalizationPage"));
export const MemoryPage = lazy(() => import("@/pages/settings/MemoryPage"));
export const ApiKeysPage = lazy(() => import("@/pages/settings/ApiKeysPage"));
export const CostDashboardPage = lazy(() => import("@/pages/settings/CostDashboardPage"));
export const ApprovalsPage = lazy(() => import("@/pages/settings/ApprovalsPage"));
export const DiffPlaygroundPage = lazy(() => import("@/pages/settings/DiffPlaygroundPage"));
export const ScheduledTasksPage = lazy(() => import("@/pages/settings/ScheduledTasksPage"));
export const MarketplacePage = lazy(() => import("@/pages/settings/MarketplacePage"));
export const SettingsSupportPage = lazy(() => import("@/pages/settings/SettingsSupportPage"));
export const SettingsHelpPage = lazy(() => import("@/pages/settings/SettingsHelpPage"));
export const SettingsContactPage = lazy(() => import("@/pages/settings/SettingsContactPage"));
export const SettingsPrivacyPage = lazy(() => import("@/pages/settings/SettingsPrivacyPage"));
export const CapabilitiesPage = lazy(() => import("@/pages/settings/CapabilitiesPage"));
export const SystemStatusPage = lazy(() => import("@/pages/settings/SystemStatusPage"));
export const SwitchAccountPage = lazy(() => import("@/pages/settings/SwitchAccountPage"));
export const SkillsSettingsPage = lazy(() => import("@/pages/settings/SkillsSettingsPage"));
export const SkillsNewPage = lazy(() => import("@/pages/settings/SkillsNewPage"));

/* ── Marketing / legal ────────────────────────────────────────── */
export const LandingPage = lazy(() => import("@/pages/marketing/LandingPage"));
export const PricingPage = lazy(() => import("@/pages/marketing/PricingPage"));
export const AIChatLandingPage = lazy(() => import("@/pages/marketing/AIChatLandingPage"));
export const ModelDetailPage = lazy(() => import("@/pages/marketing/ModelDetailPage"));
export const FeaturesGuidePage = lazy(() => import("@/pages/marketing/FeaturesGuidePage"));
export const MegsyModelPage = lazy(() => import("@/pages/marketing/MegsyModelPage"));
export const MegayPage = lazy(() => import("@/pages/marketing/MegayPage"));
export const DocsPage = lazy(() => import("@/pages/marketing/DocsPage"));
export const BlogPage = lazy(() => import("@/pages/marketing/BlogPage"));
export const BlogPostPage = lazy(() => import("@/pages/marketing/BlogPostPage"));
export const ComparisonPage = lazy(() => import("@/pages/marketing/ComparisonPage"));
export const AboutPage = lazy(() => import("@/pages/marketing/AboutPage"));
export const ContactPage = lazy(() => import("@/pages/marketing/ContactPage"));
export const SupportPage = lazy(() => import("@/pages/marketing/SupportPage"));
export const EnterprisePage = lazy(() => import("@/pages/marketing/EnterprisePage"));
export const EgyptPage = lazy(() => import("@/pages/marketing/EgyptPage"));
export const TrustCenterPage = lazy(() => import("@/pages/marketing/TrustCenterPage"));
export const CompliancePage = lazy(() => import("@/pages/marketing/CompliancePage"));
export const ModerationPage = lazy(() => import("@/pages/marketing/ModerationPage"));
export const AccessibilityPage = lazy(() => import("@/pages/marketing/AccessibilityPage"));
export const AgePolicyPage = lazy(() => import("@/pages/marketing/AgePolicyPage"));
export const AIDisclaimerPage = lazy(() => import("@/pages/marketing/AIDisclaimerPage"));
export const AffiliateTermsPage = lazy(() => import("@/pages/marketing/AffiliateTermsPage"));
export const ContentPolicyPage = lazy(() => import("@/pages/marketing/ContentPolicyPage"));
export const CookiePolicyPage = lazy(() => import("@/pages/marketing/CookiePolicyPage"));
export const PrivacyPage = lazy(() => import("@/pages/marketing/PrivacyPage"));
export const TermsPage = lazy(() => import("@/pages/marketing/TermsPage"));
export const RefundPage = lazy(() => import("@/pages/marketing/RefundPage"));
export const DMCAPage = lazy(() => import("@/pages/marketing/DMCAPage"));
export const DPAPage = lazy(() => import("@/pages/marketing/DPAPage"));
export const SubprocessorsPage = lazy(() => import("@/pages/marketing/SubprocessorsPage"));

/* ── Standalone utilities ─────────────────────────────────────── */
export const SlidesPreviewPage = lazy(() => import("@/pages/SlidesPreviewPage"));
export const SlidesFilePreviewPage = lazy(() => import("@/pages/SlidesFilePreviewPage"));
export const DocumentPreviewPage = lazy(() => import("@/pages/DocumentPreviewPage"));
export const WeeklyRecapPage = lazy(() => import("@/pages/WeeklyRecapPage"));
export const PublicStatusPage = lazy(() => import("@/pages/PublicStatusPage"));
export const SePage = lazy(() => import("@/pages/SePage"));
