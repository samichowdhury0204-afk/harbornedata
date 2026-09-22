import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ArrowDownRight, ArrowRight, Check, Pause, Play } from "lucide-react";
import { Reveal, SectionLabel } from "./primitives";
import "./intelligent-outbound.css";

const stages = [
  {
    number: "01",
    name: "Business intelligence",
    mapName: "Business insight",
    short: "Client context",
    title: "First, we learn the business behind the brief.",
    body: "We work with your team to understand what you sell, where the value sits, which work you want more of and what a worthwhile opportunity looks like. That knowledge becomes the basis for every targeting decision.",
    evidence: ["Products & services", "Best customers", "Ideal projects", "Sales insight"],
  },
  {
    number: "02",
    name: "Market discovery",
    mapName: "Market discovery",
    short: "Find plausible accounts",
    title: "Find markets worth testing, not just lists to fill.",
    body: "A handful of ideal customer examples can lead us to similar companies that broad industry filters miss. We combine lookalike discovery, niche mapping and AI-assisted research, then qualify accounts against your real criteria.",
    evidence: ["Customer lookalikes", "Niche mapping", "Fit checks", "Poor fits removed"],
  },
  {
    number: "03",
    name: "Buyer mapping",
    mapName: "Buyer mapping",
    short: "Find relevant buyers",
    title: "Map the buying process inside each account.",
    body: "We identify the functions that influence a purchase in your market, then enrich and verify relevant contact details. The right person could sit in commercial, operations, engineering, procurement or leadership.",
    evidence: ["Buying roles", "Contact enrichment", "Verification", "Account context"],
  },
  {
    number: "04",
    name: "Angle & message lab",
    mapName: "Message lab",
    short: "Test hypotheses",
    title: "Let real responses sharpen the message.",
    body: "We do not claim to know the perfect angle before speaking to the market. We test informed hypotheses across segments, study interest and objections, then develop the messages with the strongest evidence behind them.",
    evidence: ["Multiple angles", "Segment response", "Objections", "Winning language"],
  },
  {
    number: "05",
    name: "Campaign engine",
    mapName: "Campaign engine",
    short: "Managed outreach",
    title: "Turn the research into managed outreach.",
    body: "Qualified prospects enter targeted email and LinkedIn campaigns with deliberate follow-ups and reply capture. We control volume, monitor the conversations and keep testing as the campaign runs.",
    evidence: ["Targeted sends", "Follow-up logic", "Reply capture", "Continuous testing"],
  },
  {
    number: "06",
    name: "Opportunity handoff",
    mapName: "Opportunity handoff",
    short: "Surface sales context",
    title: "Pass on the conversations worth having.",
    body: "We separate routine replies from genuine commercial context: an interested buyer, a project enquiry, an RFQ or a sales discussion. Your team steps in when its expertise can move the conversation forward.",
    evidence: ["Interest identified", "Context captured", "Qualified handoff", "Sales feedback"],
  },
  {
    number: "07",
    name: "Learning loop",
    mapName: "Learning loop",
    short: "Improve next decision",
    title: "Every signal improves the next decision.",
    body: "Replies, objections, segment performance and your sales feedback feed back into targeting and messaging. The campaign in month three should be better informed than the campaign in week one.",
    evidence: ["Replies", "Objections", "Segment evidence", "Refined ICP"],
  },
] as const;

const comparison = [
  ["Understanding the offer", "Brief intake", "Commercial deep dive"],
  ["Finding accounts", "Broad database filters", "Lookalikes and niche discovery"],
  ["Qualifying fit", "Often list-level", "Account-level research"],
  ["Choosing buyers", "Fixed title filters", "Roles mapped to the buying process"],
  ["Developing copy", "One main sequence", "Multiple angles tested"],
  ["Reading responses", "Activity and reply counts", "Interest, objections and context"],
  ["Adapting campaigns", "Periodic list or copy edits", "Continuous ICP and message refinement"],
  ["First-month review", "Varies by provider", "Joint evidence review"],
  ["Channel strategy", "Often email-first", "Broadened where suitable"],
  ["Sales collaboration", "Usually limited", "Feedback carried into the next cycle"],
] as const;

function StageVisual({ stage }: { stage: number }) {
  switch (stage) {
    case 0:
      return (
        <div className="io-visual io-visual-knowledge" aria-hidden="true">
          <div className="io-knowledge-inputs">
            {(["PRODUCT", "CUSTOMERS", "PROJECTS", "SALES"] as const).map((item, index) => (
              <span key={item} style={{ animationDelay: `${index * 0.3}s` }}>
                {item}
                <i />
              </span>
            ))}
          </div>
          <div className="io-knowledge-core">
            <span>
              CLIENT
              <br />
              MODEL
            </span>
            <small>commercial context</small>
          </div>
          <div className="io-knowledge-output">
            <span className="io-indicator" /> BETTER TARGETING DECISIONS
          </div>
        </div>
      );
    case 1:
      return (
        <div className="io-visual io-visual-market" aria-hidden="true">
          <svg viewBox="0 0 440 240" preserveAspectRatio="xMidYMid meet">
            <path d="M80 120 163 50 M80 120 185 104 M80 120 198 180 M80 120 322 40 M80 120 303 104 M80 120 335 188" />
            <circle cx="163" cy="50" r="6" className="match" />
            <circle cx="185" cy="104" r="6" className="match" />
            <circle cx="198" cy="180" r="6" className="reject" />
            <circle cx="322" cy="40" r="6" className="match" />
            <circle cx="303" cy="104" r="6" className="match" />
            <circle cx="335" cy="188" r="6" className="reject" />
            <circle cx="80" cy="120" r="20" className="source" />
          </svg>
          <span className="io-market-source">
            IDEAL
            <br />
            ACCOUNT
          </span>
          <span className="io-market-match">
            SIMILAR COMPANIES <b>↗</b>
          </span>
          <span className="io-market-reject">POOR FITS FILTERED</span>
        </div>
      );
    case 2:
      return (
        <div className="io-visual io-visual-buyers" aria-hidden="true">
          <div className="io-account-top">
            <span className="io-indicator" /> QUALIFIED ACCOUNT <span>ACCOUNT 0184</span>
          </div>
          <div className="io-buyer-row">
            <i>01</i>
            <span>Commercial lead</span>
            <b>VERIFIED</b>
          </div>
          <div className="io-buyer-row">
            <i>02</i>
            <span>Operations</span>
            <b>VERIFIED</b>
          </div>
          <div className="io-buyer-row">
            <i>03</i>
            <span>Technical buyer</span>
            <b>VERIFIED</b>
          </div>
          <div className="io-buyers-foot">ROLE SELECTION FOLLOWS THE BUYING PROCESS</div>
        </div>
      );
    case 3:
      return (
        <div className="io-visual io-visual-angles" aria-hidden="true">
          <div className="io-angles-head">
            <span>MESSAGE HYPOTHESES</span>
            <span>MARKET SIGNAL</span>
          </div>
          {(["A", "B", "C"] as const).map((angle) => (
            <div className={`io-angle io-angle-${angle.toLowerCase()}`} key={angle}>
              <span>ANGLE {angle}</span>
              <div className="io-angle-track">
                <i />
              </div>
              <b>{angle === "B" ? "PROMOTE" : angle === "C" ? "TEST" : "REWORK"}</b>
            </div>
          ))}
          <div className="io-angles-foot">
            <span className="io-indicator" /> REPLIES · INTEREST · OBJECTIONS
          </div>
        </div>
      );
    case 4:
      return (
        <div className="io-visual io-visual-campaign" aria-hidden="true">
          <div className="io-campaign-lane">
            <span>EMAIL</span>
            <div>
              {Array.from({ length: 6 }, (_, i) => (
                <i key={i} style={{ animationDelay: `${i * 0.18}s` }} />
              ))}
            </div>
            <b>→</b>
          </div>
          <div className="io-campaign-lane">
            <span>LINKEDIN</span>
            <div>
              {Array.from({ length: 4 }, (_, i) => (
                <i key={i} style={{ animationDelay: `${i * 0.23 + 0.3}s` }} />
              ))}
            </div>
            <b>→</b>
          </div>
          <div className="io-campaign-return">
            <span className="io-indicator" /> REPLIES RETURN AS SIGNALS <span>↩</span>
          </div>
          <div className="io-campaign-foot">TARGETED OUTREACH / CONTROLLED VOLUME / FOLLOW-UP</div>
        </div>
      );
    case 5:
      return (
        <div className="io-visual io-visual-handoff" aria-hidden="true">
          <div className="io-reply-stack">
            <span>REPLY RECEIVED</span>
            <span>INTEREST DETECTED</span>
            <span>CONTEXT QUALIFIED</span>
          </div>
          <div className="io-handoff-arrow">→</div>
          <div className="io-opportunity">
            <small>READY FOR YOUR TEAM</small>
            <strong>Sales conversation</strong>
            <span>
              <span className="io-indicator" /> CONTEXT ATTACHED
            </span>
          </div>
        </div>
      );
    default:
      return (
        <div className="io-visual io-visual-loop" aria-hidden="true">
          <svg viewBox="0 0 440 240">
            <circle cx="220" cy="120" r="90" className="loop-track" />
            <circle cx="220" cy="120" r="90" className="loop-active" />
          </svg>
          <div className="io-loop-core">
            REFINED
            <br />
            MODEL<span>↻</span>
          </div>
          <span className="io-loop-tag io-loop-tag-a">REPLIES</span>
          <span className="io-loop-tag io-loop-tag-b">OBJECTIONS</span>
          <span className="io-loop-tag io-loop-tag-c">SALES FEEDBACK</span>
        </div>
      );
  }
}

function Engine() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const reduce = useReducedMotion();
  const viewRef = useRef<HTMLDivElement>(null);
  const inView = useInView(viewRef, { amount: 0.2 });
  const stage = stages[active]!;

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesktop(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // The diagram only runs while it is visible. Manual selection pauses the tour.
  useStageTour(inView && desktop && !paused && !reduce, setActive);

  return (
    <div className={`io-engine-shell${inView ? " is-visible" : ""}`} ref={viewRef}>
      <div className="io-engine-topline">
        <span>
          <i className="io-indicator" /> HARBORNE / OPERATING MODEL
        </span>
        <span>
          ILLUSTRATIVE SYSTEM VIEW <span className="io-topline-mark">↗</span>
        </span>
      </div>
      <div className="io-engine-heading">
        <div>
          <p className="io-kicker">THE INTELLIGENT OUTBOUND ENGINE</p>
          <h3>From business context to market evidence. Then back again.</h3>
        </div>
        <button
          className="io-play"
          type="button"
          onClick={() => setPaused((current) => !current)}
          aria-label={paused ? "Play process tour" : "Pause process tour"}
        >
          {paused ? (
            <Play size={14} fill="currentColor" />
          ) : (
            <Pause size={14} fill="currentColor" />
          )}
          <span>{paused ? "PLAY TOUR" : "PAUSE TOUR"}</span>
        </button>
      </div>

      <div className="io-desktop-engine">
        <div
          className="io-map"
          role="group"
          aria-label="Seven connected stages of the outbound process"
        >
          <svg
            className="io-map-paths"
            viewBox="0 0 1000 390"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="io-path-base"
              d="M238 71 H391 M609 71 H762 M870 108 V184 M762 220 H609 M391 220 H238 M130 257 V320 Q130 340 155 340 H391 M609 340 H870 Q905 340 905 315 V28 Q905 12 885 12 H130 Q95 12 95 43 V71"
            />
            <path
              className="io-path-current"
              d="M238 71 H391 M609 71 H762 M870 108 V184 M762 220 H609 M391 220 H238 M130 257 V320 Q130 340 155 340 H391 M609 340 H870 Q905 340 905 315 V28 Q905 12 885 12 H130 Q95 12 95 43 V71"
            />
          </svg>
          {stages.map((stage, index) => (
            <button
              key={stage.number}
              type="button"
              className={`io-map-node io-map-node-${index + 1}${active === index ? " is-selected" : ""}`}
              onClick={() => {
                setActive(index);
                setPaused(true);
              }}
              aria-pressed={active === index}
              aria-controls="io-stage-detail"
            >
              <span className="io-node-number">{stage.number}</span>
              <span className="io-node-copy">
                <strong>{stage.mapName}</strong>
                <small>{stage.short}</small>
              </span>
              <span className="io-node-status" aria-hidden="true" />
            </button>
          ))}
          <span className="io-flow-label io-flow-label-out">
            RESEARCH → TARGET → TEST → EXECUTE
          </span>
          <span className="io-flow-label io-flow-label-back">
            MARKET SIGNALS RETURN TO THE MODEL ↶
          </span>
        </div>
        <div
          id="io-stage-detail"
          className="io-stage-detail"
          key={active}
          role="region"
          aria-label="Selected process stage"
          aria-live={paused ? "polite" : "off"}
        >
          <div className="io-detail-copy">
            <span className="io-detail-index">
              {stage.number} / 07 <i /> {stage.name.toUpperCase()}
            </span>
            <h4>{stage.title}</h4>
            <p>{stage.body}</p>
            <div className="io-evidence">
              {stage.evidence.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <StageVisual stage={active} />
        </div>
      </div>

      <div className="io-mobile-engine">
        {stages.map((stage, index) => (
          <MobileStage key={stage.number} stage={stage} index={index} />
        ))}
      </div>
      <div className="io-engine-footer">
        <span>RESEARCH-LED</span>
        <span>HUMAN-DIRECTED</span>
        <span>CONTINUOUSLY REFINED</span>
        <span className="io-engine-footer-arrow">↺</span>
      </div>
    </div>
  );
}

function MobileStage({ stage, index }: { stage: (typeof stages)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.1 });
  return (
    <div className={`io-mobile-stage${inView ? " is-visible" : ""}`} ref={ref}>
      <span className="io-mobile-index">{stage.number}</span>
      <div>
        <p className="io-kicker">{stage.name}</p>
        <h4>{stage.title}</h4>
        <p className="io-mobile-body">{stage.body}</p>
        <StageVisual stage={index} />
      </div>
    </div>
  );
}

// Kept outside Engine so the visibility observer and timer each have one stable lifecycle.
function useStageTour(running: boolean, setActive: Dispatch<SetStateAction<number>>) {
  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % stages.length),
      4800,
    );
    return () => window.clearInterval(timer);
  }, [running, setActive]);
}

function Chapter({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="io-chapter">
      <span>{label}</span>
      <strong>{title}</strong>
      <p>{children}</p>
    </div>
  );
}

export function IntelligentOutbound() {
  return (
    <section
      id="intelligent-outbound"
      className="io-section scroll-mt-20"
      aria-labelledby="io-heading"
    >
      <div className="io-container">
        <Reveal>
          <SectionLabel>Intelligent-first outbound</SectionLabel>
        </Reveal>
        <div className="io-intro-grid">
          <Reveal delay={0.05}>
            <h2 id="io-heading">
              Outbound that <em>learns</em> your market.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="io-intro-lead">
              The first campaign is a starting hypothesis. We build the account universe, test where
              demand might sit, listen to the market and refine the system as evidence comes back.
            </p>
            <p className="io-intro-note">
              Your team knows the business. We turn that knowledge into a better way to find and
              engage its next customers.
            </p>
          </Reveal>
        </div>
        <div className="io-chapters">
          <Chapter label="01 / UNDERSTAND" title="The business">
            What you sell, who buys, and which work is worth winning.
          </Chapter>
          <Chapter label="02 / TEST" title="The market">
            Which accounts, buyers and messages create real interest.
          </Chapter>
          <Chapter label="03 / LEARN" title="The next move">
            What to scale, change or expand after the market responds.
          </Chapter>
        </div>
        <Engine />

        <div className="io-ai-note">
          <span className="io-ai-note-icon">✳</span>
          <p>
            <strong>Modern tools make the research deeper.</strong> AI assists with similarity,
            classification, enrichment and pattern finding. People set the commercial criteria,
            check the fit and decide what changes.
          </p>
        </div>

        <div className="io-review" aria-labelledby="io-review-heading">
          <div className="io-review-intro">
            <div>
              <SectionLabel>The 30-day adaptation point</SectionLabel>
              <h2 id="io-review-heading">
                Month one creates the evidence.
                <br />
                <em>Month two uses it.</em>
              </h2>
            </div>
            <p>
              After roughly a month of live activity, we review the campaign together. We look
              beyond sends and opens: which segments engage, what prospects object to, where useful
              conversations appear, and what your sales team is hearing.
            </p>
          </div>
          <div className="io-timeline">
            <div className="io-timeline-track" aria-hidden="true" />
            <div className="io-week">
              <span>WEEK 01</span>
              <strong>Launch</strong>
              <small>Baseline signals</small>
            </div>
            <div className="io-week">
              <span>WEEK 02</span>
              <strong>Read</strong>
              <small>Audience response</small>
            </div>
            <div className="io-week">
              <span>WEEK 03</span>
              <strong>Compare</strong>
              <small>Angles & objections</small>
            </div>
            <div className="io-week">
              <span>WEEK 04</span>
              <strong>Review</strong>
              <small>Sales feedback</small>
            </div>
            <div className="io-review-node">
              <span className="io-indicator" /> PERFORMANCE REVIEW
            </div>
          </div>
          <div className="io-review-branches">
            <div>
              <ArrowDownRight size={18} aria-hidden />
              <strong>Scale what works</strong>
              <span>Segments and messages with real traction.</span>
            </div>
            <div>
              <ArrowDownRight size={18} aria-hidden />
              <strong>Refine targeting</strong>
              <span>Improve fit and remove weak pockets.</span>
            </div>
            <div>
              <ArrowDownRight size={18} aria-hidden />
              <strong>Test new angles</strong>
              <span>Use objections and interest to guide copy.</span>
            </div>
            <div>
              <ArrowDownRight size={18} aria-hidden />
              <strong>Broaden the route</strong>
              <span>Add suitable channels when needed.</span>
            </div>
          </div>
          <div className="io-channel-callout">
            <div>
              <span className="io-kicker">WHEN THE EVIDENCE CALLS FOR IT</span>
              <h3>More channels. Not another management fee.</h3>
            </div>
            <p>
              If the first-month review shows results materially below the level we agreed to assess
              against, we will work out why. Where a broader route is appropriate, we can agree
              additional outreach methods, such as calling, within the campaign scope without
              increasing our management fee.
            </p>
          </div>
        </div>

        <div className="io-comparison" aria-labelledby="io-comparison-heading">
          <div className="io-comparison-intro">
            <div>
              <SectionLabel>A different operating model</SectionLabel>
              <h2 id="io-comparison-heading">The difference is in what happens after “send”.</h2>
            </div>
            <p>
              Volume-first outreach can produce activity. Our model is designed to turn activity
              into market intelligence, then use that intelligence to improve the next campaign
              decision.
            </p>
          </div>
          <div className="io-two-models">
            <div className="io-model-typical">
              <span className="io-kicker">COMMON VOLUME-FIRST MODEL</span>
              <div className="io-model-line">
                <span>Database filters</span>
                <ArrowRight size={16} />
                <span>Large list</span>
                <ArrowRight size={16} />
                <span>One sequence</span>
                <ArrowRight size={16} />
                <span>Activity report</span>
              </div>
            </div>
            <div className="io-model-harborne">
              <span className="io-kicker">HARBORNE DATA</span>
              <div className="io-model-line">
                <span>Commercial context</span>
                <ArrowRight size={16} />
                <span>Qualified accounts</span>
                <ArrowRight size={16} />
                <span>Tested angles</span>
                <ArrowRight size={16} />
                <span>Market signals</span>
                <b>↺ REFINE</b>
              </div>
            </div>
          </div>
          <div className="io-matrix" role="table" aria-label="Operating model comparison">
            <div className="io-matrix-head" role="row">
              <span role="columnheader">OPERATING DECISION</span>
              <span role="columnheader">COMMON VOLUME-FIRST MODEL</span>
              <span role="columnheader">HARBORNE DATA</span>
            </div>
            {comparison.map(([label, typical, harborne]) => (
              <div className="io-matrix-row" role="row" key={label}>
                <span role="cell">{label}</span>
                <span role="cell">{typical}</span>
                <span role="cell">
                  <Check size={15} strokeWidth={1.7} aria-hidden />
                  {harborne}
                </span>
              </div>
            ))}
          </div>
          <p className="io-comparison-footnote">
            The comparison describes common approaches, not every other provider. Scope and channels
            are agreed for each campaign.
          </p>
        </div>

        <div className="io-human" aria-labelledby="io-human-heading">
          <div className="io-human-copy">
            <SectionLabel>Built around your business</SectionLabel>
            <h2 id="io-human-heading">
              AI-assisted research. <em>Human-directed decisions.</em>
            </h2>
            <p>
              We spend time with your team learning the details that a database cannot tell us:
              high-value work, poor-fit projects, buying triggers, commercial constraints,
              terminology and objections.
            </p>
            <p>
              That knowledge is combined with market research and live campaign signals. The aim is
              simple: make increasingly informed decisions about who to contact, why them and what
              to say.
            </p>
            <a href="#pricing" className="io-pricing-link">
              See how the partnership is priced <ArrowRight size={17} aria-hidden />
            </a>
          </div>
          <div
            className="io-human-visual"
            role="img"
            aria-label="Client knowledge, market data and campaign signals inform better outbound decisions"
          >
            <div className="io-human-tags">
              <span>PRODUCTS</span>
              <span>CUSTOMERS</span>
              <span>IDEAL PROJECTS</span>
              <span>BUYING TRIGGERS</span>
              <span>OBJECTIONS</span>
              <span>SALES FEEDBACK</span>
            </div>
            <div className="io-human-core">
              <span className="io-indicator" />
              <strong>CLIENT KNOWLEDGE</strong>
              <small>learned with your team</small>
            </div>
            <div className="io-human-equation">
              <div>
                <span>CLIENT CONTEXT</span>
                <b>+</b>
                <span>MARKET DATA</span>
                <b>+</b>
                <span>LIVE SIGNALS</span>
              </div>
              <strong>
                BETTER OUTBOUND DECISIONS <ArrowRight size={17} aria-hidden />
              </strong>
            </div>
          </div>
        </div>

        <div className="io-to-pricing">
          <div>
            <span className="io-kicker">THE SYSTEM, FULLY MANAGED</span>
            <h2>
              Research. Outreach. Learning.
              <br />
              <em>One connected service.</em>
            </h2>
          </div>
          <p>
            Here is what the ongoing partnership costs, and how to think about its commercial
            return.
          </p>
        </div>
      </div>
    </section>
  );
}
