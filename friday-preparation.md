# Friday AI engineering interview preparation

Interview: Friday, October 30, 2026, with Mayur Patidar. Invitation says 5:30 PM CST. Confirm the calendar timezone: 5:30 PM America/Chicago is 6:30 PM New York that day; literal fixed CST (UTC−6) is 7:30 PM New York. The pasted invitation did not include the joining link.

## What the earlier 76-card preparation covered

The actual Interview Arena source and prior chat were reviewed. The supplied ChatGPT share link did not expose readable content through the web tool; this audit uses the accessible “Practice AI and data interviews” chat and its matching repository.

| Job requirement | Earlier coverage | Added / preparation action |
|---|---|---|
| GenAI production development | Extraction and serving designs; incidents; rollback | Dedicated release, cloud, cost, monitoring, drift drills |
| Python coding | Three Python exercises plus SQL | Rate limiter, rank fusion, extraction evaluator with solutions |
| MCP | One introductory card | Architecture, primitives, transports, security, retries, server tests |
| Agent orchestration | RAG graph and safe actions | Workflow choice, checkpoint recovery, approvals, framework tradeoffs |
| Transformers, fine-tuning | Attention, KV cache, LoRA, QLoRA, loss, leakage | Decoder-transformer and training/inference explanation |
| Prompt design | Indirect coverage through task designs | Systematic experiment, few-shot selection, structured-output checks |
| Vector stores and RAG | Chunking, hybrid retrieval, reranking, freshness, access | Rank-fusion coding; airline policy vs live operational data |
| LLM evaluation | Retrieval, answer quality, metrics, benchmarks | Judge calibration and extraction-metric coding |
| Governance and responsible AI | Injection and access controls | Risk owners, provenance, release controls, audit and incidents |
| Experimentation, KPIs | Claims and baseline measurement | Online A/B test, guardrails, uncertainty |
| OOP, DDD, TDD | Reliability tests and general design | Explicit domain boundaries, interfaces, invariants, TDD |
| REST, cloud, CI/CD | API security, async, deployment | Async job contract, concrete cloud design, release pipeline |
| Agile, specifications, estimates | Stakeholders and prioritization | Acceptance criteria, technical spike, estimates and incremental delivery |
| Airline domain | No dedicated exercise | Disruption/rebooking system design |
| Java, Office, AI-assisted tools | Limited / no dedicated practice | Java interface comparison; specification/backlog exercise; verbal check below |
| Education and years of experience | Resume/intro material | Factual qualifications cannot be added through study; explain your actual record |

Coverage means practice material exists; it does not establish interview readiness or past experience. No fixed bank predicts every question.

## Tuesday to Friday plan

Suggested allocation: about three focused hours Wednesday and Thursday, plus a shorter session tonight and Friday. If time is tighter, prioritize Python, MCP, and one end-to-end project explanation.

**Tuesday, October 27 — baseline, 90 minutes.** Spend 20 minutes answering the project-story card aloud, 30 on MCP cards 1–6, and 30 coding rank fusion without reading the solution. Spend 10 recording weak spots. Verify timezone, joining link, screen-sharing setup, and coding environment.

**Wednesday, October 28 — build, 3 hours.** Spend 75 minutes on the three new Python problems (about 20 minutes each plus review), 45 on MCP and agent follow-ups, 45 on the airline design, and 15 recalling answers without notes. Revisit the earlier bounded-concurrency exercise. For every coding solution: clarify inputs, work an example, implement, test, then explain time and space.

**Thursday, October 29 — production and rehearsal, 3 hours.** Spend 45 minutes on cloud, CI/CD, observability, evaluation, governance and cost; 30 on DDD/OOP/TDD and API contracts; 60 on the mock interview below; 30 repairing the two weakest areas; and 15 rehearsing a real failure and stakeholder disagreement.

**Friday, October 30 — recall, 60–90 minutes.** Solve one Python problem from a blank file, explain MCP in two minutes, draw the airline design in five, rehearse your introduction and project story, and review only your weak spots. Leave a buffer before joining.

## A realistic 60-minute mock

This is a practice format, not a claim about the employer's interview agenda.

1. 5 minutes: introduction and project ownership.
2. 20 minutes: implement the rate limiter or extraction evaluator; test edge cases aloud.
3. 10 minutes: MCP architecture, authorization, and timeout after mutation.
4. 15 minutes: airline disruption assistant design, then inventory race and downstream outage.
5. 5 minutes: production regression or real incident.
6. 5 minutes: questions for the interviewer.

Score each area 0–3: 0 unable to explain; 1 remembers definitions; 2 gives a correct concrete explanation; 3 implements or defends it and handles a follow-up. Treat a score below 2 in Python, MCP, project ownership, or reliability as a priority for another practice round. This is a rehearsal heuristic, not a hiring prediction.

## Questions to answer without notes

- What did you personally build, and what did teammates own?
- Why did this task need an LLM, and what was the simpler baseline?
- How did you measure the claimed improvement? Which cases failed?
- How do retrieval failures differ from generation failures?
- How does tool calling relate to MCP? Where are permissions enforced?
- What happens when a tool succeeds but the client never receives the response?
- What survives a process restart? What can replay?
- How do you test stochastic output and enforce deterministic business rules?
- How do you roll back a prompt, model, or retrieval change?
- Which metric represents business success, and which guardrails stop rollout?
- Explain one Java interface or Python protocol and dependency injection.
- How have you used an AI coding assistant? Explain review of its diff, tests, dependency checks, sensitive-data handling, and your ownership of the result. Use a real example.
- What do you put in a project specification, estimate, backlog, spreadsheet tracker, or stakeholder presentation?

## Questions to ask Mayur

- Which production AI workflow would this role own first?
- How much of the role is Python implementation versus agent design and platform integration?
- How is MCP used today, and what are the hardest reliability problems?
- What evaluation and release criteria determine whether an AI change ships?
- What would successful delivery in the first 90 days look like?

## Start by reading the answers

The site now shows every answer and follow-up immediately. Read the professional opening, memory cue, and reply at your own pace. Start with the introduction and main project in Round 1, then study Round 5. Treat the timed exercises above as optional later practice after you understand the material. The answers are guides, not scripts to present as your own experience. All new scenarios are labeled as proposed approaches.

## 1. MCP: explain the whole path

**Question:** Explain MCP and trace a flight-status question from the user to the airline API.

**Professional opening:** MCP standardizes how an AI application discovers and uses external capabilities. The host manages clients connected to servers; servers can expose tools, resources, and prompts. In this example, the application chooses a flight-status tool, validates the request, invokes the server, and returns the API result to the model. The application controls orchestration and permissions.

**Memory cue:** Host → client → server → API

**Pushback:** Is MCP the same as function calling?

**Reply:** No. Function calling is a model-facing interaction pattern. MCP standardizes the integration interface; an application can expose discovered MCP tools through a model’s tool-calling interface.

Reference: [MCP architecture](https://modelcontextprotocol.io/docs/learn/architecture)

## 2. MCP: tools, resources, prompts

**Question:** How would you expose an airline system through MCP?

**Professional opening:** I would expose get_flight_status as a tool, a policy document as a resource, and a reusable disruption-summary template as a prompt. Tools provide operations, resources provide contextual data, and prompts provide reusable message templates. I would keep each capability narrow and document its inputs, outputs, and failures.

**Memory cue:** Operation → context → template

**Pushback:** Does a read-only tool need authorization?

**Reply:** Yes. Reading a reservation or passenger record exposes private information. I would authorize access to the specific object at execution time.

## 3. MCP: transports and compatibility

**Question:** What changes between a local MCP server and a remote one?

**Professional opening:** Local integrations commonly use stdio; remote integrations use Streamable HTTP. For a remote service I would plan identity, TLS, deadlines, request limits, and observability. I would pin the SDK and supported protocol versions and test capability discovery and errors with the target client rather than assume compatibility.

**Memory cue:** Local vs remote → identity → contract tests

**Pushback:** Would you memorize one handshake for every deployment?

**Reply:** No. Protocol versions evolve. I would explain capability discovery and verify the exact lifecycle against the SDK and specification version used by that deployment.

## 4. MCP: secure a booking tool

**Question:** Design the security boundary for an MCP tool that changes reservations.

**Professional opening:** I would derive identity from a validated credential, enforce access to the reservation, validate the requested itinerary, and bind approval to the exact change and price. The server would recheck current state before committing. I would use least-privilege credentials and audit the decision without logging secrets or passenger details.

**Memory cue:** Identity → object access → exact approval → recheck

**Pushback:** Can the server forward any incoming bearer token downstream?

**Reply:** No. Tokens must be intended for their recipient. I would use the appropriate downstream authorization flow and validate token audience and scope.

Reference: [MCP security guidance](https://modelcontextprotocol.io/specification/latest/basic/security_best_practices)

## 5. MCP: timeout after a mutation

**Question:** A booking tool times out. The model asks to retry. What happens?

**Professional opening:** A timeout leaves the outcome uncertain. I would check the operation by its durable idempotency key or provider reference before issuing another mutation. The same key must represent the same request; a changed payload is a conflict. If the provider offers neither idempotency nor reliable status lookup, I would reconcile or escalate rather than promise duplicate-free retries.

**Memory cue:** Unknown outcome → lookup → reconcile

**Pushback:** Does an in-memory set solve this?

**Reply:** No. It loses state on restart and does not coordinate replicas. The durable operation record and downstream behavior must support the guarantee.

## 6. MCP: test the server

**Question:** What tests would you write for a new MCP server?

**Professional opening:** I would test discovery and schemas, valid and malformed calls, authorization failures, result formats, and timeouts. I would add cross-user access attempts, replay of mutations, stale approvals, and downstream failures. A fake backend makes failure tests deterministic; a small integration suite verifies compatibility with the actual client and pinned SDK.

**Memory cue:** Contract → access → failures → client

**Pushback:** A tool schema validates. Are you done?

**Reply:** No. Schema validity says little about business correctness. A valid reservation ID can still belong to a different user, and a valid seat count can exceed inventory.

## 7. Agents: choose a workflow

**Question:** When should you use an agent, a graph, or ordinary application code?

**Professional opening:** I would use ordinary code for deterministic business rules and a bounded workflow when steps are known. An agent is useful when the next action depends on unstructured information. For this role I would favor explicit state transitions, typed tool results, time and cost limits, and an escalation path. I would add multiple agents only for a measured benefit.

**Memory cue:** Task uncertainty → bounded state → measurable benefit

**Pushback:** Why not let the model loop until it succeeds?

**Reply:** Repeated calls can accumulate cost and repeat harmful actions. I would stop on a terminal state, budget exhaustion, repeated failure, or an action needing human review.

## 8. Agents: checkpoint and approval

**Question:** How would you resume an interrupted LangGraph workflow safely?

**Professional opening:** I would persist graph state with a durable checkpointer and associate it with the correct thread and user. An approval records the exact proposed action and its version. On resumption I would revalidate that action against current state. External effects need idempotency because workflow recovery can replay work.

**Memory cue:** Persist → bind approval → revalidate → idempotency

**Pushback:** Is an in-memory checkpointer production recovery?

**Reply:** It can support a local demonstration but loses state on process restart. A production recovery requirement needs persistent storage and tested restart behavior.

Reference: [LangGraph persistence](https://docs.langchain.com/oss/python/langgraph/persistence)

## 9. Frameworks: defend your choice

**Question:** Compare LangGraph, Semantic Kernel, Copilot Studio, and direct tool calling.

**Professional opening:** I would compare required control over state, deployment, integrations, testing, and team skills. Direct tool calling suits a small orchestration loop; a graph runtime suits explicit branching and recovery. For an existing Microsoft environment I would evaluate Semantic Kernel or Copilot Studio against the same requirements. I would demonstrate depth in the framework I have actually used and prototype missing capabilities before committing.

**Memory cue:** Requirements → strongest known tool → validate gaps

**Pushback:** Have you used all of them in production?

**Reply:** I would answer honestly. Familiarity with their purpose is different from implementation experience; I would connect the question to a framework I can explain from real work.

## 10. Prompt engineering: run an experiment

**Question:** How do you improve a prompt systematically?

**Professional opening:** I would define the task, output schema, allowed sources, and failure behavior, then build a representative evaluation set. I would add diverse few-shot examples for common ambiguities, compare one change at a time, and version prompts with model and retrieval settings. I would select using task quality, cost, latency, and important failure slices.

**Memory cue:** Task contract → examples → controlled evaluation

**Pushback:** Should you always request detailed chain-of-thought?

**Reply:** No. I would ask for the required answer and concise evidence or a verifiable explanation. For multi-step tasks I can structure intermediate outputs and checks without relying on hidden reasoning as an audit trail.

## 11. Structured output: valid but false

**Question:** The model returns schema-valid JSON. How do you know it is correct?

**Professional opening:** I would separately validate syntax, types, business invariants, and evidence. An extracted amount should have a source location and pass currency and reconciliation checks. Missing evidence should trigger an explicit missing value or review. I would measure field correctness on labeled data; schema validation alone cannot detect a plausible wrong amount.

**Memory cue:** Schema → invariants → evidence → evaluation

**Pushback:** Will temperature zero eliminate hallucinations?

**Reply:** No. It does not establish factual correctness or complete determinism across every serving setup. Retrieval, validation, and evaluation still matter.

## 12. DDD: model an airline domain

**Question:** What does domain-driven design mean in this application?

**Professional opening:** I would define bounded contexts such as reservations, flight operations, and customer communication. A reservation aggregate owns its invariants, such as allowed state transitions. Domain services express business rules; infrastructure adapters connect databases and airline APIs. The agent requests an operation through an application service rather than directly editing domain state.

**Memory cue:** Bounded contexts → invariants → application service

**Pushback:** Is every database table a microservice?

**Reply:** No. Service boundaries follow domain ownership and operational needs. Splitting tables into services can create distributed transactions without improving the design.

## 13. OOP: make the model replaceable

**Question:** How would you apply SOLID principles to an AI service?

**Professional opening:** I would separate orchestration, retrieval, model access, and validation. Small interfaces let the application depend on capabilities rather than one vendor client. Dependency injection makes tests use deterministic fakes. I would avoid a large base class with unrelated responsibilities and prefer composition where behavior varies independently.

**Memory cue:** Small interfaces → composition → test doubles

**Pushback:** How does this translate to Java?

**Reply:** The same separation maps to interfaces and constructor injection. I would keep domain validation independent of the controller and provider SDK, then use unit and integration tests around those boundaries.

## 14. TDD: test an uncertain model

**Question:** How do you use test-driven development with an LLM?

**Professional opening:** I would first write failing deterministic tests for the application contract: input validation, access checks, tool routing, and failure handling. I would implement the smallest behavior and refactor. For model quality I would maintain a separate versioned evaluation suite with acceptance thresholds and representative slices. Unit tests use fake model responses; evaluations measure behavior on real model calls.

**Memory cue:** Red → green → refactor; contract tests + evals

**Pushback:** Would you assert one exact natural-language paragraph?

**Reply:** Usually no. I would test required facts, supported evidence, structured fields, and unacceptable behavior. Exact equality fits deterministic structured targets when the task requires it.

## 15. REST: long-running AI jobs

**Question:** Design a REST API for document extraction.

**Professional opening:** I would accept an authorized request, validate file limits, and create a durable job using an idempotency key. A 202 response returns a job reference; status and result endpoints authorize access to that job. Workers process bounded jobs, persist outcomes, and support retries and cancellation. Errors distinguish invalid input, forbidden access, rate limits, and temporary failures.

**Memory cue:** Validate → durable job → worker → authorized result

**Pushback:** Can two requests use the same key with different files?

**Reply:** I would reject that conflict. The idempotency record should be scoped to the caller and bound to a canonical request fingerprint.

## 16. Cloud: deploy the service

**Question:** Describe one concrete cloud deployment for this system.

**Professional opening:** As a proposed Azure design, I would run the API and workers in managed containers, use a queue for long jobs, object storage for documents, a database for job state, and a managed identity and secret store for credentials. I would keep resource access private where required, scale workers to measured bottlenecks, and instrument the full request path. Equivalent AWS or GCP services can implement the same pattern.

**Memory cue:** API → queue → workers → state → identity

**Pushback:** Is this what you deployed previously?

**Reply:** Only if it matches my actual work. Otherwise I would label it as my design and explain the deployment environment I really used.

## 17. CI/CD: release an AI change

**Question:** What belongs in the pipeline for changing a model or prompt?

**Professional opening:** I would run unit and contract tests, dependency and secret checks, and a versioned evaluation suite. The release records the application, model, prompt, index, and configuration versions. I would deploy gradually with health and quality checks, compare against the baseline, and retain a tested rollback path. Schema and index changes need compatibility planning.

**Memory cue:** Tests → eval gate → versions → gradual rollout

**Pushback:** Does rolling back the model restore everything?

**Reply:** No. Prompt, retrieval, configuration, and data migrations may also have changed. I would treat the release as a versioned bundle and check compatibility before rollback.

## 18. Observability: diagnose a regression

**Question:** Answer quality fell and latency doubled. How do you investigate?

**Professional opening:** I would segment by release, tenant, language, document type, and tool path, then inspect redacted traces. I would separate queue time, retrieval, reranking, model time, and tool latency. I would compare retrieval recall, schema failures, unsupported claims, token use, and retry counts with the baseline. The first mitigation could be rollback, reduced load, or disabling a failing path.

**Memory cue:** Segment → trace stages → compare → mitigate

**Pushback:** Can you just log every prompt and response?

**Reply:** That can expose sensitive data. I would use controlled sampling, redaction, access restrictions, and retention rules while preserving identifiers and metrics needed for diagnosis.

## 19. Cost: estimate before optimizing

**Question:** Estimate monthly inference cost and choose an optimization.

**Professional opening:** I would multiply monthly calls by average input and output tokens and the applicable token rates, then add retrieval, hosting, and tool costs. For a hypothetical 100,000 calls with 2,000 input and 400 output tokens, at fictional rates of $1 and $4 per million tokens, inference is $360. I would first measure wasted context and repeated work, then compare routing, caching, or shorter outputs against quality.

**Memory cue:** Volume × tokens × rates → measure waste

**Pushback:** Does caching always reduce cost safely?

**Reply:** No. The key needs the relevant user access scope and model, prompt, and content versions. Sensitive or rapidly changing answers may be unsuitable for caching.

## 20. Governance: turn policy into controls

**Question:** What would responsible AI governance look like here?

**Professional opening:** I would classify use-case risk and data sensitivity, assign owners, define acceptable behavior, and document model and data provenance. Controls include restricted data access, retention, evaluations of harmful or unequal outcomes, human review for consequential actions, and an incident process. Release gates and audit records make the policy enforceable in daily engineering.

**Memory cue:** Risk → owner → control → evidence

**Pushback:** Can a responsible-AI document alone prevent harm?

**Reply:** No. I would connect each requirement to an implemented control, a test, an owner, and a response when the control fails.

## 21. Evaluation: calibrate the judge

**Question:** How do you make LLM-as-a-judge useful for release decisions?

**Professional opening:** I would define a specific rubric, calibrate it on human-labeled cases, and measure agreement and failure patterns. I would blind system identities and randomize answer order where relevant. The judge should score dimensions such as correctness and evidence support separately, with deterministic checks for fields and policy rules. I would keep model and judge versions recorded.

**Memory cue:** Rubric → human calibration → failure slices

**Pushback:** The judge prefers longer answers. What changes?

**Reply:** I would inspect length bias, refine the rubric, compare paired examples, and validate again against human judgments. A convenient score is not automatically a valid measure of task success.

## 22. A/B testing: measure business value

**Question:** How would you evaluate a new AI assistant online?

**Professional opening:** I would choose a primary outcome such as successfully resolved cases and guardrails such as incorrect actions, complaints, latency, and cost. I would randomize at a unit that reduces contamination, often user or account, estimate sample needs, and predefine the analysis period. I would report uncertainty and segment results; a before-and-after comparison alone can confuse product effects with traffic changes.

**Memory cue:** Outcome → guardrails → randomize → uncertainty

**Pushback:** What if clicks rise but resolution falls?

**Reply:** The primary outcome and guardrails decide the result. More clicks can indicate friction rather than value; I would investigate before expanding rollout.

## 23. Drift: identify what changed

**Question:** What does drift mean for an LLM application?

**Professional opening:** I would distinguish changes in user inputs, source knowledge, retrieved results, and output quality. I would monitor representative data slices and regularly label recent cases. A changed embedding distribution is a signal to investigate, not proof of business failure. The response may be reindexing, prompt changes, updated evaluations, or a different model depending on the cause.

**Memory cue:** Input → knowledge → retrieval → outcome

**Pushback:** How do you know without ground truth?

**Reply:** Operational proxies can flag issues, but they do not establish correctness. I would maintain a sampled human-review process and delay-dependent outcome labels where available.

## 24. Delivery: clarify and estimate

**Question:** A leader asks for an AI assistant in two weeks. What do you do?

**Professional opening:** I would identify users, workflow, data access, success criteria, and the consequences of a wrong answer. I would scope a thin end-to-end slice with explicit acceptance tests, list dependencies and uncertainties, and estimate a range after a short technical spike. In Agile delivery I would demonstrate working increments, collect feedback, and update risks and priorities with the product owner.

**Memory cue:** Requirements → acceptance → spike → increments

**Pushback:** What would you put in the project specification?

**Reply:** Scope, inputs and outputs, domain rules, interfaces, security and reliability targets, evaluation criteria, dependencies, milestones, and assumptions. A traceable backlog and simple project spreadsheet can make ownership and progress clear.

## 25. Airline design: disrupted travel assistant

**Question:** Design an assistant that helps a passenger after a cancelled flight.

**Professional opening:** I would clarify whether the assistant only explains options or can rebook. Policy answers use versioned retrieval; flight status and available seats come from live tools. A bounded workflow authenticates the passenger, reads the reservation, retrieves eligible options, obtains approval for the exact itinerary and price, and commits through the reservation service with idempotency. I would recheck availability before commit, notify only after confirmation, and provide an agent handoff when state is uncertain.

**Memory cue:** Clarify → live tools + policy RAG → approval → safe commit

**Pushback:** Inventory changes after the user approves. What happens?

**Reply:** I would stop that attempt, fetch current options, and request approval for the new offer. I would not silently substitute another flight or price.

## 26. Transformers: explain without hand-waving

**Question:** Explain a decoder transformer and the difference between training and inference.

**Professional opening:** Tokens become embeddings with position information. Causal self-attention combines information from earlier tokens, and feed-forward layers transform those representations using residual connections and normalization. Training adjusts weights using a loss such as next-token prediction; inference applies learned weights to generate tokens. Context is temporary input, while fine-tuning changes parameters.

**Memory cue:** Tokens → attention → layers → next-token distribution

**Pushback:** Does attention mean the model understands or remembers everything?

**Reply:** No. Attention is a computation over representations. Limited context, learned associations, and generation errors mean I still need external evidence and task-specific evaluation.

## 27. Python: sliding-window rate limiter

**Question:** Implement allow(user) for at most N requests per rolling W seconds. Explain boundaries, concurrency, and scaling.

**Professional opening:** I would keep a deque of accepted timestamps per user, remove expired entries, and accept only below the limit. A monotonic clock avoids wall-clock jumps, and a lock protects the check-and-append operation within one process. Each timestamp is appended and removed once, giving amortized O(1) work per request. Production needs idle-key cleanup and a shared atomic implementation across replicas.

**Memory cue:** Deque → expire → atomic check → append

**Pushback:** Can this enforce a global limit across four workers?

**Reply:** No. Their memory is separate. I would move the atomic decision to a shared store and explicitly define behavior when that store is unavailable.

```python
from collections import deque
from threading import Lock
from time import monotonic

class SlidingWindowLimiter:
    """Single-process limiter. Window is (now-window, now]."""
    def __init__(self, limit, window, clock=monotonic):
        if limit <= 0 or window <= 0:
            raise ValueError("limit and window must be positive")
        self.limit, self.window, self.clock = limit, window, clock
        self.events = {}
        self.lock = Lock()

    def allow(self, user):
        with self.lock:
            now = self.clock()
            queue = self.events.setdefault(user, deque())
            while queue and queue[0] <= now - self.window:
                queue.popleft()
            if len(queue) >= self.limit:
                return False
            queue.append(now)
            return True
```

## 28. Python: combine search results

**Question:** Merge ranked lexical and vector search results using reciprocal rank fusion. Handle duplicates and deterministic ties.

**Professional opening:** I would accumulate 1 divided by k plus rank for each document across lists. A per-list set prevents a repeated document from gaining extra votes in that list. I would sort by descending fused score and then document ID for deterministic ties. With M total entries and U unique documents, work is O(M + U log U), and space is O(U). All candidate lists must already respect authorization.

**Memory cue:** Ranks → per-list dedup → score → deterministic order

**Pushback:** Does fusion make lexical and vector scores comparable?

**Reply:** It avoids comparing their raw score scales by using ranks. The rank constant and retrieval depth still need evaluation on representative queries.

```python
def reciprocal_rank_fusion(rankings, k=60):
    """Ranked document-ID lists; equal scores break by document ID."""
    if k <= 0:
        raise ValueError("k must be positive")
    scores = {}
    for ranking in rankings:
        seen = set()
        for rank, doc_id in enumerate(ranking, start=1):
            if doc_id in seen:
                continue
            seen.add(doc_id)
            scores[doc_id] = scores.get(doc_id, 0.0) + 1.0 / (k + rank)
    return sorted(scores, key=lambda doc_id: (-scores[doc_id], doc_id))
```

## 29. Python: evaluate extraction outputs

**Question:** Compute field accuracy and whole-document exact match. Distinguish a missing key from an explicit null; report extra documents.

**Professional opening:** I would define comparison rules before coding. This implementation checks exact string-or-null equality across required fields and penalizes extra fields in whole-document exact match. A sentinel separates a missing prediction from an explicit null. It reports unexpected documents separately and returns undefined rates as None for empty denominators. Runtime is linear in the fields and document IDs inspected.

**Memory cue:** Metric contract → sentinel → denominators → extras

**Pushback:** Should currency strings be normalized first?

**Reply:** Only under an agreed business rule. I would parse currency and units explicitly, preserve the original evidence, and test whether normalization can incorrectly equate different amounts.

```python
def extraction_metrics(expected, predicted):
    """Mappings: document ID -> {field: string or None}.
    Equality is exact; required fields are the keys in expected.
    Missing predictions do not match an explicit None.
    """
    missing = object()
    total = correct = exact = 0
    for doc_id, truth in expected.items():
        guess = predicted.get(doc_id, {})
        matches = [guess.get(field, missing) == value
                   for field, value in truth.items()]
        total += len(matches)
        correct += sum(matches)
        exact += (doc_id in predicted and all(matches)
                  and set(guess) == set(truth))
    return {
        "field_accuracy": correct / total if total else None,
        "document_exact_match": exact / len(expected) if expected else None,
        "unexpected_documents": len(set(predicted) - set(expected)),
    }
```

## 30. Pressure: give your 90-second project story

**Question:** Explain your most relevant AI project in 90 seconds, then defend two decisions.

**Professional opening:** I would structure my real example as: business problem and users; my exact ownership; data and model flow; one difficult engineering decision; evaluation and deployment; one limitation and next improvement. For the tax-extraction work using Orchestra, the bank’s internal tool, I can discuss digital PDFs and spreadsheets and extracting workflow IDs, dates, vendor, and amount. I must fill in only training settings, deployment facts, and outcomes I can substantiate.

**Memory cue:** Problem → ownership → architecture → evidence → limitation

**Pushback:** What was the baseline behind the claimed savings?

**Reply:** I would name the baseline workflow, sample, measurement period, and calculation. If the percentage was an estimate rather than a controlled result, I would say so and explain what evidence I do have.


## Updated bank project: Orchestra

The bank project uses Orchestra, an internal tool for tax-document field extraction. It does not use Qwen3. The underlying model and historical tuning method are not confirmed. For task adaptation, evaluate supervised fine-tuning on verified document-to-field pairs if Orchestra supports it; LoRA or QLoRA are possible implementation choices only for compatible accessible models. Round 1 includes the updated story and three additional lessons on training data, evaluation, and method selection.

## Beginner learning format

Every website lesson now starts with a plain-English explanation, a small example, and steps. Expand “Words explained” for definitions, then read the professional answer and follow-up. Use the updated [complete study guide](interview-spoken-answers.md) for the same beginner explanations offline. Treat timed practice as optional later work.
