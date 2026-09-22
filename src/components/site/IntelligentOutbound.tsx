import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
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
          <h2 id="io-heading">From business context to market evidence. Then back again.</h2>
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
            <h3>{stage.title}</h3>
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
        <h3>{stage.title}</h3>
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

export function IntelligentOutbound() {
  return (
    <section
      id="intelligent-outbound"
      className="io-section scroll-mt-20"
      aria-labelledby="io-heading"
    >
      <div className="io-container">
        <Engine />
      </div>
    </section>
  );
}
