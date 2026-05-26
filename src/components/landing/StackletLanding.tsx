import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  ChevronDown,
  Database,
  GitBranch,
  LayoutGrid,
  LineChart,
  Lock,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

const ROLES = [
  "Operations Lead",
  "RevOps",
  "Customer Support Ops",
  "Finance Ops",
  "Engineering",
  "Other",
];

function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`flex items-center gap-2 ${className}`}>
      <span className="relative grid h-7 w-7 place-items-center rounded-md bg-slate-900 text-white">
        <Boxes className="h-4 w-4" />
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-slate-900">Stacklet</span>
    </a>
  );
}

function Nav({ onJoin }: { onJoin: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-slate-600 transition-colors hover:text-slate-900"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <button
          onClick={onJoin}
          className="inline-flex h-9 items-center gap-1.5 rounded-md bg-slate-900 px-3.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
        >
          Join waitlist
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </header>
  );
}

function ProductPreview() {
  return (
    <div className="relative">
      <div className="absolute -inset-x-8 -top-8 -bottom-8 -z-10 rounded-3xl bg-gradient-to-br from-sky-100/60 via-white to-indigo-100/40 blur-2xl" />
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25)]">
        {/* window chrome */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-3 py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
          </div>
          <div className="rounded-md border border-slate-200 bg-white px-2 py-0.5 font-mono text-[11px] text-slate-500">
            stacklet.app / refund-approvals
          </div>
          <div className="w-12" />
        </div>
        <div className="grid grid-cols-12 text-[13px]">
          {/* sidebar */}
          <aside className="col-span-3 hidden border-r border-slate-200 bg-slate-50/50 p-3 sm:block">
            <div className="mb-3 px-2 text-[11px] font-medium uppercase tracking-wider text-slate-400">
              Workflows
            </div>
            <ul className="space-y-0.5">
              {[
                { icon: Workflow, name: "Refund approvals", active: true, count: 12 },
                { icon: LayoutGrid, name: "Account admin", count: 3 },
                { icon: GitBranch, name: "Plan changes", count: 5 },
                { icon: Database, name: "Data exports", count: 0 },
                { icon: ShieldCheck, name: "Access reviews", count: 2 },
              ].map((item) => (
                <li
                  key={item.name}
                  className={`flex items-center justify-between rounded-md px-2 py-1.5 ${
                    item.active ? "bg-white shadow-sm ring-1 ring-slate-200" : "text-slate-600"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <item.icon className="h-3.5 w-3.5 text-slate-500" />
                    {item.name}
                  </span>
                  {item.count > 0 && (
                    <span className="rounded bg-slate-100 px-1.5 text-[10px] font-medium text-slate-600">
                      {item.count}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </aside>
          {/* main */}
          <div className="col-span-12 p-4 sm:col-span-9 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                  Approval queue
                </div>
                <h3 className="text-sm font-semibold text-slate-900">Refund approvals · 12 open</h3>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[11px] font-medium text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live
                </span>
                <span className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[11px] text-slate-500">
                  v14
                </span>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="w-full">
                <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium">Customer</th>
                    <th className="px-3 py-2 text-left font-medium">Amount</th>
                    <th className="hidden px-3 py-2 text-left font-medium md:table-cell">Reason</th>
                    <th className="px-3 py-2 text-left font-medium">Stage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {[
                    ["Northwind Co.", "$1,240", "Duplicate charge", "Manager", "amber"],
                    ["Acme Robotics", "$320", "Cancelled trial", "Auto-approved", "emerald"],
                    ["Helix Labs", "$4,800", "Contract dispute", "Finance", "sky"],
                    ["Quayside Foods", "$95", "Shipping delay", "Manager", "amber"],
                  ].map(([name, amt, reason, stage, color]) => (
                    <tr key={name} className="text-slate-700">
                      <td className="px-3 py-2 font-medium text-slate-900">{name}</td>
                      <td className="px-3 py-2 font-mono text-[12px]">{amt}</td>
                      <td className="hidden px-3 py-2 text-slate-500 md:table-cell">{reason}</td>
                      <td className="px-3 py-2">
                        <span
                          className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-medium ${
                            color === "emerald"
                              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                              : color === "sky"
                                ? "border-sky-200 bg-sky-50 text-sky-700"
                                : "border-amber-200 bg-amber-50 text-amber-700"
                          }`}
                        >
                          {stage}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-1">
                <Lock className="h-3 w-3" /> Role: Support Manager · read + approve
              </span>
              <span>Synced 2s ago · postgres://prod</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  {
    icon: Workflow,
    title: "Workflow-first builder",
    body: "Start from the steps your team actually runs — request, review, approve, notify — instead of dragging tables onto a blank canvas.",
  },
  {
    icon: Database,
    title: "Postgres-ready data",
    body: "Reads and writes go straight to your Supabase or Postgres. No CSV exports, no Airtable sync, no second source of truth to reconcile.",
  },
  {
    icon: ShieldCheck,
    title: "Guarded permissions",
    body: "Admins pick which tables and actions an ops builder can touch. Operators ship tools; they can't drop a production table by accident.",
  },
  {
    icon: GitBranch,
    title: "Approval lanes",
    body: "Route refunds over $1k to finance, plan downgrades to a CSM, access requests to a manager — without rebuilding the tool each time.",
  },
  {
    icon: LayoutGrid,
    title: "Ops-first templates",
    body: "Refunds, account admin, plan changes, access reviews, churn saves — start from a workflow your peers already ship, not a blank page.",
  },
  {
    icon: LineChart,
    title: "Predictable rollout",
    body: "Test changes in a staging workspace, version every workflow, roll back in one click. Ops changes stop being a Friday-afternoon risk.",
  },
];

function Features() {
  return (
    <section id="features" className="border-t border-slate-200 bg-slate-50/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-widest text-sky-700">
            Built for ops
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Built for the workflow, not the database table.
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Stacklet replaces the spreadsheet-plus-Slack-plus-Airtable stack ops teams glue together
            while waiting on engineering. Same data, same approvers — just an actual tool around it.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-white p-6">
              <div className="grid h-9 w-9 place-items-center rounded-md bg-slate-900 text-white">
                <f.icon className="h-4 w-4" />
              </div>
              <h3 className="mt-4 text-[15px] font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PRICING = [
  {
    name: "Starter",
    price: 39,
    tagline: "For a single ops team running its first internal tool.",
    features: [
      "1 workspace, unlimited builders",
      "3 connected Postgres schemas",
      "Up to 5 active workflows",
      "Email support",
    ],
  },
  {
    name: "Team",
    price: 129,
    tagline: "For ops, support, and finance running side-by-side.",
    features: [
      "3 workspaces, unlimited builders",
      "Unlimited connected schemas",
      "Unlimited workflows + approval lanes",
      "SSO, audit log, role-based access",
      "Shared template library",
    ],
    highlighted: true,
  },
  {
    name: "Scale",
    price: 399,
    tagline: "For multi-region ops with strict change-control.",
    features: [
      "Unlimited workspaces",
      "Staging + production environments",
      "Versioned workflows with rollback",
      "SAML SSO, SCIM, granular RBAC",
      "Priority support + onboarding",
    ],
  },
];

function Pricing({ onJoin }: { onJoin: () => void }) {
  return (
    <section id="pricing" className="border-t border-slate-200 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-sky-700">
            Pricing
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Priced per workspace, not per seat.
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Retool and Airtable Interfaces bill per editor and per viewer, so the cost grows every
            time an internal tool actually gets used. Stacklet charges one flat price per workspace,
            with unlimited builders and reviewers inside it.
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PRICING.map((p) => {
            const highlighted = p.highlighted;
            return (
              <div
                key={p.name}
                className={`relative flex flex-col rounded-2xl border p-6 ${
                  highlighted
                    ? "border-slate-900 bg-slate-900 text-white shadow-xl"
                    : "border-slate-200 bg-white"
                }`}
              >
                {highlighted && (
                  <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-sky-400 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-slate-900">
                    <Sparkles className="h-3 w-3" /> Best fit for most ops teams
                  </span>
                )}
                <div className="flex items-baseline justify-between">
                  <h3
                    className={`text-lg font-semibold ${
                      highlighted ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {p.name}
                  </h3>
                </div>
                <p className={`mt-1 text-sm ${highlighted ? "text-slate-300" : "text-slate-600"}`}>
                  {p.tagline}
                </p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tracking-tight">${p.price}</span>
                  <span className={`text-sm ${highlighted ? "text-slate-400" : "text-slate-500"}`}>
                    /mo per workspace
                  </span>
                </div>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {p.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <CheckCircle2
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          highlighted ? "text-sky-300" : "text-emerald-600"
                        }`}
                      />
                      <span className={highlighted ? "text-slate-200" : "text-slate-700"}>
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={onJoin}
                  className={`mt-8 inline-flex h-10 items-center justify-center rounded-md text-sm font-medium transition ${
                    highlighted
                      ? "bg-white text-slate-900 hover:bg-slate-100"
                      : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  Join waitlist
                </button>
              </div>
            );
          })}
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">
          A workspace is one connected database plus its workflows — usually one team. Add an
          accountant or a new support hire at no extra cost.
        </p>
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "We already evaluated Retool. Why pick Stacklet instead?",
    a: "Retool wins when an engineer owns the tool and is comfortable writing query JavaScript and custom components. Stacklet is built for the ops lead who owns the workflow and wants to ship it the same afternoon. You get approval lanes, role guardrails, and ops templates out of the box, at roughly a third of Retool's per-developer cost. If your tool needs a custom React component or a complex transformer pipeline, Retool is still the better choice — we're upfront about that.",
  },
  {
    q: "Our ops team isn't technical. Can they actually build something safely?",
    a: "Yes, and that's the whole point. An admin (usually an engineer or RevOps lead) connects the database once and picks which tables and write actions are in scope. From there, a support or finance lead composes workflows from approved building blocks. They can ship a refund queue or an access-review tool; they cannot run a raw UPDATE against production. Every action is logged with who, what, and when.",
  },
  {
    q: "Is this a new database we have to migrate to? What happens to our Supabase / Postgres?",
    a: "Stacklet sits on top of your existing Postgres or Supabase — no migration, no ETL, no shadow copy. Workflows read and write directly against your schema with the permissions you grant. If you turn Stacklet off tomorrow, your data is exactly where it was, and the tools you replaced (spreadsheets, Airtable, Zapier handoffs) are the only thing that's gone.",
  },
  {
    q: "Per-seat tools get expensive fast. How is workspace pricing actually different?",
    a: "Most internal tools charge $10–50 per editor and viewer, which means the moment a CSM, accountant, or support manager logs in, your bill goes up. Stacklet charges per workspace — typically one per team — with unlimited builders and reviewers inside it. A 12-person support org on Team pays $129/mo flat, not $129 times twelve. That's the wedge.",
  },
  {
    q: "You're early. What's honestly not in v1 yet?",
    a: "No mobile builder (tools render fine on mobile, but you build on desktop). Charting is intentionally light — we expect you to keep Metabase or Looker for dashboards. No marketplace of third-party blocks yet, and no on-prem or VPC deployment. Postgres and Supabase are supported today; MySQL and Snowflake are on the roadmap, not shipped. If any of these are a hard requirement, we'd rather tell you now than after you've ported a workflow.",
  },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-t border-slate-200 bg-slate-50/40 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-sky-700">FAQ</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            What ops leads usually ask first.
          </h2>
        </div>
        <div className="mt-10 divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] font-medium text-slate-900">{item.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-500 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm leading-relaxed text-slate-600">{item.a}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Waitlist({ formRef }: { formRef: React.RefObject<HTMLDivElement | null> }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [cooldown, setCooldown] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmedEmail = email.trim().toLowerCase();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
    if (!valid) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!role) {
      setError("Please pick the role that fits best.");
      return;
    }

    setStatus("submitting");
    const trimmedCompany = company.trim();
    let insertError: { code?: string; message?: string } | null = null;

    try {
      const result = await supabase.from("waitlist").insert({
        email: trimmedEmail,
        role,
        company: trimmedCompany.length > 0 ? trimmedCompany : null,
      });
      insertError = result.error;
    } catch (err) {
      insertError =
        err instanceof Error ? { message: err.message } : { message: "Unknown Supabase error" };
    }

    if (insertError) {
      setStatus("idle");
      if (insertError.code === "23505") {
        setError("You're already on the list.");
      } else if (insertError.message?.includes("Missing Supabase environment")) {
        setError(
          "Supabase is not connected yet. Add the project URL and anon key, then try again.",
        );
      } else {
        console.error("Waitlist insert failed:", insertError);
        setError("Something went wrong on our side. Please try again in a moment.");
      }
      return;
    }

    setStatus("success");
    setEmail("");
    setRole("");
    setCompany("");
    setCooldown(true);
    setTimeout(() => setCooldown(false), 3000);
  };

  return (
    <section
      id="waitlist"
      ref={formRef as unknown as React.RefObject<HTMLElement>}
      className="border-t border-slate-200 bg-white py-20 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-sky-700">
            Early access
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Ship your next internal tool this week, not next quarter.
          </h2>
          <p className="mt-3 text-base text-slate-600">
            We're onboarding ops teams at 50–500 person B2B SaaS companies in weekly waves. Tell us
            which workflow is currently stuck in a spreadsheet and we'll prioritize your invite.
          </p>
          <ul className="mt-6 space-y-2.5 text-sm text-slate-700">
            {[
              "First workspace free during the beta",
              "Hands-on help porting one workflow off spreadsheets",
              "Direct line to the team building Stacklet",
            ].map((b) => (
              <li key={b} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm sm:p-8"
          noValidate
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="wl-email" className="block text-sm font-medium text-slate-800">
                Work email <span className="text-rose-500">*</span>
              </label>
              <input
                id="wl-email"
                type="email"
                required
                value={email}
                maxLength={255}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="mt-1.5 h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              />
            </div>
            <div>
              <label htmlFor="wl-role" className="block text-sm font-medium text-slate-800">
                Your role <span className="text-rose-500">*</span>
              </label>
              <div className="relative mt-1.5">
                <select
                  id="wl-role"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="h-10 w-full appearance-none rounded-md border border-slate-300 bg-white px-3 pr-9 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                >
                  <option value="" disabled>
                    Select a role…
                  </option>
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </div>
            <div>
              <label htmlFor="wl-company" className="block text-sm font-medium text-slate-800">
                Company <span className="text-slate-400">(optional)</span>
              </label>
              <input
                id="wl-company"
                type="text"
                value={company}
                maxLength={120}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Acme Robotics"
                className="mt-1.5 h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-rose-600">
                {error}
              </p>
            )}
            {status === "success" && (
              <div
                role="status"
                className="flex items-start gap-2 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <p className="font-medium">You're on the list.</p>
                  <p className="text-emerald-700/80">
                    We'll email you when your wave opens up — usually within two weeks.
                  </p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "submitting" || cooldown}
              className="inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-md bg-slate-900 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "Adding you…" : cooldown ? "Added" : "Join the waitlist"}
              {status !== "submitting" && !cooldown && <ArrowRight className="h-3.5 w-3.5" />}
            </button>
            <p className="text-xs text-slate-500">
              We'll only email you about Stacklet. No newsletter, no sharing.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-10 sm:flex-row sm:items-center sm:px-6">
        <div>
          <Logo />
          <p className="mt-2 max-w-sm text-sm text-slate-500">
            Workflow-first internal tools for ops teams on Postgres and Supabase.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
          <a href="#features" className="hover:text-slate-900">
            Features
          </a>
          <a href="#pricing" className="hover:text-slate-900">
            Pricing
          </a>
          <a href="#faq" className="hover:text-slate-900">
            FAQ
          </a>
          <a href="#waitlist" className="hover:text-slate-900">
            Waitlist
          </a>
        </div>
        <div className="text-xs text-slate-400">
          © {new Date().getFullYear()} Stacklet Labs, Inc.
        </div>
      </div>
    </footer>
  );
}

export default function StackletLanding() {
  const formRef = useRef<HTMLDivElement | null>(null);
  const scrollToWaitlist = () => {
    const el = document.getElementById("waitlist");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const scrollToPricing = () => {
    const el = document.getElementById("pricing");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    // smooth scroll for in-page anchor links in the nav
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute("href")?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div id="top" className="min-h-screen bg-white text-slate-900 antialiased">
      <Nav onJoin={scrollToWaitlist} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(186,230,253,0.35),transparent_60%)]" />
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 sm:pb-24 sm:pt-20 lg:grid lg:grid-cols-12 lg:gap-10 lg:pb-28">
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              In private beta with 30+ B2B SaaS ops teams
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[56px] lg:leading-[1.05]">
              Internal tools without the engineering queue.
            </h1>
            <p className="mt-5 max-w-xl text-base text-slate-600 sm:text-lg">
              Stacklet lets your ops team ship a secure approval flow, admin panel, or workflow
              tracker on top of Supabase or Postgres in an afternoon — instead of running it in a
              spreadsheet while engineering's queue clears.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                onClick={scrollToWaitlist}
                className="inline-flex h-11 items-center gap-1.5 rounded-md bg-slate-900 px-5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
              >
                Join waitlist
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={scrollToPricing}
                className="inline-flex h-11 items-center rounded-md border border-slate-300 bg-white px-5 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
              >
                See pricing
              </button>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <Database className="h-3.5 w-3.5" /> Postgres & Supabase native
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" /> SSO + audit log
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5" /> Per-workspace pricing
              </span>
            </div>
          </div>
          <div className="mt-12 lg:col-span-6 lg:mt-0">
            <ProductPreview />
          </div>
        </div>
      </section>

      <Features />
      <Pricing onJoin={scrollToWaitlist} />
      <Faq />
      <Waitlist formRef={formRef} />
      <Footer />
    </div>
  );
}
