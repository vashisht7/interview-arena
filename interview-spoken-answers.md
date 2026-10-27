# Interview Arena — spoken answers

Aim for 30–45 seconds. Learn the three cues, not every word. Use the follow-up only when asked.

Evidence comes from your résumé, your answers, and the supplied repository briefings. Recommended designs use “I would.”


## Explain your Bank of America work

**Confirmed story**

**Question:** Walk me through the tax-document extraction system you built.

**Say:** I built a Qwen 3 extraction workflow for tax-department documents at Bank of America. It handled digital PDFs and spreadsheets and extracted workflow IDs, dates, vendors, and amounts into validated JSON. I owned the work end to end: data preparation, fine-tuning, OCR integration, evaluation, APIs, and the review UI. My focus was getting usable data into downstream workflows, with review where needed.

**Remember:** Problem → four fields → end-to-end ownership

**Follow-up:** Why use OCR if the inputs were digital PDFs?

**Reply:** Digital PDFs may contain embedded images or unreliable text. I would extract native text first and use OCR only where needed.

**Evidence note:** User-confirmed scope plus résumé. Model size, training settings, hosting, exact savings methodology and historical incidents remain unverified.


## Why an LLM at all?

**Recommended approach**

**Question:** Why use Qwen 3 instead of rules or a spreadsheet parser?

**Say:** I would parse spreadsheets directly and extract native text from digital PDFs first. Qwen earns its place when layouts and field names vary enough that semantic interpretation helps. I would compare it with rules on the same held-out documents and judge field accuracy, review effort, latency, and cost. The model should handle ambiguity; ordinary parsing should stay deterministic.

**Remember:** Parse first → model ambiguity → measure value

**Follow-up:** If the spreadsheet already has a vendor column, why send it to an LLM?

**Reply:** If a vendor column is reliable, I would read it directly. Sending it through a model adds cost and another opportunity for error.

**Evidence note:** Recommended design, not confirmed historical architecture. Use “I would” when discussing unverified details.


## Design the fine-tuning run

**Recommended approach**

**Question:** You do not remember your training configuration. What would you choose today?

**Say:** I do not recall the exact training configuration. For this use case, I would benchmark a prompted Qwen baseline first, then try QLoRA if recurring extraction errors justify adaptation. I would train on document-to-JSON examples, include missing and ambiguous fields, and split by document family. The winning setup is the smallest one that meets field-accuracy, latency, and review requirements.

**Remember:** Baseline → targeted adaptation → held-out fields

**Follow-up:** Why not start with full fine-tuning?

**Reply:** Full fine-tuning is more expensive. I would start with adapters and only increase training complexity if controlled evaluation shows a clear benefit.

**Evidence note:** Qwen3 4B and 8B are possible experimental candidates, not remembered model sizes. No universal best size or invented training count.


## Valid JSON. Wrong money.

**Recommended approach**

**Question:** The output is valid JSON, but the amount belongs to the wrong vendor. What now?

**Say:** Valid JSON only proves structure. I would trace each amount back to its source, check its vendor and currency, and distinguish totals from subtotals and tax. Conflicting evidence goes to review. Then I would locate the error in parsing, extraction, or mapping and add that case to the regression set.

**Remember:** Structure ≠ correctness → evidence → regression

**Follow-up:** The model says it is 99% confident. Can it auto-approve?

**Reply:** No. A model’s self-reported confidence is not a calibrated probability. Any automatic approval threshold needs validation against labeled outcomes.

**Evidence note:** Recommended design. This is a hypothetical failure scenario, not an incident you said occurred.


## The metric cross-examination

**Recommended approach**

**Question:** How would you defend the estimated 50–60% manual-effort reduction?

**Say:** The 50–60% figure on my résumé is an estimate, not a controlled benchmark. To substantiate it, I would compare total human handling time before and after, including review, corrections, and exceptions, across comparable documents. Faster extraction only matters if the complete workflow takes less effort without sacrificing quality.

**Remember:** Estimate → total handling time → quality

**Follow-up:** Did time saved in extraction just move to reviewers?

**Reply:** Then the measurement is incomplete. I would include reviewer time and compare the full workflow, not just extraction.

**Evidence note:** Do not invent sample size, baseline minutes, or a measured causal result. Verify the original basis before quoting the number as proven.


## The duplicate-delivery incident

**Recommended approach**

**Question:** The API accepted your result, but your job timed out. Is retrying safe?

**Say:** A timeout does not mean the write failed. I would give each delivery a stable idempotency key, enforce it atomically at the destination, and persist delivery status. On an ambiguous timeout, I would reconcile before retrying. That prevents a successful delivery from becoming a duplicate.

**Remember:** Timeout ≠ failure → stable key → atomic write

**Follow-up:** Two workers both check for the same key. What stops the race?

**Reply:** A database uniqueness constraint or atomic conditional write. A separate existence check followed by an insert is vulnerable to races.

**Evidence note:** Recommended approach; not a claim that a specific destination or API supported this in your implementation.


## MCP is not a quality metric

**Recommended approach**

**Question:** You used MCP retrieval. How does that make answers accurate?

**Say:** MCP provides a way to expose retrieval; it does not guarantee answer quality. I would check that retrieval returns authorized, current evidence and that the answer actually follows it. If evidence is missing or conflicting, the system should clarify or abstain. I would evaluate retrieval and generation separately.

**Remember:** Access → evidence → supported answer

**Follow-up:** Can a grounded answer still be wrong?

**Reply:** Yes. An answer can faithfully repeat an outdated source. Grounding establishes support, not necessarily truth.

**Evidence note:** Your résumé establishes MCP-based retrieval. Exact indexing, access controls and evaluation implementation are not yet supplied.


## The architecture whiteboard

**Recommended approach**

**Question:** Design the tax-document pipeline for bursts, review, and safe reprocessing.

**Say:** I would separate ingestion, parsing, extraction, validation, review, and delivery. A durable queue absorbs bursts; versioned inputs and outputs support replay; idempotent delivery prevents duplicates. I would monitor queue age, field errors, review rate, latency, and cost. Before sizing workers, I would ask about peak traffic, document sizes, and the latency target.

**Remember:** Queue → validate → version → replay

**Follow-up:** How do you reprocess a document without overwriting an approved correction?

**Reply:** I would preserve the approved correction as a separate authoritative version, then stage reprocessed output for comparison rather than silently overwriting it.

**Evidence note:** Recommended architecture. Do not describe queue technology, deployment topology or throughput as historical facts.


## The synthetic benchmark trap

**Report-backed · synthetic result**

**Question:** What does 96.3% action-field exact match on 1,080 synthetic cases actually prove?

**Say:** The 96.3% result is 1,040 of 1,080 synthetic action cases matching seven selected fields, with the operational checks also passing. It is not full-response or real-user accuracy. The report also found normalized template overlap with training, so I treat it as a regression benchmark. My next step would be an independently written holdout and a matched base-model comparison.

**Remember:** 1,040/1,080 → selected fields → template limitation

**Follow-up:** Would you accept that error rate for destructive actions?

**Reply:** No. For destructive actions, accuracy alone is insufficient; execution also needs authorization, state checks, and a safe failure path.

**Evidence note:** Supplied NoteEchoes report: saved outputs were rescored, inference was not rerun. Selected fields: intent, mode, items, entities, draft, requires_confirmation, proposed_tool. No established improvement over stock Qwen.


## The retrieval autopsy

**Recommended RAG design**

**Question:** Your codebase assistant cites code but gives the wrong answer. How do you debug it?

**Say:** I would debug retrieval before changing the prompt. First, check whether the correct repository version and relevant code reached the model. Then inspect chunk boundaries, ranking, missing dependencies, and whether the answer follows the evidence. I would evaluate retrieval and generation separately and turn the failure into a regression case.

**Remember:** Find evidence → inspect ranking → verify answer

**Follow-up:** What stops self-correcting search from looping forever?

**Reply:** A fixed search-step budget, a time budget, and a stop condition when evidence no longer improves. Without enough evidence, return a qualified answer or ask for clarification.

**Evidence note:** Proposed RAG design. Your résumé establishes LangGraph, Claude, Pinecone, asynchronous retrieval and Ragas; exact graph, metrics and operational behavior remain unverified.


## Crash between two worlds

**Report-backed implementation**

**Question:** A file moved, but the database journal still says pending. Recover safely.

**Say:** The file system and SQLite are not one atomic transaction. In MFlash’s safer move path, a prepared journal record comes first, then the file operation and verification, then commitment. Recovery checks actual file contents before restoring or finalizing. If the original path is occupied, undo uses a collision-safe alternative instead of overwriting newer data.

**Remember:** Prepared record → verify bytes → safe undo

**Follow-up:** Why is SQLite WAL not sufficient by itself?

**Reply:** WAL protects database consistency. It does not make an external file operation part of the same transaction, so crash windows still need reconciliation.

**Evidence note:** Based on supplied MFlash code-review report. The safer move path uses a destination hard link, verification, source unlink and database update. This is recoverable evidence, not a global exactly-once guarantee.


## The skewed Spark job

**Recommended approach**

**Question:** A 5 TB/day pipeline slows down. One key owns 40% of the records. What do you do?

**Say:** I would inspect the execution plan, task durations, shuffle, spill, and partition sizes first. A key containing 40% of records can overload one partition even after adding workers. Depending on the operation, I would consider pre-aggregation, a separate hot-key path, or carefully designed salting, then verify correctness and compare runtime and cost.

**Remember:** Measure → locate skew → validate fix

**Follow-up:** How can salting accidentally duplicate results?

**Reply:** If the join sides are replicated or salted inconsistently, matching rows can be multiplied or lost. I would verify key-level cardinality and aggregates.

**Evidence note:** Recommended diagnosis for a hypothetical incident; do not imply this was a specific Sedin production failure.


## Explain NoteEchoes

**Report-backed implementation**

**Question:** Tell me about NoteEchoes in under a minute.

**Say:** I built NoteEchoes to turn spoken thoughts and imported documents into organized, searchable notes. It combines Flutter and Swift with a specialized Qwen3-0.6B model running locally through MLX. The key design is saving the note before AI enhancement, then validating the result and rejecting it if the user has edited the note. That keeps capture useful even when generation fails.

**Remember:** Capture → local Qwen → save before AI

**Follow-up:** Is every part of the app offline?

**Reply:** No. Core inference and storage are local, but model downloads, optional web lookup and feedback, and some speech fallback paths can use the network.

**Evidence note:** Project implementation is supported by the supplied report; personal ownership comes from your résumé. Current TestFlight status, user adoption and device performance were not verified.


## Why such a small model?

**Report-backed implementation**

**Question:** Why Qwen3-0.6B for NoteEchoes?

**Say:** The task is constrained intent and action interpretation, which makes a small specialized model a reasonable fit for an iPhone. The implementation uses Qwen3-0.6B with structured validation, while document answers use cited excerpts. I would justify the final model choice with device latency, memory, and task-quality measurements rather than parameter count alone.

**Remember:** Constrained task → device fit → measure

**Follow-up:** How much faster is it than a larger model?

**Reply:** I do not have a verified comparative device benchmark. I would measure cold start, warm latency, memory and battery under the same workload.

**Evidence note:** The report confirms Qwen3-0.6B and local MLX configuration. Device benchmark results and the original model-selection rationale are unknown. Rationale here is a design explanation, not measured evidence.


## Explain your fine-tuning

**Report-backed implementation**

**Question:** How is the NoteEchoes model adapted?

**Say:** The training pipeline adapts pretrained Qwen3-0.6B with QLoRA and rsLoRA. It keeps the base in four-bit NF4 and trains adapters on the expected completions, with prompt tokens masked from the loss. Deployment is a separate eight-bit MLX artifact. The distinction is important: training quantization and inference quantization are different stages.

**Remember:** Pretrained base → completion loss → separate deployment

**Follow-up:** What are the adapter settings?

**Reply:** The inspected initial configuration uses rank 32, alpha 64, and dropout 0.05, targeting attention and MLP projections. I would check the run artifacts before saying those settings produced the deployed checkpoint.

**Evidence note:** Supplied report confirms configuration, not a complete training-to-shipped-weights chain. Initial learning rate 4e-5; one epoch; sequence length 1,024. No established contribution from the experimental GRPO code.


## A user edits during generation

**Report-backed implementation**

**Question:** What happens if AI finishes after the user edits a note?

**Say:** The note is saved first. Before enhancement starts, the service records a fingerprint; before applying the result, it checks the current note against that snapshot. If the user edited or deleted it, the AI result is discarded. The user’s newer state takes precedence over delayed generation.

**Remember:** Save → fingerprint → reject stale output

**Follow-up:** Does a timeout stop the underlying model?

**Reply:** Not necessarily. A timeout can stop waiting without stopping native computation. The stale-result checks still matter even after the UI has moved on.

**Evidence note:** Report describes inspected implementation and tests, but those application tests and device behavior were not executed in the review.


## Explain hybrid retrieval

**Report-backed implementation**

**Question:** How does NoteEchoes find the right note?

**Say:** It combines SQLite full-text search with optional multilingual E5 embeddings and merges their rankings using reciprocal rank fusion. Lexical search catches exact terms; semantic search catches related meaning. The active conversation and PDF paths return cited excerpts. That keeps the answer tied to the stored material rather than asking the action model to improvise document answers.

**Remember:** Exact terms + meaning → rank fusion → excerpts

**Follow-up:** Is the knowledge graph a reasoning engine?

**Reply:** It organizes related notes into topics and displays topic membership. I would describe it as a note-and-topic graph, not an entity-reasoning engine.

**Evidence note:** Report: FTS5/BM25; multilingual-e5-small, 384 dimensions; RRF 1/(60+rank); up to 15 candidates per retrieval branch, six final by default. No learned reranker in this path; quality metrics unverified.


## What would you improve?

**Report-backed implementation**

**Question:** What is the biggest weakness in NoteEchoes today?

**Say:** The biggest evaluation gap is generalization. The synthetic score is useful for regressions, but normalized templates overlap with training and there is no completed matched base-model comparison. I would first build an independent real-language holdout, then measure device performance and strengthen failed-document retry handling.

**Remember:** Known gap → independent evaluation → recovery

**Follow-up:** What is the failed-document issue?

**Reply:** The review found that a failed PDF can be recognized by its existing hash and returned without checking completion. I would make deduplication status-aware so failed ingestion can be retried safely.

**Evidence note:** The failed-PDF case is inferred from inspected code, not a reproduced or personally reported historical incident. Proposed improvements are not completed features.


## Explain MFlash

**Report-backed implementation**

**Question:** What makes MFlash an engineering project rather than a model demo?

**Say:** I built MFlash as a macOS assistant for local document retrieval and scoped file operations. It separates action suggestions from execution policy: supported actions pass through argument, authorization, and state checks before execution. The file paths include hashes, retry receipts, journaling, and collision-safe undo. The strongest part is controlling what happens around a model decision, not just generating the decision.

**Remember:** Local assistant → execution boundary → recovery

**Follow-up:** Is it a production-ready computer-use agent?

**Reply:** It is a design preview with supported workflows and experimental visual paths. I would demonstrate specific tested operations rather than claim general autonomous reliability.

**Evidence note:** Supplied MFlash report. Personal project ownership is résumé-based; the code review itself cannot establish authorship or adoption. Ordinary scheduler policy and explicit workbench approval are distinct.


## Why two decision models?

**Report-backed implementation**

**Question:** How do the classifier and MPNet ranker differ?

**Say:** The classifier maps request and observation features to an action template. The MPNet ranker compares a state with supplied candidate actions using learned projection heads. One selects a structured pattern; the other ranks alternatives. Neither model’s score grants permission to execute—the execution layer makes that decision separately.

**Remember:** Template selection → candidate ranking → separate authority

**Follow-up:** Are 74 templates the same as 74 tools?

**Reply:** No. That is the template count from a historical training run. Templates include argument-binding patterns, so it is not a count of independent tools or universal capabilities.

**Evidence note:** Report: random-initialized MLP classifier; frozen all-mpnet-base-v2 backbone with distinct state/action projection heads. The 74 count is data-derived and historical.


## Defend the perfect ranker score

**Report-backed implementation**

**Question:** Your ranker got 100%. Why is that not enough?

**Say:** The recorded score is 1,381 out of 1,381 development candidate sets. The correct action was already supplied among the choices. That measures ranking, not discovering actions, understanding the screen, executing safely, or completing a workflow. I would validate real task completion separately before making an automation reliability claim.

**Remember:** Development candidates → narrow metric → task success

**Follow-up:** Were the negative examples mined online?

**Reply:** The inspected data generators use authored alternatives and sampled distractors. Online hard-negative mining and their measured difficulty were not established.

**Evidence note:** The score is from a saved report and was not rerun. Do not call it a fresh held-out test or 100% automation accuracy.


## Why contrastive learning?

**Report-backed implementation**

**Question:** Explain the ranking objective without jargon.

**Say:** The ranker learns to score the correct action above plausible alternatives for the same state. MPNet supplies text representations; trainable projection heads learn how state and action representations should align. The loss penalizes competing negatives that score too highly. This trains selection among candidates rather than free-form action generation.

**Remember:** Correct action > alternatives → learned alignment

**Follow-up:** Did you use in-batch negatives?

**Reply:** There are two recipes: one mixes hard-negative and symmetric in-batch losses, while another compares each example with its own negatives. I would identify the checkpoint’s recipe before attributing either to it.

**Evidence note:** Report records two distinct training scripts. Which full recipe produced the current root checkpoint is unknown.


## Changed file after approval

**Report-backed implementation**

**Question:** What if the source file changes after a workbench preview?

**Say:** The workbench captures a source digest and checks the action against the trusted grant before execution. It recomputes the digest and rejects a changed source. If an earlier attempt is still pending, it requires review instead of blindly retrying. Approval applies to the reviewed operation and state, not whatever happens to exist later.

**Remember:** Preview digest → grant match → reject changes

**Follow-up:** What evidence do you have that this works?

**Reply:** The supplied review ran 12 isolated executor tests covering cases such as retries, cancellation, collisions, and changed sources. That supports those tested paths, not all production workflows.

**Evidence note:** Test result is reported by the supplied briefing, not rerun in this interview-dashboard task. External-process races are not fully covered by the executor guarantees.


## Explain your RAG assistant

**Résumé-backed overview**

**Question:** Give me a concise overview of the codebase assistant.

**Say:** I built a codebase assistant using LangGraph, Claude, Pinecone, and FastAPI, with asynchronous retrieval and self-correcting search. The aim was to answer developer questions using repository evidence. The key engineering issue is separating missing evidence from poor generation: a better prompt cannot recover code that retrieval never found.

**Remember:** Developer questions → repository evidence → diagnose retrieval

**Follow-up:** What did the evaluation prove?

**Reply:** My résumé lists Ragas evaluation, but I do not have the run results here. I would discuss the evaluation dimensions without inventing an improvement percentage.

**Evidence note:** Opening uses résumé claims. No repository briefing was supplied for this project; exact agent roles, embeddings, chunking and results remain unverified.


## Design the graph

**Recommended RAG design**

**Question:** What would a sensible LangGraph workflow look like?

**Say:** I would use a small, explicit workflow: understand the question, retrieve code, inspect evidence gaps, then answer with source references. If evidence is weak, rewrite the query and retry within a strict budget. I would track retrieved files, repository version, and attempted queries in state so retries add information instead of repeating the same search.

**Remember:** Question → retrieve → inspect → answer

**Follow-up:** Why not use more agents?

**Reply:** Every extra agent adds latency, cost, and coordination failure modes. I would add one only when a controlled evaluation shows that its responsibility improves the result.

**Evidence note:** Proposed design for the résumé project, not a recovered description of its actual graph. No fabricated production outcomes.


## Chunking and freshness

**Recommended RAG design**

**Question:** How would you index a changing codebase?

**Say:** I would chunk around functions and classes where possible, preserve file paths and symbols, and attach a repository revision to every chunk. Changes should trigger targeted reindexing and removal of deleted code. At query time, I would combine exact symbol lookup with semantic retrieval and include enough surrounding context to understand dependencies.

**Remember:** Symbol boundaries → revision metadata → targeted updates

**Follow-up:** Would you always use a reranker?

**Reply:** No. I would add one only if ranking errors justify its latency and cost on representative queries.

**Evidence note:** Recommended indexing approach; parser, embedding model, chunk sizes, incremental indexing and reranking are not confirmed implementation details.


## Tell me about yourself

**Résumé-backed experience**

**Question:** Give me your introduction in 45 seconds.

**Say:** I’m an AI engineer with a foundation in data engineering. At Bank of America, I build document-extraction and retrieval workflows, owning work from data preparation through APIs and user review. Earlier, I worked on Spark and Databricks pipelines at Sedin. My projects extend that experience into local AI and controlled automation. The common thread is turning model outputs into systems people can actually use.

**Remember:** AI role → data foundation → usable systems

**Follow-up:** Why are you targeting AI engineering?

**Reply:** I enjoy the boundary between models and software: choosing the task, preparing the data, evaluating behavior, and building reliable execution around it. My experience spans that full path.

**Evidence note:** Résumé and supplied project reports. No new metrics, employers, responsibilities, or adoption claims introduced.


## Your contribution at Sedin

**Résumé-backed experience**

**Question:** What did you do at Sedin Technologies?

**Say:** At Sedin, I worked on Databricks ETL and ELT pipelines using Spark, PySpark, Python, and SQL, processing over 5 TB of transactional data daily. I also developed backend services and NLP summarization pipelines. That experience gave me the data-processing foundation I now bring to AI workflows: transforming inputs, integrating services, and evaluating outputs.

**Remember:** 5 TB/day → Spark pipelines → AI foundation

**Follow-up:** Was 5 TB your personal throughput improvement?

**Reply:** No. It describes the processing scale stated on my résumé, not an improvement percentage or an individual benchmark. I would explain my specific pipeline contribution separately.

**Evidence note:** Résumé-backed. Source formats, cluster size, scheduling, table design and actual incidents have not been supplied.


## Your Cactus Club project

**Résumé-backed experience**

**Question:** Describe the file-sharing application you built.

**Say:** At Cactus Club, I built an internal React file-sharing application for about 200 users, supporting files up to 10 MB. It used Cognito authentication, encrypted S3 storage, and DynamoDB for sharing history and audit metadata. I also implemented key-pair generation and recipient-only decryption, connecting the user experience with access and data protection.

**Remember:** User need → storage/access → recipient decryption

**Follow-up:** Does encrypted S3 storage mean only the recipient can decrypt?

**Reply:** No. Storage encryption and recipient-only decryption are separate protections. I would explain the key ownership and client decryption flow from the implementation before claiming end-to-end guarantees.

**Evidence note:** Résumé-backed. Cryptographic algorithms, private-key storage, recovery and threat-model details are not supplied.


## Explain your summarization work

**Résumé-backed experience**

**Question:** How did your earlier NLP summarization pipeline work?

**Say:** At Sedin, I worked on extractive summarization using TF-IDF, PageRank, and PySpark, with ROUGE for evaluation. The approach selects important source sentences instead of generating new ones. The tradeoff is easier source traceability, but sentence selection can still lose context or produce a disjointed summary.

**Remember:** Extractive → source sentences → quality tradeoff

**Follow-up:** Does a high ROUGE score prove a good summary?

**Reply:** No. ROUGE measures overlap with reference text. I would also assess coverage, redundancy, coherence, and whether the summary preserves the source’s meaning.

**Evidence note:** Résumé confirms the named methods. Exact graph construction, preprocessing and measured ROUGE results remain unknown.


## Lead with ownership

**Confirmed experience**

**Question:** What does end-to-end ownership mean in your Bank of America role?

**Say:** I worked directly with clients to understand the extraction requirements, prepared training data, integrated the model into the processing workflow, and built validation, APIs, and the review UI. That meant connecting the requested fields to a usable downstream output and keeping the review process part of the product—not treating the model as the whole solution.

**Remember:** Requirements → implementation → usable delivery

**Follow-up:** How did you prioritize requirements?

**Reply:** I would prioritize critical fields and failure consequences first, define acceptance examples with stakeholders, and separate must-have correctness from convenience features.

**Evidence note:** Ownership is user-confirmed and résumé-supported. Prioritization answer is a recommended method, not a supplied historical process.


## A credible weakness answer

**Report-backed reflection**

**Question:** What would you improve in one of your projects?

**Say:** For NoteEchoes, I would strengthen the evaluation before adding more model complexity. The existing synthetic benchmark catches regressions, but template overlap limits what it says about unfamiliar requests. I would add an independent human-authored holdout, compare against the base model under matched settings, and measure actual device performance.

**Remember:** Specific gap → concrete plan → measurable outcome

**Follow-up:** Would you remove the 96.3% result?

**Reply:** I would keep it only with its exact scope: selected action fields on synthetic cases. I would not present it as general real-world accuracy.

**Evidence note:** Grounded in the supplied NoteEchoes review. These are proposed improvements, not completed work.